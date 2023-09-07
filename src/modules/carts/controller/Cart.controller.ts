import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCartService } from "../services/CreateCartService";
import { IndexCartService } from "../services/IndexCartService";
import { ShowCartService } from "../services/ShowCartService";
import { DeleteCartService } from "../services/DeleteCartService copy";


class CartController {
    async create(request: Request, response: Response): Promise<Response> {
        const { products } = request.body;
        const { id } = request.user;
        
        const createCartService = container.resolve(CreateCartService);

        const createdCart = await createCartService.execute({
            products: products,
            request_id: id,
        });

        return response.status(200).send(createdCart);
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

    async show(request: Request, response: Response): Promise<Response> {

        const { id } = request.params;

        const showCartService = container.resolve(ShowCartService)

        const paginatedResponse = await showCartService.execute({
            id: id,
            request_id: request.user.id,
        });

        return response.status(200).send(paginatedResponse);
    }
    
    async delete(request: Request, response: Response): Promise<void> {
        const { id } = request.params;

        const deleteCartService = container.resolve(DeleteCartService);

        await deleteCartService.execute({
            id: id,
            request_id: request.user.id,
        });

        response.status(200).send();

    }

    // async update(request: Request, response: Response): Promise<Response> {
        // const { id } = request.params;
        // const { name, description } = request.body;
// 
        // const updateCartService = container.resolve(UpdateCartService);
// 
        // const updated = await updateCartService.execute({
            // description,
            // id,
            // name,
        // })
// 
        // return response.status(200).send(updated);
// 
    // }
// 

}

export { CartController };