import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const validateToken = (req: Request, res: Response, next: NextFunction) => {

  try {
    const headerToken = req.headers['authorization'];

  if (headerToken !== undefined && headerToken.startsWith('Bearer')) {
    // Has token
    const bearerToken = headerToken.slice(7);

    const validToken = jwt.verify(bearerToken, process.env.SECRET_KEY || 'auxkey');

    if (!validToken) {
      throw 'Token invalido';
    }
    next();
  } 
  } catch (error) {
    res.status(400).json({
      msg: `Acceso denegado: ${error}`
    });
  }
}

export default validateToken;