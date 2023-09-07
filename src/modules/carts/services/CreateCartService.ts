
import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../AppError';
import { ICartsRepository } from '../repositories/ICartsRepository';
import { Cart } from '../model/cart'; 
import { IProductsRepository } from '../../products/repositories/IProductsRepository';
import { Product } from '../../products/model/Product';
import { ICartItemsRepository } from '../repositories/ICartItemsRepository';

interface ICreateCartItems{
    product_id: string,
    quantity: number;
}

interface IRequest {
    products: ICreateCartItems[];
}

@injectable()
class CreateCartService {
  constructor(
    @inject('CartsRepository')
    private cartsRepository: ICartsRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('CartItemsRepository')
    private cartItemsRepository: ICartItemsRepository,
  ) {}

  async execute({ products: productsParams }: IRequest): Promise<Cart> {
    const validProducts = await this.findValidProducts(productsParams);
    const cart = this.cartsRepository.create({});
    const cart_items = productsParams.map(productsParam =>{
        return this.cartItemsRepository.create({
            cart_id: cart.id,
            product_id: productsParam.product_id,
            quantity: productsParam.quantity,
        })
    });

    cart.cart_items = cart_items;

    const savedCart = await this.cartsRepository.save(cart);


    return savedCart;
  }







  

   async findValidProducts(products: ICreateCartItems[]): Promise<Product[]>{
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

export { CreateCartService };
