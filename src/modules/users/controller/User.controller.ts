import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserService } from "../services/CreateUserService";
import { IndexUserService } from "../services/IndexUserService";
import { DeleteUserService } from "../services/DeleteUserService";
import { UpdateUserService } from "../services/UpdateUserService";
import { ShowUserService } from "../services/ShowUserService";

class UserController {
    async create(request: Request, response: Response): Promise<Response> {
        const { name, email, password } = request.body;

        const createUserService = container.resolve(CreateUserService);

        const user = await createUserService.execute({
            name,
            email,
            password,
        });

        return response.status(200).send(user);
    }

    async list(request: Request, response: Response): Promise<Response> {
        const { page, limit } = request.query;

        const indexUserService = container.resolve(IndexUserService);

        const users = await indexUserService.execute({
            page: Number(page),
            limit: Number(limit),
        })

        return response.status(200).send(users);
    }

    async delete(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const request_id  = request.user.id;
        //const { id: request_id } = request.user;

        const deleteUserService = container.resolve(DeleteUserService);

        await deleteUserService.execute({id, request_id});


        return response.status(200).send();
    }

    async update(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { name, email, password } = request.body;
        const request_id = request.user.id;

        const updateUserService = container.resolve(UpdateUserService);

        const user = await updateUserService.execute({id, name, email, password, request_id });


        return response.status(200).send(user);
    }

    async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const showUserService = container.resolve(ShowUserService);

        const user = await showUserService.execute({id});


        return response.status(200).send(user);
    }

}

export { UserController };