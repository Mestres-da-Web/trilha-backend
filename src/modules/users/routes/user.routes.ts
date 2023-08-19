import { Router } from 'express';
import { UserController } from '../controller/User.controller';



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
usersRouter.get('/', userController.list);

usersRouter.get('/:id', userController.show);

// delete
usersRouter.delete('/:id', userController.delete);

// update
usersRouter.put('/:id', userController.update);



export { usersRouter };
