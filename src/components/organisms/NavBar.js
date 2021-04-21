import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import { removeToken } from '../../auth';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  link: {
      textDecoration: 'none',
      color: '#424242',
  }
});

function NavBar({ handleLogout }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const logOut = () => {
    removeToken();
    handleLogout();
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position='static' className={classes.root}>
      <Toolbar>
        <div>
          <IconButton aria-label='menu' onClick={handleMenu} color='inherit'>
            <MenuIcon />
          </IconButton>
          <Menu
            id='menu-appbar'
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}><Link className={classes.link} to='/list'>Tasks list</Link></MenuItem>
            <MenuItem onClick={handleClose}><Link className={classes.link} to='/contact-form'>Contact form</Link></MenuItem>
          </Menu>
        </div>
        <Typography variant='h6' className={classes.title}>
          Let's do this!
        </Typography>
        <Button variant='contained' color='secondary' size='small' onClick={logOut}>
          Log out
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
