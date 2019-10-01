import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";

import { TextInput, AddButton, SelectInput, ChipSmall } from "../lib/form";
import TableBlocoPassos from "./tableBlocosPassos";
import FormPasso from "./formPasso";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    minWidth: 540
  },
  margin: {
    margin: theme.spacing(3)
  },
  marginLeft: {
    marginLeft: "15px"
  },
  dense: {
    marginTop: theme.spacing(2)
  },
  menu: {
    width: 200
  },
  chip: {
    margin: theme.spacing(0)
  }
}));

/***
 * If you need a state in your component you will either need to create a class component or you
 * lift the state up to the parent component and pass it down the functional component via props.
 */
export default class FormProcedimento extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      visible: false,
      grupos: [],
      processo: {
        titulo: "",
        quando: "",
        idGrupo: "",
        entradas: [],
        saidas: [],
        procedimentosRelacionados: [],
        passos: []
      }
    };
  }

  abreForm(processo) {
    this.setState({ visible: true });
    if (processo != null) {
      this.setState({ processo });
    } else {
      this.setState({
        processo: {
          titulo: "",
          quando: "",
          idGrupo: "",
          entradas: [],
          saidas: [],
          procedimentosRelacionados: [],
          passos: []
        }
      });
    }
  }

  fechaForm() {
    this.setState({ visible: false });
  }

  onChange(event) {
    //Pegando referëncia
    let processo = this.state.processo;
    //Atualizando valores da referência
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    processo[name] = value;
    this.setState({ processo });
  }

  salva() {
    const p = JSON.parse(JSON.stringify(this.state.processo));
    //Para os passos que sejam do tipo executar outro procedimento, mantém apenas o id e titulo
    p.passos.forEach(passo => {
      if (passo.executarProcedimento) {
        Object.keys(passo.executarProcedimento).forEach(atributo => {
          if (atributo != "id" && atributo != "titulo") {
            delete passo.executarProcedimento[atributo];
          }
        });
        delete passo.descricao;
      } else {
        delete passo.executarProcedimento;
      }
      if (passo.dica == null) {
        delete passo.dica;
      }
    });
    this.props.app.salva("Procedimento", p, () => {
      this.fechaForm();
    });
  }

  addPasso(passo) {
    let processo = this.state.processo;
    const p = JSON.parse(JSON.stringify(passo)); //clonar objeto recebido
    p.ordem = this.state.processo.passos.length + 1;
    processo.passos.push(p);
    this.setState({ processo });
  }

  deletePasso(ordem) {
    let processo = this.state.processo;
    processo.passos.splice(
      processo.passos.findIndex(elemento => {
        return elemento.ordem == ordem;
      }),
      1
    );
    processo.passos.forEach((passo, i) => {
      passo.ordem = i + 1;
    });
    this.setState({ processo });
  }

  reorderPasso(ordem, direcao) {
    let processo = this.state.processo;
    const indice = processo.passos.findIndex(elemento => {
      return elemento.ordem == ordem;
    });
    if (indice > -1) {
      //Não pode subir o primeiro nem descer o último
      if ((ordem == 0 && direcao < 0) || (ordem == processo.passos.length - 1 && direcao > 0)) {
        return null;
      } else {
        if (direcao < 0) {
          //TODO: Implementar move
        }
      }
    }
    this.setState({ processo });
  }

  addInStringArray(nomeArray, promptLabel) {
    let processo = this.state.processo;
    const valor = window.prompt(promptLabel ? promptLabel : nomeArray);
    if (valor != null && valor.trim() != "") {
      processo[nomeArray].push(valor);
    }
    this.setState(processo);
  }

  removeInStringArray(nomeArray, valor) {
    let processo = this.state.processo;
    processo[nomeArray].splice(processo[nomeArray].indexOf(valor), 1);
    this.setState(processo);
  }

  render() {
    return (
      <Dialog open={this.state.visible} onClose={this.fechaForm} aria-labelledby="form-dialog-title" fullScreen>
        <FormPasso app={this.props.app} formName="formPasso" onSalvar={this.addPasso.bind(this)} />
        <DialogTitle id="form-dialog-title">Procedimento</DialogTitle>
        <DialogContent>
          <TextInput
            label="Título"
            autoFocus
            name="titulo"
            value={this.state.processo.titulo}
            onChange={this.onChange.bind(this)}
            margin="normal"
            variant="outlined"
            fullWidth
          />
          <TextInput
            label="Quando"
            name="quando"
            value={this.state.processo.quando}
            onChange={this.onChange.bind(this)}
            margin="normal"
            variant="outlined"
            fullWidth
          />
          <SelectInput
            name="idGrupo"
            label="Grupo de Processos"
            value={this.state.processo.idGrupo}
            onChange={this.onChange.bind(this)}
            options={this.props.grupos}
            optionsPropertyId="id"
            optionsPropertyLabel="tituloComposto"
          />
          <fieldset>
            <legend>Passos</legend>
            <TableBlocoPassos processo={this.state.processo} app={this.props.app} onDelete={this.deletePasso.bind(this)} />
            <br />
            <AddButton
              onClick={() => {
                this.props.app.setState("formPasso", true);
              }}
            />
          </fieldset>
          <Grid container spacing={3}>
            <Grid item xs>
              <fieldset>
                <legend>Entradas</legend>
                {this.state.processo.entradas.map((e, iEntrada) => {
                  return <ChipSmall key={`chipEntrada${iEntrada}`} texto={e} onDelete={this.removeInStringArray.bind(this, "entradas", e)} color="primary" />;
                })}
                <AddButton color="primary" onClick={this.addInStringArray.bind(this, "entradas", "Informa o nome da entrada do processo")} />
              </fieldset>
            </Grid>
            <Grid item xs>
              <fieldset>
                <legend>Saídas</legend>
                {this.state.processo.saidas.map((s, iSaida) => {
                  return <ChipSmall key={`chipSaida${iSaida}`} texto={s} onDelete={this.removeInStringArray.bind(this, "saidas", s)} color="secondary" />;
                })}
                <AddButton color="secondary" onClick={this.addInStringArray.bind(this, "saidas", "Informe o nome da saída do processo")} />
              </fieldset>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.fechaForm.bind(this)} color="primary">
            Fechar
          </Button>
          <Button onClick={this.salva.bind(this)} color="primary">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
