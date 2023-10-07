
import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/erros/AppError';
import { IProductsRepository } from '../repositories/IProductsRepository';


interface IRequest {
  id: string;
}

@injectable()
class DeleteProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  async execute({ id }: IRequest): Promise<void> {
    const productExists = await this.productsRepository.findById(id);
    if(!productExists){
      throw new AppError("Produto não encontrado", 404);
    }
    this.productsRepository.delete(productExists.id);
  }
}

export { DeleteProductService };
