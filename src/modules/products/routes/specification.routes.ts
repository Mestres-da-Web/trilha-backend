import { Router } from 'express';
import { SpecificationController } from '../controller/Specification.controller'; 
import { verifyPermission } from '../../../shared/middleware/verifyPersmissions';
import { UserRoles } from '../../users/model/User';

const specificationsRouter = Router();

const specificationController = new SpecificationController();

specificationsRouter.post('/',  verifyPermission([UserRoles.master]), specificationController.create);

specificationsRouter.get('/', specificationController.list);

specificationsRouter.put('/:id',  verifyPermission([UserRoles.master]), specificationController.update);

specificationsRouter.delete('/:id',  verifyPermission([UserRoles.master]), specificationController.delete);

export { specificationsRouter };
