import React, { useContext } from 'react';
import Box from '@mui/material/Box';
// import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import AddIcon from '@mui/icons-material/Add';
import { ProductContext } from '../context/ProductContext';
// import ModalCreateProduct from './ModalCreateProduct';

const drawerWidth = 240;

export default function ResponsiveDrawer() {
  const { isOpenDrawer, setIsOpenDrawer } = useContext(ProductContext);
  const { setIsOpenModalCreateProduct } = useContext(ProductContext);

  const handleDrawerToggle = () => {
    setIsOpenDrawer(!isOpenDrawer);
  };

  const handleModalCreateProduct = () => {
    setIsOpenModalCreateProduct(true);
    // console.log(isOpenModalCreateProduct);
  };
  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {['Adicionar produto'].map((text) => (
          <ListItem button onClick={handleModalCreateProduct} key={text}>
            <ListItemIcon>
              <AddIcon/>
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      {/* <CssBaseline /> */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="functions"
      >
        <Drawer
          variant="temporary"
          open={isOpenDrawer}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
