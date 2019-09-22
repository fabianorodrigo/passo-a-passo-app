import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: '1800px',
    backgroundColor: theme.palette.background.paper,
    padding: '10px',
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function ResultadoBusca(props) {
  const classes = useStyles();
  return (
    <List
      className={classes.root}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          {props.textoFiltro}
        </ListSubheader>
      }
      className={classes.root}
    >
      {props.dados.resultadoBuscaProcedimentos &&
        Object.keys(props.dados.resultadoBuscaProcedimentos).length > 0 &&
        Object.keys(props.dados.resultadoBuscaProcedimentos).map(idGrupo => {
          return (
            <ListItem key={`liResultadoGrupo${idGrupo}`}>
              <ExpansionPanel
                defaultExpanded={true}
                key={`exPanelResultadoGrupo${idGrupo}`}
              >
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  key={`exPSumResultadoGrupo${idGrupo}`}
                >
                  <Typography
                    className={classes.heading}
                    key={`typResultadoGrupo${idGrupo}`}
                  >
                    {props.dados.Grupos[idGrupo].titulo}
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails key={`exPDetResultadoGrupo${idGrupo}`}>
                  {props.dados.resultadoBuscaProcedimentos[
                    idGrupo
                  ].processos.map(proc => {
                    return (
                      <Paper
                        className={classes.root}
                        key={`paperResultadoProcesso${proc.id}`}
                      >
                        <Typography
                          variant="h5"
                          component="h3"
                          key={`typResultadoProcesso${proc.id}`}
                        >
                          {proc.titulo}
                        </Typography>
                        <Typography
                          component="p"
                          key={`typDetailResultadoProcesso${proc.id}`}
                        >
                          Paper can be used to build surface or other elements
                          for your application.
                        </Typography>
                      </Paper>
                    );
                  })}
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </ListItem>
          );
        })}
    </List>
  );
}
