import React, { Component } from "react";
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
      <InputLabel htmlFor="outlined-grupo-processo">{props.label}</InputLabel>
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
              <MenuItem key={`menuItemGrupo_${g[props.optionsPropertyId]}`} value={g[props.optionsPropertyId]}>
                {g[props.optionsPropertyLabel]}
              </MenuItem>
            );
          })}
      </Select>
    </FormControl>
  );
}

function AddButton(props) {
  const classes = useStyles();
  return (
    <Fab size="small" color={props.color?props.color:"default"} aria-label="add" className={classes.margin} onClick={props.onClick}>
      <AddIcon />
    </Fab>
  );
}

function ChipSmall(props) {
  const classes = useStyles();
  return <Chip key={`chip${props.texto}`} size="small" label={props.texto} onDelete={props.onDelete} className={classes.chip} color={props.color} />;
}

export { TextInput, AddButton, SelectInput, ChipSmall };

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
