import { Request, Response } from "express";
import { CreateProductService } from "../services/CreateProductService";
import { IndexProductService } from "../services/IndexProductService";
import {container} from 'tsyringe'
import { DeleteProductService } from "../services/DeleteProductService";
import { UpdateProductService } from "../services/UpdateProductService";
import { ShowProductService } from "../services/ShowProductService";
//import { myClassTransformer } from "../../ClassTransformer";

class ProductController {
    async create(request: Request, response: Response): Promise<Response> {
        const { name, brand_id, stock, specification_id } = request.body;

        const files = request.files as Express.Multer.File[];

        const filenames = files.map(file => file.filename);

        const createProductService = container.resolve(CreateProductService);

        const product = await createProductService.execute({name, brand_id, specification_id, stock, filenames});

        return response.status(200).send(product);

    }

    async list(request: Request, response: Response): Promise<Response> {
        const { page, limit, brand_id } = request.query;
        console.log("brand_id",brand_id)

        const indexProductService = container.resolve(IndexProductService);
        const products = await indexProductService.execute({page: Number(page), limit: Number(limit), filters: {
            brand_id: brand_id as string,
        }});
        return response.status(200).send(products);
    }

    delete(request: Request, response: Response): Response {
        const { id } = request.params;


        const deleteProductService = container.resolve(DeleteProductService);

        deleteProductService.execute({id})


        return response.status(200).send();
    }

    async update(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { name, brand_id, stock } = request.body;

        const updateProductService = container.resolve(UpdateProductService);

        const product = await updateProductService.execute({
            id,
            name,
            brand_id,
            stock,
        })


        return response.status(200).json(product);
    }

    async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const showProductService = container.resolve(ShowProductService);

        const product = await showProductService.execute({id})

        return response.status(200).json(product)
    }

}

export { ProductController };