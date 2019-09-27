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
      <Button
        variant="contained"
        size="small"
        className={classes.button}
        onClick={() => {
          props.app.setState("formPapel", true);
        }}
      >
        <AddIcon className={clsx(classes.leftIcon, classes.iconSmall)} />
        Novo
      </Button>
      {Object.values(props.app.getState("Papeis")).map(p => {
        let avatarClass = null;
        if (p.titulo.toLowerCase().startsWith("fiscal")) {
          avatarClass = classes.orangeAvatar;
        } else if (p.titulo.toLowerCase().startsWith("gestor")) {
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
                {p.titulo.substr(0, 2)}
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={p.titulo} secondary={p.descricao} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="Editar">
                <EditIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
}
