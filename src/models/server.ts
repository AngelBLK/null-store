import express, { Application } from 'express';

// import routes
import routeProduc from '../routes/product.route';
import user from '../routes/user.route';

// import models

import { Product } from './product.model';
import { User } from './user.model';

export default class Server {
  private app: Application;
  private port: string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '3000';
    this.listen();
    this.midlewares();
    this.routes();
    this.dbConnect();
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Application runnin in port: ${this.port}!`);
    });
  }

  routes() {
    this.app.use('/api/products', routeProduc);
    this.app.use('/api/user', user);
  }

  midlewares() {
    this.app.use(express.json());
  }

  async dbConnect() {
    try {
      await Product.sync();
      await User.sync();
    } catch (error) {
      console.log(`Unable to connect to the data base: ${error}`);
    }
  }
}