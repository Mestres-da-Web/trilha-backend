import { Router } from 'express';

import { ProductController } from '../controller/Product.controller'; 
import { ensureAuthorized } from '../../../shared/middleware/ensureAuthorized';
import { UserRoles } from '../../users/model/User';
import { verifyPermission } from '../../../shared/middleware/verifyPersmissions';
import multer from 'multer';
import { uploadConfig } from '../../../config/upload';

const uploadMulter = multer(uploadConfig.multer)


const productsRouter = Router();

const productController = new ProductController();


productsRouter.post('/',uploadMulter.array('images'), verifyPermission([UserRoles.master]), productController.create);

productsRouter.get('/', productController.list);

productsRouter.get('/:id', productController.show);

productsRouter.delete('/:id',verifyPermission([UserRoles.master]), productController.delete);

productsRouter.put('/:id', verifyPermission([UserRoles.master]), productController.update);




export { productsRouter };
