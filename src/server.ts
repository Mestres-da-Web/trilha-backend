
import './shared/database'
import './shared/container'
import express, { json } from 'express';
import 'express-async-errors';

import { globalErrorHandler } from './globalErrorHandler';
import { productsRouter } from './modules/products/routes/products.routes';
import { specificationsRouter } from './modules/products/routes/specification.routes';
import { brandsRouter } from './modules/products/routes/brand.routes';


const app = express();



app.use(json());

app.use(express.urlencoded({ extended: true }));

app.use('/brands', brandsRouter);
app.use('/specifications', specificationsRouter);
app.use('/products', productsRouter)


app.get('/', (req, res) => {1
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});

app.use(globalErrorHandler);



