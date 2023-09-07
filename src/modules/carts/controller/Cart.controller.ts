import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCartService } from "../services/CreateCartService";
import { IndexCartService } from "../services/IndexBrandService";


class CartController {
    async create(request: Request, response: Response): Promise<Response> {
        const { products } = request.body;
        const { id } = request.user;
        
        const createCartService = container.resolve(CreateCartService);

        const createddCart = await createCartService.execute({
            products: products,
            request_id: id,
        });

        return response.status(200).send(createddCart);
    }

    async list(request: Request, response: Response): Promise<Response> {

        const { page, limit } = request.query;

        const indexCartService = container.resolve(IndexCartService)

        const paginatedResponse = await indexCartService.execute({
            page: Number(page),
            limit: Number(limit),
            filters: {
                user_id: request.user.id,
            }
        });

        return response.status(200).send(paginatedResponse);
    }
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