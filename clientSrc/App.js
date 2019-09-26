import React, { Component } from 'react';
import Main from './components/main';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
//Controller da aplicação
import AppController from './AppController';

//componentes
import FormProcedimento from './components/formProcedimento';

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
        loading: false
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
        <FormProcedimento app={this._appController} formName="formProcedimento" />
        <div className="App-body">
          <Main app={this._appController} dados={this.state.dados} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
