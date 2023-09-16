import { Router } from 'express';
import { OrderController } from '../controller/Order.controller';
import { verifyPermission } from '../../../shared/middleware/verifyPersmissions';
import { ensureAuthorized } from '../../../shared/middleware/ensureAuthorized';
import { UserRoles } from '../../users/model/User';



const ordersRouter = Router();

const orderController = new OrderController();
/*
* C - create - criar     - post
* R - read   - ler       - get
* U - update - atualizar - put
* D - delete - deletar   - delete
*/

// create
ordersRouter.post('/', verifyPermission([UserRoles.client]), orderController.create);





export { ordersRouter };
