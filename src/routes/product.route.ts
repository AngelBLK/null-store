import { Router } from 'express';

import {getProducts} from '../controllers/products.controller'
import validateToken from './validateToken.route';

const router = Router();

router.get('/', validateToken, getProducts)

export default router;