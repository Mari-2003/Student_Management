import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import useMediaQuery from '@mui/material/useMediaQuery';
import ListItemText from '@mui/material/ListItemText';
import AppsIcon from '@mui/icons-material/Apps';
import { Link , useLocation, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { List } from '@mui/material';
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';
import CampaignIcon from '@mui/icons-material/Campaign';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';

const drawerWidth = 250;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'center',
}));

const AdminSideBar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const location = useLocation();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = React.useState(!isSmallScreen);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    setOpen(!isSmallScreen);
  }, [isSmallScreen]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleLogout = () => {
    window.localStorage.clear();
    window.sessionStorage.clear();
    window.location.href = "/choose";
  };
  
   const userDetails = JSON.parse(window.localStorage.getItem("userDetails"));
   const adminName = userDetails.adminDetails.name || '';
  const firstLetter = adminName.charAt(0).toUpperCase();



  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ 
        color: "black",
        backgroundColor: 'white', 
        boxShadow: "none", 
        borderBottom: 'none', 
        justifyContent:"space-between"
      }}>
        <Toolbar  sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          {isSmallScreen && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 600 }}>
            ADMIN PANEL
          </Typography>

                <Tooltip title="Profile settings" >
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={isMenuOpen ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={isMenuOpen ? 'true' : undefined}
                  >
                    <Avatar sx={{ width: 35, height: 35, backgroundColor:"#b3a3f7" }}>
                        <span style={{ fontSize: "20px"}}>
                           {firstLetter}
                                  </span>
                      </Avatar>
                  </IconButton>
                </Tooltip>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={isMenuOpen}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                      backgroundColor:"#b3a3f7"
                    },
                    '&::before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
               // transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem onClick={handleClose}>
                  <Avatar /> Profile
                </MenuItem>
                <MenuItem onClick={handleLogout} sx={{fontSize:"12px"}}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
              </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant={isSmallScreen ? 'persistent' : 'permanent'}
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <Box sx={{ display: 'flex', alignItems:'center' }}>
            <AppsIcon style={{ height: '40px', marginRight: '10px' }} />
            <Typography variant="h5" fontWeight="bold" noWrap>
              SCHOOL
            </Typography>
          </Box>
        </DrawerHeader>
        <Divider />
        <List sx={{ padding: 0 }}>
          <ListItemButton onClick={() => navigate('/admin/home')} sx={{ mb: 0.5, ml: 2 }}>
            <ListItemIcon>
              <HomeIcon sx={{ fontSize: 30 }} color={location.pathname === ("/" || "/admin/home") ? 'primary' : 'inherit'} />
            </ListItemIcon>
            <ListItemText primary="HOME" />
          </ListItemButton>
          <ListItemButton component={Link} to="/admin/viewStudent" sx={{ mb: 0.5, ml: 2, mt: 0.5 }}>
            <ListItemIcon>
              <PersonOutlineIcon sx={{ fontSize: 30 }} color={location.pathname.startsWith("/admin/viewStudent") ? 'primary' : 'inherit'} />
            </ListItemIcon>
            <ListItemText primary="STUDENT" />
          </ListItemButton>
          <ListItemButton component={Link} to="/admin/fees" sx={{ mb: 0.5, ml: 2 }}>
            <ListItemIcon>
              <CurrencyRupeeOutlinedIcon sx={{ fontSize: 30 }} color={location.pathname.startsWith("/admin/fees") ? 'primary' : 'inherit'} />
            </ListItemIcon>
            <ListItemText primary="FEES" />
          </ListItemButton>
          <ListItemButton component={Link} to="/admin/viewFees" sx={{ mb: 0.5, ml: 2 }}>
            <ListItemIcon>
              <CurrencyRupeeOutlinedIcon sx={{ fontSize: 30 }} color={location.pathname.startsWith("/admin/viewFees") ? 'primary' : 'inherit'} />
            </ListItemIcon>
            <ListItemText primary="FEES RECORDS" />
          </ListItemButton>
          <ListItemButton component={Link} to="/admin/circular" sx={{ mb: 0.5, ml: 2 }}>
            <ListItemIcon>
              <CampaignIcon sx={{ fontSize: 30 }} color={location.pathname.startsWith("/admin/circular") ? 'primary' : 'inherit'} />
            </ListItemIcon>
            <ListItemText primary="CIRCULAR" />
          </ListItemButton>
          <ListItemButton component={Link} to="/admin/complain" sx={{ mb: 0.5, ml: 2 }}>
            <ListItemIcon>
              <AnnouncementOutlinedIcon sx={{ fontSize: 30 }} color={location.pathname.startsWith("/admin/complain") ? 'primary' : 'inherit'} />
            </ListItemIcon>
            <ListItemText primary="COMPLAIN" />
          </ListItemButton>
                          <ListItemButton component={Link} to="/admin/profile" sx={{ mb: 0.5 , ml:2 , mt: 0.5}}>
                    <ListItemIcon>
                        <AccountCircleOutlinedIcon  sx={{ fontSize: 30}} color={location.pathname.startsWith("/admin/profile") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="PROFILE" />
                </ListItemButton>
            </List>
      </Drawer>
      
    </Box>
  );
};

export default AdminSideBar;
