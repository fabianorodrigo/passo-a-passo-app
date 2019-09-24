import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Divider } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: '1800px',
    backgroundColor: theme.palette.background.paper,
    padding: '10px',
  },
  grupo: {
    color: 'black',
    fontWeight: 'bold',
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function ResultadoBusca(props) {
  const [fechado, setFechado] = React.useState([]);
  const handleToggle = value => {
    const currentIndex = fechado.indexOf(value);
    const newFechado = [...fechado];
    if (currentIndex === -1) {
      newFechado.push(value);
    } else {
      newFechado.splice(currentIndex, 1);
    }
    setFechado(newFechado);
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      {props.dados.resultadoBuscaProcedimentos &&
        Object.keys(props.dados.resultadoBuscaProcedimentos).length > 0 &&
        Object.keys(props.dados.resultadoBuscaProcedimentos).map(idGrupo => {
          return (
            <List key={`menuGrupoProcessos`}>
              <ListItem
                button
                selected={true}
                onClick={() => {
                  handleToggle(idGrupo);
                }}
              >
                <ListItemText
                  className={classes.grupo}
                  key={`liResultadoGrupo${idGrupo}`}
                  primary={
                    props.dados.resultadoBuscaProcedimentos[idGrupo].titulo
                  }
                />
                {fechado.indexOf(idGrupo) === -1 ? (
                  <ExpandLess key={`iconExpandLess${idGrupo}`} />
                ) : (
                  <ExpandMore key={`iconExpandMore${idGrupo}`} />
                )}
              </ListItem>
              <Collapse
                key={`collapse${idGrupo}`}
                in={fechado == null || fechado.indexOf(idGrupo) === -1}
                timeout="auto"
                unmountOnExit
              >
                <List disablePadding key={`listFilhos${idGrupo}`}>
                  {props.dados.resultadoBuscaProcedimentos[
                    idGrupo
                  ].processos.map(p => {
                    return (
                      <ListItem key={`li${p.id}`}>
                        <ListItemText primary={p.titulo} />
                      </ListItem>
                    );
                  })}
                </List>
              </Collapse>
            </List>
          );
        })}
    </div>
  );
}
