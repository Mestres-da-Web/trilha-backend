import { Router } from 'express';
import { SpecificationController } from '../controller/Specification.controller'; 
import { verifyPermission } from '../../../shared/middleware/verifyPersmissions';
import { UserRoles } from '../../users/model/User';

const cartRouter = Router();

const cartController = new SpecificationController();

cartRouter.post('/',  verifyPermission([UserRoles.client]), cartController.create);

// 
// cartRouter.get('/', cartController.list);
// 
// cartRouter.put('/:id',  verifyPermission([UserRoles.master]), cartController.update);
// 
// cartRouter.delete('/:id',  verifyPermission([UserRoles.master]), cartController.delete);

export { cartRouter };
