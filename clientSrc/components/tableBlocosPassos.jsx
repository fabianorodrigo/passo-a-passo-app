import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';

import ReactMarkDown from 'react-markdown';

import Fab from '@material-ui/core/Fab';
import RemoveIcon from '@material-ui/icons/Remove';

const useStyles = makeStyles(theme => ({
  table: {
    display: 'block',
  },
  right: {
    margin: '5px',
  },
  tdPassos: {
    paddingTop: '1px',
    paddingBottom: '1px',
  },
  paragrafoPassos: {
    margin: '0 0 1px',
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

export default function tableBlocosPassos(props) {
  const classes = useStyles();

  return getBlocoPassos(props.processo, props.app).map(
    (bloco, iBloco, arrayOrigem) => {
      return (
        <Table
          className={classes.table}
          key={`tb_${props.processo.id}_${iBloco}`}
          size="small"
        >
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
              if (passo.descricao != null && passo.descricao.trim() != '') {
                passo.textoFinal = passo.descricao;
              } else if (
                passo.markdown != null &&
                passo.markdown.trim() != ''
              ) {
                passo.textoFinal = passo.markdown;
              } else if (
                passo.executarId != null &&
                passo.executarId.trim() != ''
              ) {
                passo.textoFinal = passo.executarId;
              }

              return (
                <TableRow key={`tr_${props.processo.id}_${iBloco}_${iPasso}`}>
                  {passo.textoFinal.indexOf('\n') == -1 && (
                    <TableCell className={classes.tdPassos} width="1800">
                      <ReactMarkDown
                        source={`${passo.ordem}. ${passo.textoFinal}`}
                      />
                      {props.onDelete && (
                        <Fab
                          size="small"
                          color="default"
                          aria-label="add"
                          className={classes.right}
                          onClick={props.onDelete.bind(null, passo.ordem)}
                        >
                          <RemoveIcon />
                        </Fab>
                      )}
                    </TableCell>
                  )}
                  {passo.textoFinal.indexOf('\n') != -1 && (
                    <TableCell className={classes.tdPassos} width="1800">
                      {passo.textoFinal.split('\n').map((linha, i) => {
                        if (linha == '') {
                          return (
                            <br
                              key={`br_${props.processo.id}_${iBloco}_${iPasso}_${i}`}
                            />
                          );
                        } else {
                          return (
                            <p
                              className={classes.paragrafoPassos}
                              key={`p_${props.processo.id}_${iBloco}_${iPasso}_${i}`}
                            >
                              {i == 0 ? `${passo.ordem}. ` : ''}
                              {linha}
                            </p>
                          );
                        }
                      })}
                      {props.onDelete && (
                        <Fab
                          size="small"
                          color="default"
                          aria-label="add"
                          className={classes.right}
                          onClick={props.onDelete.bind(null, passo.ordem)}
                        >
                          <RemoveIcon />
                        </Fab>
                      )}
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      );
    },
  );
}

/**
 * Retorna os blocos de passos de um processo
 * Sempre que muda de papel executor, entra-se em um novo bloco
 *
 * @param {object} processo Processo analisado
 * @param {objectg} app Instância do AppController que pode ser usado para obter dados para montar a saída
 */
function getBlocoPassos(processo, app) {
  const retorno = [];
  processo.passos.forEach((p, i) => {
    if (i == 0 || p.idPapel != processo.passos[i - 1].idPapel) {
      retorno.push({ papel: app.getState('Papeis')[p.idPapel], passos: [] });
    }
    retorno[retorno.length - 1].passos.push(p);
  });
  return retorno;
}

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    padding: '2px',
  },
  body: {
    fontSize: 14,
    paddingTop: '0px',
  },
}))(TableCell);

const LightTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: 'khaki',
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 12,
  },
}))(Tooltip);
