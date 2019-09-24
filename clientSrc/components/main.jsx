import React from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SearchIcon from '@material-ui/icons/Search';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import Menu from './menu';
import Resultados from './resultadoBusca';
import useStyles from './styles';
import { Service } from '../lib/service';

import Painel from './painel';
import ListaPapeis from './listaPapeis';
import ListaContratos from './listaContratos';

export default function Main(props) {
  const menuRecolhivel = true;
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  //texto de busca
  const [textoFiltro, setTextoFiltro] = React.useState('');
  function onChange(event) {
    setTextoFiltro(event.target.value);
    props.app.controllers.Procedimento.buscaProcessos(textoFiltro);
  }

  //Buscando procedimentos
  /*const [procedimentos, setProcedimentos] = React.useState([]);

  React.useEffect(() => {
    Service.getAll({ nomeModeloPlural: 'procedimentos' }).then(response => {
      setPapeis(response.data);
    });
    Service.getAll({ nomeModeloPlural: 'papeis' }).then(response => {
      setProcedimentos(response.data);
    });
  }, []);*/

  const [value, setValue] = React.useState(0);
  function handleChange(newValue) {
    setValue(newValue);
  }

  return (
    <div className={classes.root}>
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden,
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Base de Conhecimento de Processos e Procedimentos
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Como fazer … "
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              value={textoFiltro}
              onChange={onChange}
            />
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <img width="100" height="54" src="img/logo.png" style={{position:'absolute',top:'5px', left:'10px'}}/>
        {menuRecolhivel && (
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
        )}
        <Divider />
        <List>
          <Menu dados={props.dados} onClick={handleChange} menuExpandido={open} />
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container className={classes.container}>
          <Resultados textoFiltro={textoFiltro} dados={props.dados} />
          {value == 'grupos' && <ListaContratos />}
          {value == 'papeis' && <ListaPapeis />}
        </Container>
      </main>
    </div>
  );
}
