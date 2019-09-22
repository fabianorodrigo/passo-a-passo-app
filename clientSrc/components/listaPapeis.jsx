import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/EditTwoTone';
import FileCopyIcon from '@material-ui/icons/FileCopyTwoTone';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCartTwoTone';

import pink from '@material-ui/core/colors/pink';
import green from '@material-ui/core/colors/green';
import blue from '@material-ui/core/colors/blue';

//import useStyles from './styles';
import { formataCNPJ } from '../lib/utils';
import { Service } from '../lib/service';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 800,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  blueAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: blue[500],
  },
  pinkAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: pink[500],
  },
  greenAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: green[500],
  },
}));

export default function PapeisList() {
  const classes = useStyles();

  //Buscando Papéis
  const [papeis, setPapeis] = React.useState([]);

  //buscando lista de papéis
  React.useEffect(() => {
    Service.getAll({ nomeModeloPlural: 'papeis' }).then(response => {
      setPapeis(response.data);
    });
  }, []);

  const avatarClasses = [
    classes.blueAvatar,
    classes.pinkAvatar,
    classes.greenAvatar,
  ];
  let indexAvatarClass = 0;
  return (
    <List className={classes.root}>
      {papeis.map(p => {
        indexAvatarClass += 1;
        if (indexAvatarClass >= avatarClasses.length) {
          indexAvatarClass = 0;
        }
        return (
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar
                className={avatarClasses[indexAvatarClass]}
                alt={p.titulo}
              >
                {p.titulo.substr(0, 2)}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={p.titulo}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  ></Typography>
                  {p.descricao}
                </React.Fragment>
              }
            />
            <ListItemSecondaryAction>
              <IconButton edge="start" aria-label="Editar">
                <EditIcon />
              </IconButton>
              <IconButton edge="end" aria-label="Ver Contratos">
                <FileCopyIcon />
              </IconButton>
              <IconButton edge="end" aria-label="Ver Ordens de Serviço">
                <ShoppingCartIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
}
