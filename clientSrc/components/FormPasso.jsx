import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { TextInput, SelectInput, AutoSuggestInput } from "../lib/form";
import Autosuggest from "react-autosuggest";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import deburr from "lodash/deburr";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";

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
export default class FormPasso extends Component {
  constructor(props, context) {
    super(props, context);
    this.timeout = 0;
    this.state = {
      visible: false,
      textoAutosuggest: "",
      listaProcessosAutosuggest: [],
      tipo: "descricao",
      passo: {
        idPapel: "",
        descricao: "",
        executarProcedimento: null
      }
    };
  }

  abreForm(passo) {
    this.setState({ visible: true });
    if (passo != null) {
      this.setState({ passo });
    } else {
      this.setState({
        passo: {
          idPapel: "",
          descricao: "",
          executarProcedimento: null
        }
      });
    }
  }

  fechaForm() {
    this.setState({ visible: false });
  }

  onChange(event) {
    //Pegando referëncia
    let passo = this.state.passo;
    //Atualizando valores da referência
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    passo[name] = value;
    this.setState({ passo });
  }

  salva() {
    this.props.onSalvar(this.state.passo);
    this.fechaForm();
  }

  async buscaSugestoesProcedimentos(value) {
    return await this.props.app.controllers.Procedimento.buscaProcessosPorTitulo({ textoFiltro: value });
  }

  render() {
    const papeis = this.props.app.getState("Papeis");
    return (
      <Dialog open={this.state.visible} onClose={this.fechaForm} aria-labelledby="form-dialog-title" fullScreen>
        <DialogTitle id="form-dialog-title">Passo</DialogTitle>
        <DialogContent>
          <SelectInput
            name="idPapel"
            label="Quem"
            value={this.state.passo.idPapel}
            onChange={this.onChange.bind(this)}
            options={papeis}
            optionsPropertyId="id"
            optionsPropertyLabel="titulo"
          />
          <SelectInput
            name="tipo"
            label="Tipo"
            value={this.state.tipo}
            onChange={e => {
              this.setState({ tipo: e.target.value });
            }}
            options={[{ id: "descricao", titulo: "Descrição Textual" }, { id: "executarProcedimento", titulo: "Executar outro procedimento registrado" }]}
            optionsPropertyId="id"
            optionsPropertyLabel="titulo"
          />
          {this.state.tipo === "descricao" && (
            <TextInput
              label="Descrição"
              value={this.state.passo.descricao}
              onChange={this.onChange.bind(this)}
              id="descricao"
              name={this.state.tipo}
              margin="normal"
              variant="outlined"
              fullWidth
              multiline={true}
            />
          )}
          {this.state.tipo === "executarProcedimento" && (
            <AutoSuggestInput
              label="Procedimento"
              optionsPropertyLabel="titulo"
              onSuggestionSelected={(event, suggestionSelection) => {
                const passo = this.state.passo;
                passo.executarProcedimento = suggestionSelection.suggestion;
                this.setState({ passo });
              }}
              buscaSugestoes={this.buscaSugestoesProcedimentos.bind(this)}
            />
          )}
          <TextInput
            label="Dica"
            value={this.state.passo.dica}
            onChange={this.onChange.bind(this)}
            id="dica"
            name="dica"
            margin="normal"
            variant="outlined"
            fullWidth
            placeholder="Coloque alguma informação complementar que deve aparecer na forma de 'tooltip'"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.fechaForm.bind(this)} color="primary">
            Fechar
          </Button>
          <Button onClick={this.salva.bind(this)} color="primary">
            Incluir
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
