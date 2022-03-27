import React, {
  FormEvent, useContext, useEffect, useState,
} from 'react';
import '../styles/ModalCreateProduct.css';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
// import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import {
  Autocomplete, Button, Checkbox,
  FormControlLabel, FormGroup, Grid, TextField, styled,
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
} from '@mui/material';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { ProductContext } from '../context/ProductContext';
import api from '../services/api';

const Input = styled('input')({
  display: 'none',
});

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  // width: { sm: `calc(100% - ${240}px)`, xs: `calc(100% - ${100}px)` },
  // height: '500px',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface Product {
  _id: string,
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

function ModalUpdateProduct() {
  const { ObjectId, setObjectId } = useContext(ProductContext);
  const [newThumb, setNewThumb] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newBrandDescription, setNewBrandDescription] = useState('');
  const [brand, setBrand] = useState<string | null>('Portobello');
  const [newBrandId, setNewBrandId] = useState<number>(0);
  const [newIsActive, setNewIsActive] = useState<Boolean>(true);
  const [newDataInactive, setNewDataInactive] = useState<Date>(new Date());
  const { isOpenModalUpdateProduct, setIsOpenModalUpdateProduct } = useContext(ProductContext);
  const { Products, setProducts } = useContext(ProductContext);
  const [Brands, setBrands] = useState<Brand[]>([]);
  const handleClose = () => setIsOpenModalUpdateProduct(false);
  const [openDialog, setOpenDialog] = useState(false);
  // console.log(`oobject id${ObjectId}`);
  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  async function setIdAndBrandName(name: string | null) {
    setBrand(name);
    const response = await api.get(`brandsIdByName/${name}`);
    const index: Brand = response.data;
    setNewBrandId(index.brandId);
  }

  function setBrandsComboBox() {
    const brandNames = Brands.map((obj) => {
      return obj.brandName;
    });
    return brandNames;
  }

  async function handleUpdItem(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    if (newIsActive === true) {
      api.patch(`Brands/${ObjectId}`, {
        brandDescription: newBrandDescription,
      });
      api.patch(`Products/${ObjectId}`, {
        thumb: newThumb,
        brandId: newBrandId,
        description: newDescription,
        isActive: newIsActive,
        dataInactive: null,
      });
    } else {
      // const actualTime = new Date();
      setNewDataInactive(new Date());
      api.patch(`Brands/${ObjectId}`, {
        brandDescription: newBrandDescription,
      });
      api.patch(`Products/${ObjectId}`, {
        thumb: newThumb,
        brandId: newBrandId,
        description: newDescription,
        isActive: newIsActive,
        dataInactive: (newDataInactive.toISOString()),
      });
    }
    // api.get('/Products').then((response) => {
    //   setProducts(response.data);
    // });
  }

  function getDetails() {
    // console.log('entrou');
    const teste = (Products.map((obj) => {
      return (obj._id);
    }));
    // console.log(teste);
    setObjectId(teste);
    // api.get(/)
    // console.log(dataInactiveConsumed);
    // return dataInactiveConsumed;
  }
  useEffect(() => {
    api.get('/Brands').then((response) => {
      setBrands(response.data);
    });

    api.get('/Products').then((response) => {
      setProducts(response.data);
    });

    getDetails();
    // getDetails();
  }, []);

  const SuccessUpdateDialog = () => {
    return (
      <Box>
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="success-dialog-title"
          aria-describedby="success-dialog-description"
        >
          <DialogTitle id="success-dialog-title">
            {'Alteração de produto e/ou marca'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="success-dialog-description">
              Produto e/ou marca alterado com sucesso.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} autoFocus>
              Fechar
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  };
  return (
    <Box>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isOpenModalUpdateProduct}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isOpenModalUpdateProduct}>
          <Box sx={style}>

            <Typography id="transition-modal-title" variant="h6" component="h2">
              Alterar produto
            </Typography>
            <Box sx={{ marginTop: '25px' }}>
              <form id='form' onSubmit={handleUpdItem}>
                <FormGroup>
                  <Grid container columns={{ xs: 4, sm: 6, md: 6 }} spacing={2}
                  >
                    <Grid item xs={4} sm={6} >
                      <TextareaAutosize
                        value={newDescription}
                        onChange={(e) => {
                          setNewDescription(e.target.value);
                        }}
                        maxRows={30}
                        aria-label="maximum height"
                        maxLength={1900}
                        // defaultValue={Products[0].description }
                        placeholder="Altere a descrição do produto"
                        style={{
                          maxWidth: `calc(100% - ${5}px)`, maxHeight: '15vh', minWidth: `calc(100% - ${5}px)`, height: '15vh',
                        }}
                      />
                    </Grid>
                    <Grid item xs={4} sm={6}>
                      <TextareaAutosize
                        value={newBrandDescription}
                        onChange={(e) => {
                          setNewBrandDescription(e.target.value);
                        }}
                        maxRows={30}
                        aria-label="maximum height"
                        maxLength={1900}
                        placeholder="Altere a descrição da empresa"
                        style={{
                          maxWidth: `calc(100% - ${5}px)`, maxHeight: '15vh', minWidth: `calc(100% - ${5}px)`, height: '15vh',
                        }}
                      />
                    </Grid>
                    <Grid item xs={4} sm={6}>
                      <Box
                        className='divMarcaAndUpload'
                      >
                        <Autocomplete
                          value={brand}
                          onChange={(event: any, newValue: string | null) => {
                            setIdAndBrandName(newValue);
                          }}
                          fullWidth
                          disablePortal
                          id="combo-box-demo"
                          options={setBrandsComboBox()}
                          sx={{ minWidth: { xs: `calc(100% - ${5}px)`, sm: '300px' }, width: { sm: '300px' } }}
                          renderInput={(params) => <TextField {...params} label="Altere a marca" />}
                        />

                        <label htmlFor="icon-button-file">
                          <Input value={newThumb} onChange={(e) => setNewThumb(e.target.value)} accept="image/*" aria-describedby='component-helper-text' id="icon-button-file" type="file" />
                          <Button fullWidth variant="contained" component="span"
                            sx={{ minWidth: { xs: '41vw', sm: '100%' }, width: { xs: '190px', sm: '180px' } }}
                          >
                            Upload de imagem
                          </Button>
                        </label>
                      </Box>
                      <TextField disabled fullWidth
                        defaultValue={getDetails}
                        sx={{ top: 15 }} />
                    </Grid>
                    <Grid item xs={8}>
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <FormControlLabel value={newIsActive} onChange={() => setNewIsActive(!newIsActive)} control={<Checkbox defaultChecked />} label="Ativo" />
                        <Button id='form' onClick={handleClickOpenDialog} type="submit">Atualizar</Button>
                      </Box>
                    </Grid>
                  </Grid>
                </FormGroup>
              </form>
            </Box>
            <SuccessUpdateDialog />
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}

export default ModalUpdateProduct;
