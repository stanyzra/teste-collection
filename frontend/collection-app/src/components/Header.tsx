import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { ProductContext } from '../context/ProductContext';

const drawerWidth = 240;

function Header() {
  const { isOpenDrawer, setIsOpenDrawer } = useContext(ProductContext);

  const handleDrawerToggle = () => {
    setIsOpenDrawer(!isOpenDrawer);
  };
  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            CRUD de produtos
          </Typography>
        </Toolbar>
      </AppBar>

    </>
  );
}

export default Header;
