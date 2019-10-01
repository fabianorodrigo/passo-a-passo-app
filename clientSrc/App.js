import React, { Component } from 'react';
import Main from './components/main';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
//Controller da aplicação
import AppController from './AppController';

//componentes
import FormProcedimento from './components/FormProcedimento';
import FormPapel from './components/formPapel';
import PopupProcedimento from './components/popupProcedimento';
import Mensagem from './components/mensagem';
//import Popup from "./components/popup";

//serviços


class App extends Component {
  constructor(props, context) {
    super(props, context);
    this._appController = new AppController(this);

    let logado = sessionStorage.getItem('access_token') != null;

    this.state = {
      usuarioLogado: logado,
      dados: {
        pagina: 1,
        loading: false,
        adminMode: false,
      },
    };
  }

  componentDidMount() {
    //if (this.state.usuarioLogado) { TODO: Implementar essa budega
    this.cargaInicialDados();
    //}
  }

  cargaInicialDados() {
    //Carga
    this._appController.cargaEntidades();
    //Forma tosca de desabilitar os botões de edição para os usuários
    if (location.search != null && location.search.trim() != '') {
      const urlParams = new URLSearchParams(location.search);
      this.atualizaStateDados(
        'adminMode',
        urlParams
          .get('adminMode')
          .toLowerCase()
          .trim() === 'true',
      );
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
        <FormProcedimento ref="formProcedimento"
          app={this._appController}
          grupos={this.state.dados.GruposOrdemHierarquica}
          procedimento={this.state.dados.procedimentoEditado}
        />
        <PopupProcedimento
          app={this._appController}
          formName="popupProcedimento"
          procedimento={this.state.dados.procedimentoPopup}
        />
        <FormPapel app={this._appController} formName="formPapel" />
        <div className="App-body">
          <Main app={this._appController} dados={this.state.dados} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
