import React from "react";
import { withStyles, makeStyles, styled } from "@material-ui/core/styles";
import Collapse from "@material-ui/core/Collapse";
import Box from '@material-ui/core/Box';
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import TimerIcon from "@material-ui/icons/Timer";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Tooltip from "@material-ui/core/Tooltip";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: "1800px",
    backgroundColor: theme.palette.background.paper,
    padding: "0px"
  },
  tooltip: {
    popper: {
      backgroundColor: "yellow"
    },
    tooltip: {
      backgroundColor: "yellow"
    }
  },
  processo: {
    display: "block"
  },
  grupo: {
    color: "black",
    fontWeight: "bold"
  },
  title: {
    flexGrow: 1,
    textAlign: "left"
  },
  table: {
    display: "block"
  },
  tdPassos:{
    paddingTop:'1px',
    paddingBottom:'1px'
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));

/**
 * Retorna os blocos de passos de um processo
 * Sempre que muda de papel executor, entra-se em um novo bloco
 *
 * @param {object} processo Processo analisado
 * @param {objectg} propsDados Dados globais que podem ser usados para montar a saída
 */
function getBlocoPassos(processo, propsDados) {
  const retorno = [];
  processo.passos.forEach((p, i) => {
    if (i == 0 || p.idPapel != processo.passos[i - 1].idPapel) {
      retorno.push({ papel: propsDados.Papeis[p.idPapel], passos: [] });
    }
    retorno[retorno.length - 1].passos.push(p);
  });
  return retorno;
}

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
                <ListItemText className={classes.grupo} key={`liResultadoGrupo${idGrupo}`} primary={props.dados.resultadoBuscaProcedimentos[idGrupo].titulo} />
                {fechado.indexOf(idGrupo) === -1 ? <ExpandLess key={`iconExpandLess${idGrupo}`} /> : <ExpandMore key={`iconExpandMore${idGrupo}`} />}
              </StyledListItem>
              <Collapse key={`collapse${idGrupo}`} in={fechado == null || fechado.indexOf(idGrupo) === -1} timeout="auto" unmountOnExit>
                <List component="nav" disablePadding key={`listFilhos${idGrupo}`}>
                  {props.dados.resultadoBuscaProcedimentos[idGrupo].processos.map((p, iProcesso) => {
                    return (
                      <ListItem padding="0" key={`li${p.id}`} className={classes.processo}>
                        <Box borderRadius="borderRadius" borderColor='text.primary' margin="0" border={1} padding="7px" bgcolor="#E8E8E8" >
                          <Typography component="h1" variant="h6" color="inherit" className={classes.title}>
                            {p.titulo}
                          </Typography>
                          <b>Quando: </b>
                          {p.quando}
                          <br />
                          <b>Entradas: </b>
                          {p.entradas.join(", ")}
                          <br />
                          <b>Saídas: </b>
                          {p.saidas.join(", ")}
                          <br />
                          {getBlocoPassos(p, props.dados).map((bloco, iBloco, arrayOrigem) => {
                            return (
                              <Table className={classes.table} key={`tb_${p.id}_${iBloco}`} size="small">
                                <TableHead>
                                  <TableRow>
                                    <StyledTableCell>
                                      <LightTooltip title={bloco.papel.descricao}>
                                        <span>🙋 {bloco.papel.titulo}</span>
                                      </LightTooltip>
                                    </StyledTableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {bloco.passos.map((passo, iPasso) => {
                                    return (
                                      <TableRow key={`tr_${p.id}_${iBloco}_${iPasso}`}>
                                        <TableCell className={classes.tdPassos} width="1800">
                                          {passo.ordem}. {passo.descricao}
                                        </TableCell>
                                      </TableRow>
                                    );
                                  })}
                                </TableBody>
                              </Table>
                            );
                          })}
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

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    padding: '2px'
  },
  body: {
    fontSize: 14,
    paddingTop: '0px'
  }
}))(TableCell);

const LightTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: "khaki",
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 12
  }
}))(Tooltip);

const StyledListItem = styled(ListItem)({
  "&.Mui-selected": {
    backgroundColor: "#b9d4d6"
  },
  "&.Mui-selected:hover": {
    backgroundColor: "#b9d4d6"
  }
});
