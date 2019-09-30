import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/EditTwoTone";
import clsx from "clsx";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

import pink from "@material-ui/core/colors/pink";
import green from "@material-ui/core/colors/green";
import blue from "@material-ui/core/colors/blue";
import orange from "@material-ui/core/colors/deepOrange"
import red from "@material-ui/core/colors/red"

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  descricao: {
    maxWidth: "300px"
  },
  button: {
    margin: theme.spacing(1)
  },
  inline: {
    display: "inline"
  },
  blueAvatar: {
    margin: 10,
    color: "#fff",
    backgroundColor: blue[500]
  },
  pinkAvatar: {
    margin: 10,
    color: "#fff",
    backgroundColor: pink[500]
  },
  greenAvatar: {
    margin: 10,
    color: "#fff",
    backgroundColor: green[500]
  },
  orangeAvatar: {
    margin: 10,
    color: "#fff",
    backgroundColor: orange[500]
  },
  redAvatar: {
    margin: 10,
    color: "#fff",
    backgroundColor: red[500]
  }
}));

export default function PapeisList(props) {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {props.app.getState("adminMode") && <Button
        variant="contained"
        size="small"
        className={classes.button}
        onClick={() => {
          props.app.setState("formPapel", true);
        }}
      >
        <AddIcon className={clsx(classes.leftIcon, classes.iconSmall)} />
        Novo
      </Button>}
      {Object.values(props.app.getState("Papeis")).map(p => {
        let avatarClass = null;
        if (p.titulo.toLowerCase().startsWith("fiscal")) {
          avatarClass = classes.orangeAvatar;
        } else if (p.titulo.toLowerCase().startsWith("gestor") || p.titulo.toLowerCase().startsWith("gerente")) {
          avatarClass = classes.redAvatar;
        } else if (p.titulo.toLowerCase().startsWith("gerente")) {
          avatarClass = classes.pinkAvatar;
        } else if (p.titulo.toLowerCase().startsWith("coordenador")) {
          avatarClass = classes.blueAvatar;
        } else {
          avatarClass = classes.greenAvatar;
        }

        return (
          <ListItem key={`liPapeis${p.id}`}>
            <ListItemAvatar>
              <Avatar className={avatarClass} alt={p.titulo}>
                {getSiglaPapel(p.titulo)}
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={p.titulo} secondary={p.descricao} />
            {props.app.getState("adminMode") && <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="Editar">
                <EditIcon />
              </IconButton>
            </ListItemSecondaryAction>}
          </ListItem>
        );
      })}
    </List>
  );
}

function getSiglaPapel(titulo){
  const partes = titulo.split(' ');
  if(partes.length < 2){
    return titulo.substr(0, 2);
  } else if(partes.length == 2){
    return partes[0].substr(0,1).concat(partes[1].substr(0,1));
  } else{
    let retorno = partes[0].substr(0,1);
    for(let i = 1; i < partes.length;i++){
      //Pega a próxima parte que inicia com maiúscula
      if(partes[i].substr(0,1) === partes[i].substr(0,1).toUpperCase()){
        retorno += partes[i].substr(0,1);
        break;
      }
    }
    if(retorno.length == 1){
      retorno += partes[partes.length-1].substr(0,1);
    }
    return retorno;
  }
}
