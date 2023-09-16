import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateAddressService } from "../services/CreateAddressService";
import { IndexAddressService } from "../services/IndexAddressService";
import { DeleteAddressService } from "../services/DeleteAddressService";
import { UpdateAddressService } from "../services/UpdateAddressService";
import { ShowAddressService } from "../services/ShowAddressService";
// import { CreateAddressService } from "../services/CreateAddressService";
// import { IndexAddressService } from "../services/IndexAddressService";
// import { DeleteAddressService } from "../services/DeleteAddressService";
// import { UpdateAddressService } from "../services/UpdateAddressService";
// import { ShowAddressService } from "../services/ShowAddressService";

class AddressController {
    async create(request: Request, response: Response): Promise<Response> {
        const { 
            zip_code,
            city,
            state,
            neighborhood,
            complement,
            number,
         } = request.body;

        const createAddressService = container.resolve(CreateAddressService);

        const user = await createAddressService.execute({
            zip_code,
            city,
            state,
            neighborhood,
            complement,
            number,
            request_id: request.user.id,
        });

        return response.status(200).send(user);
    }

    async list(request: Request, response: Response): Promise<Response> {
        const { page, limit } = request.query;

        const indexAddressService = container.resolve(IndexAddressService);

        const addresses = await indexAddressService.execute({
            page: Number(page),
            limit: Number(limit),
            filters: {
                user_id: request.user.id,
            }
        })

        return response.status(200).send(addresses);
    }

    async delete(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const request_id  = request.user.id;
        //const { id: request_id } = request.user;

        const deleteAddressService = container.resolve(DeleteAddressService);

        await deleteAddressService.execute({id, request_id});


        return response.status(200).send();
    }

    async update(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { 
            zip_code,
            city,
            state,
            neighborhood,
            complement,
            number,
        } = request.body;
        const request_id = request.user.id;

        const updateAddressService = container.resolve(UpdateAddressService);

        const user = await updateAddressService.execute({
            id,
            zip_code,
            city,
            state,
            neighborhood,
            complement,
            number,
            request_id: request.user.id,
         });


        return response.status(200).send(user);
    }

    async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const showAddressService = container.resolve(ShowAddressService);

        const user = await showAddressService.execute({id, request_id: request.user.id});


        return response.status(200).send(user);
    }

}

export { AddressController };