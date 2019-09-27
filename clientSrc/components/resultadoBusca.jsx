import React from 'react';
import { makeStyles, styled } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import TimerIcon from '@material-ui/icons/Timer';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';

import TableBlocoPassos from './tableBlocosPassos';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: '1800px',
    backgroundColor: theme.palette.background.paper,
    padding: '0px',
  },
  tooltip: {
    popper: {
      backgroundColor: 'yellow',
    },
    tooltip: {
      backgroundColor: 'yellow',
    },
  },
  processo: {
    display: 'block',
  },
  grupo: {
    color: 'black',
    fontWeight: 'bold',
  },
  title: {
    flexGrow: 1,
    textAlign: 'left',
  },
  table: {
    display: 'block',
  },
  tdPassos: {
    paddingTop: '1px',
    paddingBottom: '1px',
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
              <StyledListItem
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
              </StyledListItem>
              <Collapse
                key={`collapse${idGrupo}`}
                in={fechado == null || fechado.indexOf(idGrupo) === -1}
                timeout="auto"
                unmountOnExit
              >
                <List
                  component="nav"
                  disablePadding
                  key={`listFilhos${idGrupo}`}
                >
                  {props.dados.resultadoBuscaProcedimentos[
                    idGrupo
                  ].processos.map((p, iProcesso) => {
                    return (
                      <ListItem
                        padding="0"
                        key={`li${p.id}`}
                        className={classes.processo}
                      >
                        <Box
                          borderRadius="borderRadius"
                          borderColor="text.primary"
                          margin="0"
                          border={1}
                          padding="7px"
                          bgcolor="#E8E8E8"
                        >
                          <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            className={classes.title}
                          >
                            {p.titulo}
                          </Typography>
                          <b>Quando: </b>
                          {p.quando}
                          <br />
                          <Grid container spacing={3}>
                            <Grid item xs>
                              <b>Entradas: </b>
                              {p.entradas.join(', ')}
                            </Grid>
                            <Grid item xs>
                              <b>Saídas: </b>
                              {p.saidas.join(', ')}
                            </Grid>
                          </Grid>
                          <TableBlocoPassos processo={p} app={props.app} />
                        </Box>
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

const StyledListItem = styled(ListItem)({
  '&.Mui-selected': {
    backgroundColor: '#b9d4d6',
  },
  '&.Mui-selected:hover': {
    backgroundColor: '#b9d4d6',
  },
});
