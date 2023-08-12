import { Router } from 'express';
import { SpecificationController } from '../controller/Specification.controller'; 

const specificationsRouter = Router();

const specificationController = new SpecificationController();

specificationsRouter.post('/', specificationController.create);

specificationsRouter.get('/', specificationController.list);

specificationsRouter.put('/:id', specificationController.update);

specificationsRouter.delete('/:id', specificationController.delete);

export { specificationsRouter };
