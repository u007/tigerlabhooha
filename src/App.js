import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Home from './pages/Home';
import Signup from './pages/Signup';
import Users from './pages/Users';

import './App.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function App() {
  const classes = useStyles();
  return (
    <Router>
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              TigerLab Demo
            </Typography>

            <Link to="/"><Button color="inherit">Home</Button></Link>
            <Link to="/signup"><Button color="inherit">Signup</Button></Link>
            <Link to="/users"><Button color="inherit">Users</Button></Link>

          </Toolbar>
        </AppBar>

        <Switch>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
