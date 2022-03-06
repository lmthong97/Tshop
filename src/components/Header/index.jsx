import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { AccountCircle, Close } from '@material-ui/icons';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import { IconButton, Menu, MenuItem } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { Box } from '@mui/system';
import Login from 'features/Auth/components/Login';
import Register from 'features/Auth/components/Register';
import { logout } from 'features/Auth/userSlice';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

  

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar:{
    backgroundColor: '#1a94ff',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    color: "#fff",
    textDecoration: "none",
  },
  closeBtn: {
    cursor: 'pointer',
    position: "absolute" ,
    top: theme.spacing(1),
    right: theme.spacing(1),
    color: '#9e9e9e',
    zIndex: 1,
  }
}));

const MODE = {
  LOGIN: 'login',
  REGISTER: 'register',
};

export default function Header() {
const dispatch = useDispatch();

  const loggedInUser = useSelector(state => state.user.current);
  const isLoggedIn = !!loggedInUser.id;
  
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(MODE.LOGIN);

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const handleUserClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleLogoutClick = () => {
    const action = logout();
    dispatch(action);
    setAnchorEl(null);
  }
  
  const classes = useStyles();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (e, reason) => {
  if (reason === 'backdropClick') return;
  
  // otherwise close current dialog
    setOpen(false);
  };

  return (
    <Box className={classes.root} >
      <AppBar className={classes.appBar} position="static">
        <Toolbar> 
            <SettingsEthernetIcon className={classes.Icon} />
          
          <Typography variant="h6" className={classes.title}>
            <Link to="/" className= {classes.link}>
              T SHOP
            </Link>
          </Typography>

          <NavLink to="/" className={classes.link}>
            <Button color="inherit">Home</Button>
          </NavLink>

          <NavLink to="/products" className={classes.link}>
            <Button color="inherit">Product</Button>
          </NavLink>

          <NavLink to="/contact" className={classes.link}>
            <Button color="inherit">Contact</Button>
          </NavLink>
            {!isLoggedIn &&(
              <Button 
                color="inherit" 
                onClick={handleClickOpen}
              >
                Login
              </Button>
            )}
            {isLoggedIn &&(
              <IconButton color="inherit" onClick = {handleUserClick}>
                <AccountCircle/>
              </IconButton>
            )}
          
        </Toolbar>
      </AppBar>

      <Menu
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}

        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleCloseMenu}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleCloseMenu}>Profile</MenuItem>
        <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
        <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
      </Menu>

      <Dialog 
        disableEscapeKeyDown 
        open={open} 
        onClose={handleClose}
      >
        <Box className={classes.closeBtn} onClick={handleClose}  >
          <Close ></Close>
        </Box>

        <DialogContent>
          {mode === MODE.REGISTER &&(
            <>
              <Register closeDialog={handleClose}/>
              <Box textAlign='center'>
                <Button color="primary" onClick= {()=>setMode(MODE.LOGIN)}>Already have an account. Login here.</Button>
              </Box>
            </>
          )}
          {mode === MODE.LOGIN &&(
            <>
              <Login closeDialog={handleClose}/>
              <Box textAlign='center'>
                <Button color="primary" onClick= {()=>setMode(MODE.REGISTER)}>Don't have an account. Register here.</Button>
              </Box>
            </>
          )}
        </DialogContent>

      </Dialog>
    </Box>
  );
}