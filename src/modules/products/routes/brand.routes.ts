import { Router } from 'express';
import { BrandController } from '../controller/Brand.controller';



const brandsRouter = Router();

const brandController = new BrandController();
/*
* C - create - criar     - post
* R - read   - ler       - get
* U - update - atualizar - put
* D - delete - deletar   - delete
*/

// create
brandsRouter.post('/',brandController.create);

// get
brandsRouter.get('/', brandController.list);

brandsRouter.get('/:id', brandController.show);

// delete
brandsRouter.delete('/:id', brandController.delete);

// update
brandsRouter.put('/:id', brandController.update);



export { brandsRouter };
