import React from "react";
import { makeStyles, styled } from "@material-ui/core/styles";
import Collapse from "@material-ui/core/Collapse";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid";
import EditIcon from "@material-ui/icons/EditTwoTone";
import LinkTwoToneIcon from "@material-ui/icons/LinkTwoTone";
import RecordVoiceOverIcon from "@material-ui/icons/RecordVoiceOver";
import clsx from "clsx";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";

import TableBlocoPassos from "./tableBlocosPassos";

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
  tdPassos: {
    paddingTop: "1px",
    paddingBottom: "1px"
  },
  nested: {
    paddingLeft: theme.spacing(4)
  },
  mesmoLinha: {
    display: "inline-block",
    padding: "0px"
  }
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
            <List key={`resultadoBusca_${idGrupo}`}>
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
                  primary={props.app.getState("resultadoBuscaProcedimentos")[idGrupo].tituloComposto}
                />
                {fechado.indexOf(idGrupo) === -1 ? <ExpandLess key={`iconExpandLess${idGrupo}`} /> : <ExpandMore key={`iconExpandMore${idGrupo}`} />}
              </StyledListItem>
              <Collapse key={`collapse${idGrupo}`} in={fechado == null || fechado.indexOf(idGrupo) === -1} timeout="auto" unmountOnExit>
                <List component="nav" disablePadding key={`listFilhos${idGrupo}`}>
                  {props.dados.resultadoBuscaProcedimentos[idGrupo].processos.map((p, iProcesso) => {
                    return (
                      <ListItem padding="0" key={`li${p.id}`} className={classes.processo}>
                        <Box borderRadius="borderRadius" borderColor="text.primary" margin="0" border={1} padding="7px" bgcolor="#E8E8E8">
                          <div>
                            <Typography component="h1" variant="h6" color="inherit" className={clsx(classes.title, classes.mesmoLinha)}>
                              {p.titulo}
                            </Typography>{" "}
                            <Tooltip title={"Copiar link do processo para área de transferência"}>
                              <LinkTwoToneIcon
                                className={classes.mesmoLinha}
                                style={{ cursor: "pointer" }}
                                onClick={e => {
                                  const input = document.createElement("input");
                                  input.setAttribute("value", `${location.origin}?id=${p.id}`);
                                  document.body.appendChild(input);
                                  input.select();
                                  document.execCommand("copy");
                                  document.body.removeChild(input);
                                  props.app.mostraMensagem(`Link do procedimento copiado para a área de transferência`, null, null);
                                }}
                              />
                            </Tooltip>
                            <Tooltip title={"Enviar sugestões ou informar problemas sobre este procedimento"}>
                              <RecordVoiceOverIcon
                                className={classes.mesmoLinha}
                                style={{ cursor: "pointer" }}
                                onClick={e => {
                                  props.formComunicacao.current.abreForm(p);
                                }}
                              />
                            </Tooltip>
                          </div>
                          <b>Quando: </b>
                          {p.quando}
                          <br />
                          <Grid container spacing={3}>
                            <Grid item xs>
                              <b style={{ color: "blue" }}>Entradas: </b>
                              {p.entradas.join(", ")}
                            </Grid>
                            <Grid item xs>
                              <b style={{ color: "red" }}>Saídas: </b>
                              {p.saidas.join(", ")}
                            </Grid>
                          </Grid>
                          <TableBlocoPassos processo={p} app={props.app} />
                          {props.app.getState("adminMode") && (
                            <Button
                              variant="contained"
                              size="small"
                              className={classes.button}
                              onClick={() => {
                                props.app.appUI.refs.formProcedimento.abreForm(p);
                              }}
                            >
                              <EditIcon className={clsx(classes.leftIcon, classes.iconSmall)} />
                              Editar
                            </Button>
                          )}
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
  "&.Mui-selected": {
    backgroundColor: "#b9d4d6"
  },
  "&.Mui-selected:hover": {
    backgroundColor: "#b9d4d6"
  }
});
