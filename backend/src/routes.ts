import { Router } from 'express';

import ProductController from './controllers/ProductController';
import BrandController from './controllers/BrandController';

const routes = Router();

routes.get('/products', ProductController.index);
routes.post('/products', ProductController.create);
routes.post('/productsImage', ProductController.uploadImage);
routes.get('/products/:_id', ProductController.findByObjectId);
routes.patch('/products/:_id', ProductController.patch);

routes.patch('/brands/:_id', BrandController.patch);
routes.get('/brands', BrandController.index);
routes.get('/brandsIdAndName', BrandController.findIndexAndName);
routes.get('/brandsIdByName/:brandName', BrandController.findIndexByName);
routes.get('/brands/:brandId', BrandController.findByIndex);
routes.post('/brands', BrandController.create);
// routes.get('/products', ProductController.index);

export default routes;
