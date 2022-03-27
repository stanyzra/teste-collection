import { Box } from '@mui/material';
import ResponsiveDrawer from '../components/ResponsiveDrawer';
import Header from '../components/Header';
import Itens from '../components/Itens';
import SearchField from '../components/SearchField';
import ModalCreateProduct from '../components/ModalCreateProduct';
import ModalUpdateProduct from '../components/ModalUptadeProduct';

function Home() {
  // const theme = ButtonStyles;
  return (
  // <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <Header/>
        <SearchField/>
        <ResponsiveDrawer/>
        <Itens/>
        <ModalCreateProduct/>
        <ModalUpdateProduct/>
      </Box>
  // </ThemeProvider>
  );
}

export default Home;
