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

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    minWidth: '350px'
  },
  dialogPaper: {
    minHeight: "350px",
    maxHeight: "450px"
  }
}));

export default function formPasso(props) {
  const classes = useStyles();

  const [tipo, setTipo] = React.useState("descricao");
  const [passo, setPasso] = React.useState({
    idPapel: "",
    descricao: "",
    executarId: ""
  });

  const handleSalvar = () => {
    props.onSalvar(passo);
    props.app.setState(props.formName, false);
  };
  const handleClose = () => {
    props.app.setState(props.formName, false);
  };
  const onChange = event => {
    const { name, value } = event.target;
    setPasso({ ...passo, [name]: value });
  };

  const papeis = props.app.getState("Papeis");
  return (
    <Dialog
      open={props.app.getState(props.formName) || false}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      maxWidth="lg"
      classes={{ paper: classes.dialogPaper }}
    >
      <DialogTitle id="form-dialog-title">Passo</DialogTitle>
      <DialogContent>
        <FormControl variant="outlined" className={classes.textField} margin="normal" fullWidth>
          <InputLabel autoFocus htmlFor="outlined-age-simple">
            Papel
          </InputLabel>
          <Select
            label="Quem"
            value={passo.idPapel}
            onChange={onChange}
            inputProps={{
              name: "idPapel",
              id: "outlined-age-simple"
            }}
            labelWidth={100}
          >
            <MenuItem value="" disabled>
              Papel
            </MenuItem>
            {papeis &&
              Object.values(papeis).map(papel => {
                return (
                  <MenuItem key={`menuItem${papel.id}${papel.titulo}`} value={papel.id}>
                    {papel.titulo}
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>
        <FormControl variant="outlined" className={classes.textField} margin="normal" fullWidth>
          <InputLabel htmlFor="outlined-age-simple">Tipo Descrição</InputLabel>
          <Select
            label="Tipo"
            value={tipo}
            onChange={e => {
              setTipo(e.target.value);
            }}
            inputProps={{
              name: "tipo",
              id: "outlined-age-simple"
            }}
            labelWidth={100}
          >
            <MenuItem value="descricao">Descrição textual</MenuItem>
            <MenuItem value="executarId">Executar outro procedimento registrado</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Descrição"
          onChange={onChange}
          id="descricao"
          name={tipo}
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
          Incluir
        </Button>
      </DialogActions>
    </Dialog>
  );
}
