import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { AccountCircle, Close } from '@material-ui/icons';
import { ShoppingCart } from '@mui/icons-material';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import { Badge, Container, createTheme, IconButton, Menu, MenuItem } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { Box } from '@mui/system';
import Login from 'features/Auth/components/Login';
import Register from 'features/Auth/components/Register';
import { logout } from 'features/Auth/userSlice';
import { cartItemsCountSelector } from 'features/Cart/selectors';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Link, NavLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const theme = createTheme()
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar:{
    backgroundColor: '#1a94ff',
  },
  logo:{
    textDecoration: "none",
    color: theme.palette.grey[100],
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    fontWeight: 'bold',
    textDecoration: "none",
    color: theme.palette.primary.dark,
  },
  linkLg: {
    fontWeight: 'bold',
    textDecoration: "none",
    color: theme.palette.grey[100],
    marginLeft: theme.spacing(2),
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

  const history = useHistory()

  const loggedInUser = useSelector(state => state.user.current);
  const isLoggedIn = !!loggedInUser.id;
  
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(MODE.LOGIN);

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const cartItemsCount = useSelector(cartItemsCountSelector)

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

  const handleCartClick = () => {
    history.push('/cart')
  }
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  return (
    <Box className={classes.root} >
      <AppBar className={classes.appBar} position="static">
        <Container maxWidth="xl">
          <Toolbar> 
            <Box sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
              <SettingsEthernetIcon className={classes.Icon} />
              <Typography variant="h6" noWrap className={classes.title}>
              <Link to="/" className={classes.logo}>
                T SHOP
              </Link>
              </Typography>
            </Box>
              

              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                    <MenuItem  onClick={handleCloseNavMenu}>
                      <NavLink to="/" className={classes.link}>
                        Home
                      </NavLink>
                    </MenuItem>
                    <MenuItem  onClick={handleCloseNavMenu}>
                      <NavLink to="/products" className={classes.link}>
                        Product
                      </NavLink>
                    </MenuItem>
                    <MenuItem  onClick={handleCloseNavMenu}>
                      <NavLink to="/contact" className={classes.link}>
                        Contact
                      </NavLink>
                    </MenuItem>
                  </Menu>
                </Box>
            


              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent:'flex-end'}}>
                <NavLink to="/" className={classes.linkLg}>
                  <Button variant='text' sx={{color:theme.palette.grey[100]}}>
                  Home
                  </Button>
                </NavLink>

                <NavLink to="/products" className={classes.linkLg}>
                  <Button variant='text' sx={{color:theme.palette.grey[100]}}>
                  Product
                  </Button>
                </NavLink>

                <NavLink to="/contact" className={classes.linkLg}>
                  <Button variant='text' sx={{color:theme.palette.grey[100]}}>
                  Contact
                  </Button>
                </NavLink>
              </Box>
             <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <SettingsEthernetIcon className={classes.Icon} />
              <Typography variant="h6" noWrap className={classes.title}>
              <Link to="/" className={classes.logo}>
                T SHOP
              </Link>
              </Typography>
            </Box>
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
                <IconButton size="large" aria-label="show 4 new mails" color="inherit" onClick={handleCartClick}>            
              <Badge badgeContent={cartItemsCount} color="error">
                <ShoppingCart />
              </Badge>
            </IconButton>
          </Toolbar>
        
        </Container>
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