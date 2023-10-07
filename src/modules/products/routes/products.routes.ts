import { Router } from 'express';

import { ProductController } from '../controller/Product.controller'; 
import { ensureAuthorized } from '../../../shared/middleware/ensureAuthorized';
import { UserRoles } from '../../users/model/User';
import { verifyPermission } from '../../../shared/middleware/verifyPersmissions';
import multer from 'multer';
import { createProductMiddleware, deleteProductMiddleware, indexProductMiddleware, showProductMiddleware, updateProductMiddleware } from './validator/products.validation';
import { uploadConfig } from '@config/upload';


const uploadMulter = multer(uploadConfig.multer)


const productsRouter = Router();

const productController = new ProductController();


productsRouter.post('/', uploadMulter.array('images'), createProductMiddleware, verifyPermission([UserRoles.master]), productController.create);

productsRouter.get('/', indexProductMiddleware, productController.list);

productsRouter.get('/:id', showProductMiddleware, productController.show);

productsRouter.delete('/:id',deleteProductMiddleware, verifyPermission([UserRoles.master]), productController.delete);

productsRouter.put('/:id', updateProductMiddleware, verifyPermission([UserRoles.master]), productController.update);




export { productsRouter };
