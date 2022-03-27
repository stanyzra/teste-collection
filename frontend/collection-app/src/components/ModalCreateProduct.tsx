import React, {
  useContext, useState, FormEvent, useEffect,
} from 'react';
import '../styles/ModalCreateProduct.css';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
// import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import {
  Autocomplete, Button, Checkbox,
  FormControlLabel, Grid, TextField, styled,
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

  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

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

function ModalCreateProduct() {
  const { isOpenModalCreateProduct, setIsOpenModalCreateProduct } = useContext(ProductContext);
  const [newThumb, setNewThumb] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [brand, setBrand] = useState<string | null>('Portobello');
  const [newBrandId, setNewBrandId] = useState<number>(0);
  const [newIsActive, setNewIsActive] = useState<Boolean>(true);
  const [newDataInactive, setNewDataInactive] = useState<Date>(new Date());
  const [openDialog, setOpenDialog] = useState(false);
  const [Brands, setBrands] = useState<Brand[]>([]);
  const { Products, setProducts } = useContext(ProductContext);

  async function uploadImage(e: Event) {
    e.preventDefault();

    await api.post();
  }

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  function clearForm() {
    setNewThumb('');
    setNewDescription('');
    setBrand('Portobello');
    setNewBrandId(0);
    setNewIsActive(true);
    setNewDataInactive(new Date());
  }

  function handleCloseModal() {
    setIsOpenModalCreateProduct(false);
    clearForm();
  }

  useEffect(() => {
    api.get('/Brands').then((response) => {
      setBrands(response.data);
    });

    api.get('/Products').then((response) => {
      setProducts(response.data);
    });
  }, []);

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

  async function handleAddItem(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    if (newIsActive === true) {
      api.post('Products', {
        thumb: newThumb,
        brandId: newBrandId,
        description: newDescription,
        isActive: newIsActive,
        dataInactive: null,
      });
    } else {
      // const actualTime = new Date();
      setNewDataInactive(new Date());
      api.post('Products', {
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

  const SuccessCreateDialog = () => {
    return (
      <Box>
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="success-dialog-title"
          aria-describedby="success-dialog-description"
        >
          <DialogTitle id="success-dialog-title">
            {'Inclusão de produto'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="success-dialog-description">
              Produto incluido com sucesso.
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
        open={isOpenModalCreateProduct}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isOpenModalCreateProduct}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Incluir produto
            </Typography>
            <Box sx={{ marginTop: '25px' }}>

              <form id='form' onSubmit={handleAddItem}>

                <Grid container columns={{ xs: 4, sm: 6, md: 6 }} spacing={2}>
                  <Grid item xs={4} sm={6}>
                    <TextareaAutosize
                      value={newDescription}
                      onChange={(e) => {
                        setNewDescription(e.target.value);
                      }}
                      maxRows={30}
                      aria-label="maximum height"
                      maxLength={1900}
                      placeholder="Insira a descrição do produto"
                      style={{
                        maxWidth: `calc(100% - ${5}px)`, maxHeight: '15vh', minWidth: `calc(100% - ${5}px)`, height: '15vh',
                      }}
                    />
                  </Grid>
                  <Grid item xs={4} sm={6}>
                    <Box
                      className='divMarcaAndUpload'
                    >
                      {/* {console.log(Products)} */}
                      <Autocomplete
                        value={brand}
                        onChange={(event: any, newValue: string | null) => {
                          setIdAndBrandName(newValue);
                        }}
                        // getOptionLabel={(option: number) => option.}
                        fullWidth
                        disablePortal
                        id="combo-box-demo"
                        options={setBrandsComboBox()}
                        sx={{ minWidth: { xs: `calc(100% - ${5}px)`, sm: '300px' }, width: { sm: '300px' } }}
                        renderInput={(params) => <TextField {...params} label="Selecione a marca" />}
                      />
                        <label htmlFor="icon-button-file">
                          <Input value={newThumb} onChange={(e) => setNewThumb(e.target.value)} accept="image/*" aria-describedby='component-helper-text' id="icon-button-file" type="file" />
                          <Button fullWidth variant="contained" component="span"
                            sx={{
                              minWidth: { xs: '41vw', sm: '100%' }, width: { xs: '190px', sm: '180px' },
                            }}
                          >
                            Upload de imagem
                          </Button>
                        </label>
                    </Box>
                  </Grid>
                  <Grid item xs={8}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <FormControlLabel value={newIsActive} onChange={() => setNewIsActive(!newIsActive)} control={<Checkbox defaultChecked />} label="Ativo" />
                      <Button id='form' onClick={handleClickOpenDialog} type="submit">Incluir</Button>
                    </Box>
                  </Grid>
                </Grid>
              </form>
            </Box>
            <SuccessCreateDialog />
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}

export default ModalCreateProduct;
