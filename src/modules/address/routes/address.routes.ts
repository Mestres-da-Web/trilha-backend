import { Router } from 'express';
import { verifyPermission } from '../../../shared/middleware/verifyPersmissions';
import { ensureAuthorized } from '../../../shared/middleware/ensureAuthorized';
import { UserRoles } from '../../users/model/User';
import { AddressController } from '../controller/Address.controller';



const addressesRouter = Router();

const addressController = new AddressController();
/*
* C - create - criar     - post
* R - read   - ler       - get
* U - update - atualizar - put
* D - delete - deletar   - delete
*/

// create
addressesRouter.post('/', verifyPermission([UserRoles.client]),addressController.create);

// get
addressesRouter.get('/', verifyPermission([UserRoles.client]), addressController.list);

addressesRouter.get('/:id', verifyPermission([UserRoles.client]), addressController.show);

// delete
addressesRouter.delete('/:id', ensureAuthorized, addressController.delete);

// update
addressesRouter.put('/:id', ensureAuthorized, addressController.update);





export { addressesRouter };
