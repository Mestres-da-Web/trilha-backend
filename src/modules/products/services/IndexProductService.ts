
import { inject, injectable } from 'tsyringe';
import { Product } from '../model/Product';
import { IProductsRepository } from '../repositories/IProductsRepository';
import { IPaginatedRequest } from '../../../shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from '../../../shared/interfaces/IPaginatedResponse';

@injectable()
class IndexProductService {
  constructor(
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository
    ) {}

  async execute(paginatedRequest: IPaginatedRequest<Product>): Promise<IPaginatedResponse<Product>> {

    const products = await this.productsRepository.list({
      limit: paginatedRequest.limit,
      page: paginatedRequest.page
    });

    return products;
  }
}

export { IndexProductService };
