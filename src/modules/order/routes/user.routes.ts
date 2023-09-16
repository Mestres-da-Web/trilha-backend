import { Router } from 'express';
import { UserController } from '../controller/User.controller';
import { verifyPermission } from '../../../shared/middleware/verifyPersmissions';
import { UserRoles } from '../model/User';
import { ensureAuthorized } from '../../../shared/middleware/ensureAuthorized';



const usersRouter = Router();

const userController = new UserController();
/*
* C - create - criar     - post
* R - read   - ler       - get
* U - update - atualizar - put
* D - delete - deletar   - delete
*/

// create
usersRouter.post('/',userController.create);

// get
usersRouter.get('/', verifyPermission([UserRoles.master]), userController.list);

usersRouter.get('/:id', verifyPermission([UserRoles.master]), userController.show);

// delete
usersRouter.delete('/:id', ensureAuthorized, userController.delete);

// update
usersRouter.put('/:id', ensureAuthorized, userController.update);



export { usersRouter };
