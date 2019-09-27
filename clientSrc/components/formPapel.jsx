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
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";

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

export default function formProcedimento(props) {
  const classes = useStyles();

  const [papel, setPapel] = React.useState({
    titulo: "",
    descricao: "",
  });

  const handleClose = () => {
    props.app.setState(props.formName, false);
  };
  const handleSalvar = () => {
    props.app.salva("Papel", p, () => {
      props.app.setState(props.formName, false);
    });
  };

  const onChange = event => {
    const { name, value } = event.target;
    setPapel({ ...papel, [name]: value });
  };

  return (
    <Dialog scroll="body" open={props.app.getState(props.formName) || false} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Papel</DialogTitle>
      <DialogContent>
        <TextField
          label="Título"
          autoFocus
          name="titulo"
          value={papel.titulo}
          onChange={onChange}
          className={classes.textField}
          margin="normal"
          variant="outlined"
          fullWidth
        />
        <TextField
          label="Descrição"
          name="descricao"
          value={papel.quando}
          onChange={onChange}
          className={classes.textField}
          margin="normal"
          variant="outlined"
          fullWidth
          multiline={true}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Fechar
        </Button>
        <Button onClick={handleSalvar} color="primary">
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
