
import './shared/database'
import './shared/container'
import express, { json } from 'express';
import 'express-async-errors';

import { globalErrorHandler } from './globalErrorHandler';
import { productsRouter } from './modules/products/routes/products.routes';
import { specificationsRouter } from './modules/products/routes/specification.routes';
import { brandsRouter } from './modules/products/routes/brand.routes';
import { usersRouter } from './modules/users/routes/user.routes';
import { sessionsRouter } from './modules/users/routes/session.routes';
import { cartRouter } from './modules/carts/routers/cart.routes';
import { addressesRouter } from './modules/address/routes/address.routes';
import { ordersRouter } from './modules/order/routes/user.routes';


const app = express();



app.use(json());

app.use(express.urlencoded({ extended: true }));

app.use('/brands', brandsRouter);
app.use('/specifications', specificationsRouter);
app.use('/products', productsRouter);
app.use('/users', usersRouter);
app.use('/session', sessionsRouter);
app.use('/cart', cartRouter);
app.use('/address', addressesRouter);
app.use('/order', ordersRouter);


app.get('/', (req, res) => {1
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});

app.use(globalErrorHandler);



