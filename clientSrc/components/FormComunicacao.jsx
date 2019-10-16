import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { TextInput, SelectInput, AutoSuggestInput } from "../lib/form";

/***
 * If you need a state in your component you will either need to create a class component or you
 * lift the state up to the parent component and pass it down the functional component via props.
 */
export default class FormComunicacao extends Component {
  constructor(props, context) {
    super(props, context);
    this.timeout = 0;
    this.state = {
      visible: false,
      mensagem: {
        procedimento: { titulo: "" },
        textoMensagem: ""
      }
    };
  }

  abreForm(procedimento) {
    this.setState({ visible: true });
    this.setState({
      mensagem: {
        procedimento,
        textoMensagem: ""
      }
    });
  }

  fechaForm() {
    this.setState({ visible: false });
  }

  onChange(event) {
    //Pegando referëncia
    let mensagem = this.state.mensagem;
    //Atualizando valores da referência
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    mensagem[name] = value;
    this.setState({ mensagem });
  }

  envia() {
    this.fechaForm();
  }

  render() {
    return (
      <Dialog open={this.state.visible} onClose={this.fechaForm} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Comunicação</DialogTitle>
        <DialogContent>
        <DialogContentText>
          Envie suas sugestões e/ou problemas que tenha identificado no procedimento: <b>{this.state.mensagem.procedimento.titulo}</b>
        </DialogContentText>
          <TextInput
            autoFocus
            label="Mensagem"
            value={this.state.mensagem.textoMensagem}
            onChange={this.onChange.bind(this)}
            id="textoMensagem"
            name="textoMensagem"
            margin="normal"
            variant="outlined"
            fullWidth
            multiline
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.fechaForm.bind(this)} color="primary">
            Cancelar
          </Button>
          <Button onClick={this.envia.bind(this)} color="primary">
            Enviar
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
