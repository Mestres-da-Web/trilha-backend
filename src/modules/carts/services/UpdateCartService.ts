
import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../AppError';
import { ICartsRepository } from '../repositories/ICartsRepository';
import { Cart } from '../model/cart'; 
import { IProductsRepository } from '../../products/repositories/IProductsRepository';
import { Product } from '../../products/model/Product';

interface IRequest {
    id: string;
    product_ids: string[]
}

@injectable()
class CreateCartService {
  constructor(
    @inject('CartsRepository')
    private cartsRepository: ICartsRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  async execute({ product_ids }: IRequest): Promise<Cart> {
    const products = await this.findValidProducts(product_ids);
    const cart = this.cartsRepository.create({});

    cart.cart_items



    //return savedCart;
  }







  

   async findValidProducts(product_ids: string[]): Promise<Product[]>{
    return Promise.all(
        product_ids.map(async product_id =>{
            const foundProduct = await this.productsRepository.findById(product_id);
            if(!foundProduct){
                throw new AppError('Um dos produtos não foram encontrados', 404);
            }
            return foundProduct;
        }),
    )
  }
}

export { CreateCartService };
