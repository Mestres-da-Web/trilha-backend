
import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/erros/AppError';
import { ICartsRepository } from '../../carts/repositories/ICartsRepository';
import { Cart } from '../../carts/model/cart'; 
import { IProductsRepository } from '../repositories/IProductsRepository';
import { Product } from '../model/Product';
import { ICartItemsRepository } from '../../carts/repositories/ICartItemsRepository';

@injectable()
class ValidProductsService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

    execute(products: IProductQuantity[]): Promise<Product[]>{
    return Promise.all(
        products.map(async products =>{
            const foundProduct = await this.productsRepository.findById(products.product_id);
            if(!foundProduct){
                throw new AppError('Um dos produtos não foram encontrados', 404);
            }
            return foundProduct;
        }),
    )
  }
}

export { ValidProductsService };
