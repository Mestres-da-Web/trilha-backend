
import { IPaginatedRequest } from "../../../shared/interfaces/IPaginatedRequest";
import { IPaginatedResponse } from "../../../shared/interfaces/IPaginatedResponse";
import { Product } from "../model/Product";


interface ICreateProductDto {
  name: string;
  brand_id: string;
  specification_id?: string;
  images?: string[];
}

interface IProductsRepository {
  create({ name, specification_id, brand_id, images }: ICreateProductDto): Product;
  save(product: Product): Promise<Product>;
  // update(product: Product): Promise<Product>;
  list(paginatedRequest:  IPaginatedRequest<Product>): Promise<IPaginatedResponse<Product>>;
  // findByName(name: string): Product | undefined;
  findById(id: string): Promise<Product | undefined>;
  delete(id: string): Promise<void>;
}

export { IProductsRepository, ICreateProductDto };
