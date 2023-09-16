import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateSpecificationService } from "../services/CreateSpecificationService";
import { IndexSpecificationService } from "../services/IndexSpecificationService";
import { DeleteSpecificationService } from "../services/DeleteSpecificationService";
import { UpdateSpecificationService } from "../services/UpdateSecificationService";

class SpecificationController {
    // TODO: SHOW

    async create(request: Request, response: Response): Promise<Response> {
        const { name, description } = request.body;
        
        const createSpecificationService = container.resolve(CreateSpecificationService);

        const createdSpecification = await createSpecificationService.execute({name, description});

        return response.status(200).send(createdSpecification);
    }

    async list(request: Request, response: Response): Promise<Response> {

        const { page, limit } = request.query;

        const indexSpecificationService = container.resolve(IndexSpecificationService)

        const paginatedResponse = await indexSpecificationService.execute({
            page: Number(page),
            limit: Number(limit)
        });

        return response.status(200).send(paginatedResponse);
    }

    async update(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { name, description } = request.body;

        const updateSpecificationService = container.resolve(UpdateSpecificationService);

        const updated = await updateSpecificationService.execute({
            description,
            id,
            name,
        })

        return response.status(200).send(updated);

    }

    async delete(request: Request, response: Response): Promise<void> {
        const { id } = request.params;

        const deleteSpecificationService = container.resolve(DeleteSpecificationService);

        await deleteSpecificationService.execute({id});

        response.status(200).send();

    }
}

export { SpecificationController };