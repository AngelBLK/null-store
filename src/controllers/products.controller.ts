import { Request, Response } from 'express'
import { Product } from '../models/product.model';
export const getProducts = async (req: Request, res: Response) => {
  const listProducts = await Product.findAll();
  try {
    res.json({
      status: 1,
      msg: 'Peticion correcta',
      products: listProducts
    });
  } catch (error) {
    res.json({
      status: 0,
      msg: 'Peticion incorrecta',
    });
  }
  
}