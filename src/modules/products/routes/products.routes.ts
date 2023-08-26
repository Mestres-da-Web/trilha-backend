import { Router } from 'express';

import { ProductController } from '../controller/Product.controller'; 
import { ensureAuthorized } from '../../../shared/middleware/ensureAuthorized';
import { UserRoles } from '../../users/model/User';
import { verifyPermission } from '../../../shared/middleware/verifyPersmissions';


const productsRouter = Router();

const productController = new ProductController();

productsRouter.post('/',verifyPermission([UserRoles.master]), productController.create);

productsRouter.get('/', productController.list);

productsRouter.get('/:id', productController.show);

productsRouter.delete('/:id',verifyPermission([UserRoles.master]), productController.delete);

productsRouter.put('/:id', verifyPermission([UserRoles.master]), productController.update);



export { productsRouter };
