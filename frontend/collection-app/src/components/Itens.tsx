import React, { useState, useContext, useEffect } from 'react';
import {
  Box, CardActionArea, CardContent, Typography,
} from '@mui/material';
import '../styles/Itens.css';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import api from '../services/api';
import thumb from '../images/thumbprovisoria.jpg';
import SearchField from './SearchField';
import { ProductContext } from '../context/ProductContext';

const drawerWidth = 240;

interface Product {
  thumb: string,
  description: string,
  isActive: boolean,
  brandId: number,
  dataInactive: Date,
}

interface Brand {
  brandId: number,
  brandName: string,
  brandDescription: string,
}

function Itens() {
  const { setIsOpenModalUpdateProduct } = useContext(ProductContext);
  const { Products, setProducts } = useContext(ProductContext);
  const { ObjectId, setObjectId } = useContext(ProductContext);

  // const [item, setItem] = useState<Product>();
  const [search, newSearch] = useState<string>('');
  const [Brands, setBrands] = useState<Brand[]>([]);

  function handleOpenModalUpdateProduct() {
    setIsOpenModalUpdateProduct(true);

    console.log(ObjectId);
  }

  // function searchFilter(teste: Product) {
  //   return Products.((el) => el.toLowerCase().indexOf(teste.toLowerCase()) > -1);
  // }

  // function handleSearchField(event: string) {
  //   newSearch(event);
  //   console.log(`input: ${search}`);
  //   Products.filter((teste) => {
  //     console.log((teste.description.indexOf(search)));
  //   });
  //   console.log(aa);
  // }

  useEffect(() => {
    api.get('/Brands').then((response) => {
      setBrands(response.data);
    });

    api.get('/Products').then((response) => {
      setProducts(response.data);
    });
  }, []);

  return (
    <>
      <Box
        className='searchBarDiv'
        sx={{
          width: { sm: `calc(90% - ${drawerWidth}px)` },
          marginLeft: {
            sm: `calc(460px - ${drawerWidth}px)`,
          },
        }}
      >
        <SearchField
          //  onChange={(e) => { handleSearchField(e.target.value); }}
          fullWidth />
      </Box>
      <Box className='bodyCards' sx={{
        width: { sm: `calc(90% - ${drawerWidth}px)` },
        marginLeft: {
          sm: `calc(460px - ${drawerWidth}px)`,
        },
        position: 'fixed',
      }}>
        <Box className='itens'>
          {/* {Products.map((item) => (
            <Typography gutterBottom variant="h5" component="div">
              {item.brandID}
            </Typography>
          ))} */}
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 6, md: 6 }}>
            {Products.map((item) => (
              <Grid item xs={2} sm={6} md={2}>
                <Card key={item._id}>
                  {setObjectId(item._id)}
                  {console.log(Products)}
                  <CardActionArea onClick={handleOpenModalUpdateProduct}>
                    <CardMedia
                      component="img"
                      // height="100"
                      image={thumb}
                    />
                  </CardActionArea>
                  <CardContent sx={{ background: '#dadac9' }}>
                    <Typography gutterBottom variant="h5" component="div">
                      {item.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {Brands[item.brandId].brandDescription}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default Itens;
