import { Router } from 'express';

import { verifyPermission } from '../../../shared/middleware/verifyPersmissions';
import { UserRoles } from '../../users/model/User';
import { CartController } from '../controller/Cart.controller';

const cartRouter = Router();

const cartController = new CartController();

cartRouter.post('/',  verifyPermission([UserRoles.client]), cartController.create);

// 
cartRouter.get('/', verifyPermission([UserRoles.client]), cartController.list);
// 
// cartRouter.put('/:id',  verifyPermission([UserRoles.master]), cartController.update);
// 
// cartRouter.delete('/:id',  verifyPermission([UserRoles.master]), cartController.delete);

export { cartRouter };