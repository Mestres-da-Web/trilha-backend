import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateBrandService } from "../services/CreateBrandService";
import { IndexBrandService } from "../services/IndexBrandService";
import { DeleteBrandService } from "../services/DeleteBrandService";
import { UpdateBrandService } from "../services/UpdateBrandService";
import { ShowBrandService } from "../services/ShowBrandService";

class BrandController {
    async create(request: Request, response: Response): Promise<Response> {
        const { name } = request.body;

        const createBrandService = container.resolve(CreateBrandService);

        const brand = await createBrandService.execute({
            name,
        });

        return response.status(200).send(brand);
    }

    async list(request: Request, response: Response): Promise<Response> {
        const { page, limit } = request.query;

        const indexBrandService = container.resolve(IndexBrandService);

        const brands = await indexBrandService.execute({
            page: Number(page),
            limit: Number(limit),
        })

        return response.status(200).send(brands);
    }

    async delete(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const deleteBrandService = container.resolve(DeleteBrandService);

        await deleteBrandService.execute({id});


        return response.status(200).send();
    }

    async update(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { name } = request.body;

        const updateBrandService = container.resolve(UpdateBrandService);

        const brand = await updateBrandService.execute({id,name});


        return response.status(200).send(brand);
    }

    async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const showBrandService = container.resolve(ShowBrandService);

        const brand = await showBrandService.execute({id});


        return response.status(200).send(brand);
    }

}

export { BrandController };