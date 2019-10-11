import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Chip from "@material-ui/core/Chip";
import Autosuggest from "react-autosuggest";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import deburr from "lodash/deburr";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";

//material-ui makeStyles function only works inside function components, as it uses the new React Hooks APIs inside.
/*You have two options:

Convert your class component to a functional component.
Use a Higher Order Component as in material-ui docs*/
function TextInput(props) {
  const classes = useStyles();
  return <TextField className={classes.textField} {...props} />;
}

function SelectInput(props) {
  const classes = useStyles();
  return (
    <FormControl variant="outlined" className={classes.textField} margin="normal" fullWidth>
      <InputLabel htmlFor={`outlined-${props.name}`}>{props.label}</InputLabel>
      <Select
        label={props.label}
        value={props.value}
        onChange={props.onChange}
        inputProps={{
          name: props.name,
          id: `outlined-${props.name}`
        }}
        labelWidth={180}
      >
        <MenuItem value="" disabled>
          {props.label}
        </MenuItem>
        {props.options &&
          Object.values(props.options).map(g => {
            return (
              <MenuItem key={`menuItem${props.name}_${g[props.optionsPropertyId]}`} value={g[props.optionsPropertyId]}>
                {g[props.optionsPropertyLabel]}
              </MenuItem>
            );
          })}
      </Select>
    </FormControl>
  );
}

function AutoSuggestInput(props) {
  const classes = useStyles();
  let timeout = React.useRef(null);
  const [textoAutosuggest, setTextoAutosuggest] = React.useState(props.selectedLabel?props.selectedLabel:"");
  const [listaAutosuggest, setListaAutosuggest] = React.useState([]);

  function renderSuggestion(suggestion, { query, isHighlighted }) {
    const matches = match(suggestion[props.optionsPropertyLabel], query);
    const parts = parse(suggestion[props.optionsPropertyLabel], matches);
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
  function getSuggestionValue(suggestion) {
    return suggestion[props.optionsPropertyLabel];
  }
  function renderInputComponent(inputProps) {
    const { classes, inputRef = () => {}, ref, ...other } = inputProps;
    return (
      <TextField
        label={props.label}
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
  function buscaSugestoes({value}) {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    if (value.trim() != '') {
      timeout.current = setTimeout(async () => {
        const sugestoes = await props.buscaSugestoes(value);
        setListaAutosuggest(sugestoes);
      }, 300);
    } else {
      setListaAutosuggest([]);
    }
  }


  const autosuggestProps = {
    renderInputComponent,
    suggestions: listaAutosuggest,
    onSuggestionsFetchRequested: buscaSugestoes,
    onSuggestionsClearRequested: () => {
      setListaAutosuggest([]);
    },
    onSuggestionSelected: props.onSuggestionSelected,
    getSuggestionValue: getSuggestionValue,
    renderSuggestion
  };

  return (
    <Autosuggest
      {...autosuggestProps}
      inputProps={{
        classes,
        placeholder: `Informe ${props.label}`,
        value: textoAutosuggest,
        onChange: (event, { newValue }) => {
          setTextoAutosuggest(newValue);
        }
      }}
      theme={{
        container: classes.container,
        suggestionsContainerOpen: classes.suggestionsContainerOpen,
        suggestionsList: classes.suggestionsList,
        suggestion: classes.suggestion
      }}
      renderSuggestionsContainer={options => (
        <Paper {...options.containerProps} square>
          {options.children}
        </Paper>
      )}
    />
  );
}

function AddButton(props) {
  const classes = useStyles();
  return (
    <Fab size="small" color={props.color ? props.color : "default"} aria-label="add" className={classes.margin} onClick={props.onClick}>
      <AddIcon />
    </Fab>
  );
}

function ChipSmall(props) {
  const classes = useStyles();
  return <Chip key={`chip${props.texto}`} size="small" label={props.texto} onDelete={props.onDelete} className={classes.chip} color={props.color} />;
}

export { TextInput, AddButton, SelectInput, ChipSmall, AutoSuggestInput };

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    minWidth: 540
  },
  margin: {
    margin: theme.spacing(3)
  },
  chip: {
    margin: theme.spacing(0)
  }
}));
