
import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../AppError';
import { IProductsRepository } from '../repositories/IProductsRepository';
import { Product } from '../model/Product';

interface IRequest {
  id: string;
}

@injectable()
class ShowProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  async execute({ id }: IRequest): Promise<Product> {
    const productExists = await this.productsRepository.findById(id);
    if(!productExists){
      throw new AppError("Produto não encontrado", 404);
    }
    
    return productExists;
  }
}

export { ShowProductService };
