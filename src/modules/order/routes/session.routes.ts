import { Router } from 'express';
import { SessionController } from '../controller/Session.controller';




const sessionsRouter = Router();

const sessionController = new SessionController();

sessionsRouter.post('/',sessionController.create);



export { sessionsRouter };
