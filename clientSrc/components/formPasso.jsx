import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Autosuggest from 'react-autosuggest';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import deburr from 'lodash/deburr';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    minWidth: '350px',
  },
  dialogPaper: {
    minHeight: '350px',
    maxHeight: '450px',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
}));

export default function formPasso(props) {
  const classes = useStyles();
  let timeout = React.useRef(null);

  const [tipo, setTipo] = React.useState('descricao');
  const [passo, setPasso] = React.useState({
    idPapel: '',
    descricao: '',
    executarId: '',
  });
  const [textoAutosuggest, setTextoAutosuggest] = React.useState('');
  const [
    listaProcessosAutosuggest,
    setListaProcessosAutosuggest,
  ] = React.useState([]);

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

  const papeis = props.app.getState('Papeis');
  const autosuggestProps = {
    renderInputComponent,
    suggestions: listaProcessosAutosuggest,
    onSuggestionsFetchRequested: handleSuggestionsFetchRequested,
    onSuggestionsClearRequested: handleSuggestionsClearRequested,
    onSuggestionSelected: (event, suggestionSelection) => {
      setPasso({
        ...passo,
        executarId: suggestionSelection.suggestion,
      });
    },
    getSuggestionValue,
    renderSuggestion,
  };

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
        <FormControl
          variant="outlined"
          className={classes.textField}
          margin="normal"
          fullWidth
        >
          <InputLabel autoFocus htmlFor="outlined-age-simple">
            Papel
          </InputLabel>
          <Select
            label="Quem"
            value={passo.idPapel}
            onChange={onChange}
            inputProps={{
              name: 'idPapel',
              id: 'outlined-age-simple',
            }}
            labelWidth={100}
          >
            <MenuItem value="" disabled>
              Papel
            </MenuItem>
            {papeis &&
              Object.values(papeis).map(papel => {
                return (
                  <MenuItem
                    key={`menuItem${papel.id}${papel.titulo}`}
                    value={papel.id}
                  >
                    {papel.titulo}
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>
        <FormControl
          variant="outlined"
          className={classes.textField}
          margin="normal"
          fullWidth
        >
          <InputLabel htmlFor="outlined-age-simple">Tipo Descrição</InputLabel>
          <Select
            label="Tipo"
            value={tipo}
            onChange={e => {
              setTipo(e.target.value);
            }}
            inputProps={{
              name: 'tipo',
              id: 'outlined-age-simple',
            }}
            labelWidth={100}
          >
            <MenuItem value="descricao">Descrição textual</MenuItem>
            <MenuItem value="executarId">
              Executar outro procedimento registrado
            </MenuItem>
          </Select>
        </FormControl>
        {tipo === 'descricao' && (
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
        )}
        {tipo === 'executarId' && (
          <Autosuggest
            {...autosuggestProps}
            inputProps={{
              classes,
              placeholder: 'Informe o procedimento que será executado',
              value: textoAutosuggest,
              onChange: (event, { newValue }) => {
                setTextoAutosuggest(newValue);
              },
            }}
            theme={{
              container: classes.container,
              suggestionsContainerOpen: classes.suggestionsContainerOpen,
              suggestionsList: classes.suggestionsList,
              suggestion: classes.suggestion,
            }}
            renderSuggestionsContainer={options => (
              <Paper {...options.containerProps} square>
                {options.children}
              </Paper>
            )}
          />
        )}
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
  function renderInputComponent(inputProps) {
    const { classes, inputRef = () => {}, ref, ...other } = inputProps;

    return (
      <TextField
        label="Procedimento"
        className={classes.textField}
        margin="normal"
        variant="outlined"
        fullWidth
        InputProps={{
          inputRef: node => {
            ref(node);
            inputRef(node);
          },
          classes: {
            input: classes.input,
          },
        }}
        {...other}
      />
    );
  }

  function renderSuggestion(suggestion, { query, isHighlighted }) {
    const matches = match(suggestion.titulo, query);
    const parts = parse(suggestion.titulo, matches);
    return (
      <MenuItem selected={isHighlighted} component="div">
        <div>
          {parts.map((part, index) =>
            part.highlight ? (
              <span key={String(index)} style={{ fontWeight: 500 }}>
                {part.text}
              </span>
            ) : (
              <strong key={String(index)} style={{ fontWeight: 300 }}>
                {part.text}
              </strong>
            ),
          )}
        </div>
      </MenuItem>
    );
  }

  function buscaSugestoesProcedimentos(value) {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    if (value.trim() != '') {
      timeout.current = setTimeout(async () => {
        const procedimentosSugeridos = await props.app.controllers.Procedimento.buscaProcessosPorTitulo(
          {
            textoFiltro: value,
          },
        );
        setListaProcessosAutosuggest(procedimentosSugeridos);
      }, 300);
    } else {
      props.app.controllers.Procedimento.limpaProcessos();
    }

    /*const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0
      ? []
      : Object.values(
          props.app.controllers.Procedimento.buscaProcessos({
            textoFiltro: value,
            grupoIdFiltro: '',
          }),
        ); listaProcessosAutosuggest.filter(suggestion => {
          const keep =
            count < 5 &&
            suggestion.descricao.slice(0, inputLength).toLowerCase() ===
              inputValue;

          if (keep) {
            count += 1;
          }

          return keep;
        });*/
  }

  function getSuggestionValue(suggestion) {
    return suggestion.titulo;
  }

  function handleSuggestionsFetchRequested({ value }) {
    buscaSugestoesProcedimentos(value);
  }

  function handleSuggestionsClearRequested() {
    setListaProcessosAutosuggest([]);
  }
}
