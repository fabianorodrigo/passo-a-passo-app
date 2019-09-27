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
  const handleSalvar = () => {
    const p = JSON.parse(JSON.stringify(processo));
    delete p.textoFinal;
    props.app.salva("Procedimento", p, () => {
      props.app.setState(props.formName, false);
    });
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
    p.passos.forEach((passo, i) => {
      passo.ordem = i + 1;
    });
    setProcesso(p);
  };
  const onChange = event => {
    const { name, value } = event.target;
    setProcesso({ ...processo, [name]: value });
  };

  const gruposHierarquica = props.app.getState("GruposHierarquica");
  let grupos = [];
  if (gruposHierarquica) {
    Object.values(gruposHierarquica).forEach(gh => {
      populaGrupos(grupos, gh);
    });
  }
  function populaGrupos(arrayDestino, grupo) {
    arrayDestino.push(grupo);
    if (grupo.filhos) {
      Object.values(grupo.filhos).forEach(f => {
        populaGrupos(arrayDestino, f);
      });
    }
  }

  const addInStringArray = (nomeArray, promptLabel) => {
    const p = JSON.parse(JSON.stringify(processo));
    const valor = window.prompt(promptLabel ? promptLabel : nomeArray);
    if (valor != null && valor.trim() != "") {
      p[nomeArray].push(valor);
    }
    setProcesso(p);
  };

  const removeInStringArray = (nomeArray, valor) => {
    const p = JSON.parse(JSON.stringify(processo));
    p[nomeArray].splice(p[nomeArray].indexOf(valor), 1);
    setProcesso(p);
  };
  return (
    <Dialog open={props.app.getState(props.formName) || false} onClose={handleClose} aria-labelledby="form-dialog-title" fullScreen>
      <FormPasso app={props.app} formName="formPasso" onSalvar={addPasso} />
      <DialogTitle id="form-dialog-title">Procedimento</DialogTitle>
      <DialogContent>
        <TextField
          label="Título"
          autoFocus
          name="titulo"
          value={processo.titulo}
          onChange={onChange}
          className={classes.textField}
          margin="normal"
          variant="outlined"
          fullWidth
        />
        <TextField
          label="Quando"
          name="quando"
          value={processo.quando}
          onChange={onChange}
          className={classes.textField}
          margin="normal"
          variant="outlined"
          fullWidth
        />
        <FormControl variant="outlined" className={classes.textField} margin="normal" fullWidth>
          <InputLabel htmlFor="outlined-grupo-processo">Grupo de Processos</InputLabel>
          <Select
            label="Grupo de Processos"
            value={processo.idGrupo}
            onChange={onChange}
            inputProps={{
              name: "idGrupo",
              id: "outlined-grupo-processo"
            }}
            labelWidth={180}
          >
            <MenuItem value="" disabled>
              Grupo
            </MenuItem>
            {grupos &&
              Object.values(grupos).map(g => {
                return (
                  <MenuItem key={`menuItemGrupo_${g.id}`} value={g.id}>
                    {g.tituloComposto}
                  </MenuItem>
                );
              })}
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

        <Grid container spacing={3}>
          <Grid item xs>
            <fieldset>
              <legend>Entradas</legend>
              {processo.entradas.map((e, iEntrada) => {
                return (
                  <Chip
                    key={`chipEntrada${e}${iEntrada}`}
                    size="small"
                    label={e}
                    onDelete={removeInStringArray.bind(null, "entradas", e)}
                    className={classes.chip}
                    color="primary"
                  />
                );
              })}
              <Fab
                size="small"
                className={classes.marginLeft}
                color="primary"
                aria-label="add"
                onClick={addInStringArray.bind(null, "entradas", "Informa o nome da entrada do processo")}
              >
                <AddIcon />
              </Fab>
            </fieldset>
          </Grid>
          <Grid item xs>
            <fieldset>
              <legend>Saídas</legend>
              {processo.saidas.map((s, iSaida) => {
                return (
                  <Chip
                    key={`chipEntrada${s}${iSaida}`}
                    size="small"
                    label={s}
                    onDelete={removeInStringArray.bind(null, "saidas", s)}
                    className={classes.chip}
                    color="secondary"
                  />
                );
              })}
              <Fab
                size="small"
                color="secondary"
                className={classes.marginLeft}
                aria-label="remove"
                onClick={addInStringArray.bind(null, "saidas", "Informa o nome da saída do processo")}
              >
                <AddIcon />
              </Fab>
            </fieldset>
          </Grid>
        </Grid>
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
