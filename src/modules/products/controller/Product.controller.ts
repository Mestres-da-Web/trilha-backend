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
        const { name } = request.body;
        const { brand_id, specification_id } = request.body;



        const createProductService = container.resolve(CreateProductService);

        const product = await createProductService.execute({name, brand_id, specification_id});

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

    update(request: Request, response: Response): Response {
        const { id } = request.params;
        const { name } = request.body;
        // const { brand_id } = request.body;

        const updateProductService = container.resolve(UpdateProductService);

        updateProductService.execute({
            id,
            name,

        })


        return response.status(200).send();
    }

    async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const showProductService = container.resolve(ShowProductService);

        const product = await showProductService.execute({id})

        return response.status(200).json(product)
    }

}

export { ProductController };