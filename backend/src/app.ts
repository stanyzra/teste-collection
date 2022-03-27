import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import uploadImage from '../middlewares/uploadImage';
import routes from './routes';

class App {
  public express: express.Application;

  public constructor() {
    this.express = express();

    this.middlewares();
    this.database();
    this.routes();
    this.uploadImage();
  }

  private middlewares(): void {
    this.express.use(express.json());
    this.express.use(cors());
  }

  private database(): void {
    mongoose.connect('mongodb://localhost:27017/collectionTeste');
  }

  private routes(): void {
    this.express.use(routes);
  }

  private uploadImage(): void {
    this.express.use(uploadImage.single('image'));
  }
}

export default new App().express;
