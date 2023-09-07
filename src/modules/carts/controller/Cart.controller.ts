import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCartService } from "../services/CreateCartService";


class CartController {
    async create(request: Request, response: Response): Promise<Response> {
        const { products:[{
            product_id: string,
            quantity: number
        }] } = request.body;
        
        const createCartService = container.resolve(CreateCartService);

        const createddCart = await createCartService.execute({product_ids});

        return response.status(200).send(createddCart);
    }

    // async list(request: Request, response: Response): Promise<Response> {
// 
        // const { page, limit } = request.query;
// 
        // const indexdCartService = container.resolve(IndexdCartService)
// 
        // const paginatedResponse = await indexdCartService.execute({
            // page: Number(page),
            // limit: Number(limit)
        // });
// 
        // return response.status(200).send(paginatedResponse);
    // }
// 
    // async update(request: Request, response: Response): Promise<Response> {
        // const { id } = request.params;
        // const { name, description } = request.body;
// 
        // const updatedCartService = container.resolve(UpdatedCartService);
// 
        // const updated = await updatedCartService.execute({
            // description,
            // id,
            // name,
        // })
// 
        // return response.status(200).send(updated);
// 
    // }
// 
    // async delete(request: Request, response: Response): Promise<void> {
        // const { id } = request.params;
// 
        // const deletedCartService = container.resolve(DeletedCartService);
// 
        // await deletedCartService.execute({id});
// 
        // response.status(200).send();
// 
    // }
}

export { CartController };