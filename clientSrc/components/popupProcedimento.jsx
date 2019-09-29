import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
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

export default function popupProcedimento(props) {
  const classes = useStyles();

  const handleClose = () => {
    props.app.setState('procedimentoPopup', null);
  };

  return (
    <Dialog
      open={props.procedimento != null || false}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      maxWidth="lg"
    >
      <DialogTitle id="form-dialog-title">
        {props.procedimento
          ? props.app.getState('Grupos')[props.procedimento.idGrupo]
              .tituloComposto
          : ''}
      </DialogTitle>
      {props.procedimento && (
        <DialogContent>
          <List component="nav" disablePadding key={`listPopup`}>
            <ListItem padding="0" key={`liPopup`} className={classes.processo}>
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
                  {props.procedimento.titulo}
                </Typography>
                <b>Quando: </b>
                {props.procedimento.quando}
                <br />
                <Grid container spacing={3}>
                  <Grid item xs>
                    <b style={{ color: 'blue' }}>Entradas: </b>
                    {props.procedimento.entradas &&
                      props.procedimento.entradas.join(', ')}
                  </Grid>
                  <Grid item xs>
                    <b style={{ color: 'red' }}>Saídas: </b>
                    {props.procedimento.saidas &&
                      props.procedimento.saidas.join(', ')}
                  </Grid>
                </Grid>
                {props.procedimento && (
                  <TableBlocoPassos
                    processo={props.procedimento}
                    app={props.app}
                  />
                )}
              </Box>
            </ListItem>
          </List>
        </DialogContent>
      )}
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
