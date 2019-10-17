import React, { Component } from "react";
import Main from "./components/main";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Snackbar from "@material-ui/core/Snackbar";
//Controller da aplicação
import AppController from "./AppController";

//componentes
import FormProcedimento from "./components/FormProcedimento";
import FormPapel from "./components/formPapel";
import PopupProcedimento from "./components/popupProcedimento";
import FormComunicacao from "./components/FormComunicacao";
import Mensagem from "./components/mensagem";
//import Popup from "./components/popup";

//serviços

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this._appController = new AppController(this);

    let logado = sessionStorage.getItem("access_token") != null;

    this.formComunicacao = React.createRef();

    this.state = {
      usuarioLogado: logado,
      mensagemSnack: "",
      dados: {
        pagina: 1,
        loading: false,
        adminMode: false
      }
    };
  }

  componentDidMount() {
    //if (this.state.usuarioLogado) { TODO: Implementar essa budega
    this.cargaInicialDados();
    //}
  }

  async cargaInicialDados() {
    //Carga
    this._appController.cargaEntidades();
    //Forma tosca de desabilitar os botões de edição para os usuários
    if (location.search != null && location.search.trim() != "") {
      const urlParams = new URLSearchParams(location.search);
      const adminMode = urlParams.get("adminMode");
      if (adminMode != null) {
        this.atualizaStateDados("adminMode", adminMode.toLowerCase().trim() === "true");
      }
      const id = urlParams.get("id");
      //Se passar um id de procedimento, já exibe
      if (id != null) {
        await this._appController.controllers.Procedimento.buscaProcesso(id);
      }
    }
  }

  getStateDados(chave) {
    return this.state.dados[chave];
  }

  atualizaStateDados(chave, valor) {
    const dados = this.state.dados;
    dados[chave] = valor;
    this.setState({ dados: dados });
  }

  mostraMensagem(mensagemSnack, tipo, cb) {
    this.setState({ mensagemSnack });
    if (cb) {
      cb();
    }
  }

  onLoginOut(logado) {
    this.setState({ usuarioLogado: logado });
    if (logado) {
      this.cargaInicialDados();
    }
  }

  render() {
    return (
      <div className="App">
        <CssBaseline />
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          key="snackBar"
          open={this.state.mensagemSnack !== ""}
          autoHideDuration={1500}
          onClose={()=>{this.setState({mensagemSnack : ""})}}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">{this.state.mensagemSnack}</span>}
        />
        <FormProcedimento
          ref="formProcedimento"
          app={this._appController}
          grupos={this.state.dados.GruposOrdemHierarquica}
          procedimento={this.state.dados.procedimentoEditado}
        />
        <PopupProcedimento app={this._appController} formName="popupProcedimento" procedimento={this.state.dados.procedimentoPopup} />
        <FormPapel app={this._appController} formName="formPapel" />
        <FormComunicacao app={this._appController} ref={this.formComunicacao} />
        <div className="App-body">
          <Main app={this._appController} dados={this.state.dados} formComunicacao={this.formComunicacao} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
