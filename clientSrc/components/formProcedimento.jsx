import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

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
  dense: {
    marginTop: theme.spacing(2)
  },
  menu: {
    width: 200
  }
}));

export default function formProcedimento(props) {
  const classes = useStyles();

  const [processo, setProcesso] = React.useState({
    id: null,
    titulo: "",
    quando: "",
    idGrupo: "",
    entradas: [],
    saidas: [],
    procedimentosRelacionados: [],
    passos: []
  });

  const handleClose = () => {
    props.app.setState(props.formName, false);
  };
  const addPasso = passo => {
    const p = JSON.parse(JSON.stringify(passo)); //clonar objeto recebido
    p.ordem = processo.passos.length + 1;
    processo.passos.push(p);
  };
  const deletePasso = ordem => {
    const p = JSON.parse(JSON.stringify(processo));
    p.passos.splice(
      p.passos.findIndex(elemento => {
        return elemento.ordem == ordem;
      }),
      1
    );
    p.passos.forEach((passo,i)=>{
      passo.ordem = i+1;
    })
    setProcesso(p);
  };
  function onChange(event) {
    console.log(event.target.value);
  }
  return (
    <Dialog open={props.app.getState(props.formName) || false} onClose={handleClose} aria-labelledby="form-dialog-title" fullScreen>
      <FormPasso app={props.app} formName="formPasso" onSalvar={addPasso} />
      <DialogTitle id="form-dialog-title">Procedimento</DialogTitle>
      <DialogContent>
        <DialogContentText>To subscribe to this website, please enter your email address here. We will send updates occasionally.</DialogContentText>
        <TextField label="Título" autoFocus id="titulo" className={classes.textField} margin="normal" variant="outlined" fullWidth />
        <TextField label="Quando" id="quando" className={classes.textField} margin="normal" variant="outlined" fullWidth />
        <FormControl variant="outlined" className={classes.textField} margin="normal" fullWidth>
          <InputLabel htmlFor="outlined-age-simple">Grupo de Processos</InputLabel>
          <Select
            label="Grupo"
            value="abc"
            onChange={onChange}
            inputProps={{
              name: "age",
              id: "outlined-age-simple"
            }}
            labelWidth={180}
          >
            <MenuItem value="" disabled>
              Grupo
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <fieldset>
          <legend>Passos</legend>
          <TableBlocoPassos processo={processo} app={props.app} onDelete={deletePasso} />
          <br />
          <Fab size="small" color="default" aria-label="add" className={classes.margin} onClick={props.app.setState.bind(props.app, "formPasso", true)}>
            <AddIcon />
          </Fab>
        </fieldset>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Fechar
        </Button>
        <Button onClick={handleClose} color="primary">
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
