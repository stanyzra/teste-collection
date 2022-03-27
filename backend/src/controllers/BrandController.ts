import { Request, Response } from 'express';

import Brand from '../schemas/Brand';

class BrandController {
  public async index(req: Request, res: Response): Promise<Response> {
    const brands = await Brand.find();

    return res.json(brands);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const brand = await Brand.create(req.body);

    return res.json(brand);
  }

  public async findByIndex(req: Request, res: Response): Promise<Response> {
    const { brandId } = req.params;
    const brand = await Brand.findOne({ brandId });

    return res.json(brand);
  }

  public async findIndexAndName(req: Request, res: Response): Promise<Response> {
    // const { brandId, brand } = req.params;
    const brand = await Brand.find({}).select('-_id brandId brandName');

    return res.json(brand);
  }

  public async findIndexByName(req: Request, res: Response): Promise<Response> {
    const { brandName } = req.params;
    const brand = await Brand.findOne({ brandName }).select('-_id brandId');

    return res.json(brand);
  }

  public async patch(req: Request, res: Response): Promise<Response> {
    const { _id } = req.params;
    const brand = await Brand.findByIdAndUpdate({ _id }, req.body, { new: true });

    return res.json(brand);
  }
}

export default new BrandController();
