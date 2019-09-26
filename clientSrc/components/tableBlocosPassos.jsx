import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles(theme => ({
  table: {
    display: "block"
  },
  tdPassos:{
    paddingTop:'1px',
    paddingBottom:'1px'
  }
}));

export default function tableBlocosPassos(props) {
  const classes = useStyles();

  return getBlocoPassos(props.processo, props.dados).map((bloco, iBloco, arrayOrigem) => {
    return (
      <Table className={classes.table} key={`tb_${props.processo.id}_${iBloco}`} size="small">
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
              <TableRow key={`tr_${props.processo.id}_${iBloco}_${iPasso}`}>
                <TableCell className={classes.tdPassos} width="1800">
                  {passo.ordem}. {passo.descricao}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  });
}

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