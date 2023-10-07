
import { inject, injectable } from 'tsyringe';
import { Product } from '../model/Product';
import { IProductsRepository } from '../repositories/IProductsRepository';
import { IPaginatedRequest } from '../../../shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from '../../../shared/interfaces/IPaginatedResponse';
import {instanceToInstance} from 'class-transformer'

@injectable()
class IndexProductService {
  constructor(
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository
    ) {}

  async execute(paginatedRequest: IPaginatedRequest<Product>): Promise<IPaginatedResponse<Product>> {
    const products = await this.productsRepository.list({
      ...paginatedRequest
    });

    return {
      results: instanceToInstance(products.results),
      limit: products.limit,
      page: products.page,
      total: products.total,
    };
  }
}

export { IndexProductService };
