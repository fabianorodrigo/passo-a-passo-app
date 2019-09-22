import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import FileCopyIcon from '@material-ui/icons/FileCopyTwoTone';
import { Divider } from '@material-ui/core';

import Collapse from '@material-ui/core/Collapse';
import FormatListNumbered from '@material-ui/icons/PlaylistPlay';
import FolderOpen from '@material-ui/icons/FolderOpen';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function mainListItems(props) {
  const [aberto, setAberto] = React.useState([0]);
  const [selectedIndex, setSelectedIndex] = React.useState(-1);

  const handleToggle = value => {
    const currentIndex = aberto.indexOf(value);
    const newAberto = [...aberto];

    if (currentIndex === -1) {
      newAberto.push(value);
    } else {
      newAberto.splice(currentIndex, 1);
    }

    setAberto(newAberto);
  };

  const grupos = props.dados.GruposHierarquica
    ? Object.values(props.dados.GruposHierarquica)
    : [];
  const classes = useStyles();
  return (
    <div>
      {menuGruposProcessos(classes, aberto, grupos)}
      <Divider />
      <List
        onClick={event => setSelectedIndex(-1)}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Admin
          </ListSubheader>
        }
        className={classes.root}
      >
        <ListItem button onClick={props.onClick.bind(null, 'procedimentos')}>
          <ListItemIcon>
            <FileCopyIcon />
          </ListItemIcon>
          <ListItemText primary="Procedimentos" />
        </ListItem>
        <ListItem button onClick={props.onClick.bind(null, 'grupos')}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Grupos" />
        </ListItem>
        <ListItem button onClick={props.onClick.bind(null, 'papeis')}>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Papéis" />
        </ListItem>
      </List>
    </div>
  );

  function menuGruposProcessos(classes, aberto, grupos) {
    return (
      <List
        key={`menuGrupoProcessos`}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader
            component="div"
            id="nested-list-subheader"
            onClick={event => setSelectedIndex(-1)}
          >
            Grupos
          </ListSubheader>
        }
        className={classes.root}
      >
        {grupos.map(g => {
          const filhos = menuFilhos(classes, aberto, g);
          return (
            <div key={`div${g.id}`}>
              <ListItem
                key={`liMenu${g.id}`}
                button
                selected={selectedIndex === g.id}
                onClick={() => {
                  setSelectedIndex(g.id);
                  if (g.filhos != null) {
                    handleToggle(g.id);
                  } else {
                    props.onClick(null, g.id);
                  }
                }}
              >
                <ListItemIcon key={`liMenuIcon${g.id}`}>
                  {g.filhos == null ? (
                    <FormatListNumbered key={`iconFormatListNumbered${g.id}`} />
                  ) : (
                    <FolderOpen key={`iconOpenFolder${g.id}`} />
                  )}
                </ListItemIcon>
                <ListItemText key={`liMenuText${g.id}`} primary={g.titulo} />
                {g.filhos == null ? (
                  ''
                ) : aberto.indexOf(g.id) !== -1 ? (
                  <ExpandLess key={`iconExpandLess${g.id}`} />
                ) : (
                  <ExpandMore key={`iconExpandMore${g.id}`} />
                )}
              </ListItem>
              {filhos}
            </div>
          );
        })}
      </List>
    );
    1;
  }

  function menuFilhos(classes, aberto, grupo) {
    if (grupo.filhos && Object.keys(grupo.filhos).length > 0) {
      return (
        <Collapse
          key={`collapse${grupo.id}`}
          in={aberto != null && aberto.indexOf(grupo.id) !== -1}
          timeout="auto"
          unmountOnExit
        >
          <List component="div" disablePadding key={`listFilhos${grupo.id}`}>
            {Object.values(grupo.filhos).map(gf => {
              return (
                <ListItem
                  button
                  className={classes.nested}
                  key={`li${gf.id}`}
                  selected={selectedIndex === gf.id}
                  onClick={() => {
                    setSelectedIndex(gf.id);
                    if (gf.filhos != null) {
                      handleToggle(gf.id);
                    } else {
                      props.onClick(null, gf.id);
                    }
                  }}
                >
                  <ListItemIcon>
                    <FormatListNumbered />
                  </ListItemIcon>
                  <ListItemText primary={gf.titulo} />
                </ListItem>
              );
            })}
          </List>
        </Collapse>
      );
    }
  }
}
