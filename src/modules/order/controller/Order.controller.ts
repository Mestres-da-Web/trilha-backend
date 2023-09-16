import { Request, Response } from "express";
import { container } from "tsyringe";
import { UserRoles } from "../../users/model/User";
import { CreateOrderService } from "../services/CreateOrderService";

class OrderController {
    async create(request: Request, response: Response): Promise<Response> {
        const { cart_id, address_id } = request.body;

        const createOrderService = container.resolve(CreateOrderService);

        const order = await createOrderService.execute({
            cart_id,
            address_id,
            request_id: request.user.id
        });

        return response.status(200).send(order);
    }

    // async list(request: Request, response: Response): Promise<Response> {
    //     const { page, limit } = request.query;

    //     const indexOrderService = container.resolve(IndexOrderService);

    //     const orders = await indexOrderService.execute({
    //         page: Number(page),
    //         limit: Number(limit),
    //         filters: request.user.role !== UserRoles.master? {
    //             user_id: request.user.id
    //         } : undefined
    //     })

    //     return response.status(200).send(orders);
    // }

    // async delete(request: Request, response: Response): Promise<Response> {
    //     const { id } = request.params;
    //     const request_id  = request.user.id;
    //     //const { id: request_id } = request.user;

    //     const deleteOrderService = container.resolve(DeleteOrderService);

    //     await deleteOrderService.execute({id, request_id});


    //     return response.status(200).send();
    // }

    // async update(request: Request, response: Response): Promise<Response> {
    //     const { id } = request.params;
    //     const { status } = request.body;
    //     const request_id = request.user.id;

    //     const updateOrderService = container.resolve(UpdateOrderService);

    //     const order = await updateOrderService.execute({
    //         id,
    //         request_id: request.user.id,
    //      });


    //     return response.status(200).send(order);
    // }

    // async show(request: Request, response: Response): Promise<Response> {
    //     const { id } = request.params;

    //     const showOrderService = container.resolve(ShowOrderService);

    //     const order = await showOrderService.execute({
    //         id,
    //         request_id: request.user.role !== UserRoles.master? request.user.id : undefined
        
    //     });


    //     return response.status(200).send(order);
    // }

}

export { OrderController };