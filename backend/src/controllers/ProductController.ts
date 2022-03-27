import { Request, Response } from 'express';
import uploadImage from '../../middlewares/uploadImage';

import Product from '../schemas/Product';

class ProductController {
  public async index(req: Request, res: Response): Promise<Response> {
    const products = await Product.find();

    return res.json(products);
  }

  public async findByObjectId(req: Request, res: Response): Promise<Response> {
    const { _id } = req.params;
    const product = await Product.findOne({ _id });

    return res.json(product);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const product = await Product.create(req.body);

    return res.json(product);
  }

  public async patch(req: Request, res: Response): Promise<Response> {
    const { _id } = req.params;
    const product = await Product.findByIdAndUpdate({ _id }, req.body, { new: true });

    return res.json(product);
  }

  public async uploadImage(req: Request, res: Response): Promise<Response> {
    const product = await Product.create(req.body);
    // (uploadImage.single('image'));
    return res.json(product);
  }
}

export default new ProductController();
