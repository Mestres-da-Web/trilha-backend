import { Router } from 'express';
import { BrandController } from '../controller/Brand.controller';
import { verifyPermission } from '../../../shared/middleware/verifyPersmissions';
import { UserRoles } from '../../users/model/User';



const brandsRouter = Router();

const brandController = new BrandController();
/*
* C - create - criar     - post
* R - read   - ler       - get
* U - update - atualizar - put
* D - delete - deletar   - delete
*/

// create
brandsRouter.post('/', verifyPermission([UserRoles.master]), brandController.create);

// get
brandsRouter.get('/', brandController.list);

brandsRouter.get('/:id', brandController.show);

// delete
brandsRouter.delete('/:id', verifyPermission([UserRoles.master]), brandController.delete);

// update
brandsRouter.put('/:id', verifyPermission([UserRoles.master]), brandController.update);



export { brandsRouter };
