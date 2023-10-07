
import { container, inject, injectable } from 'tsyringe';
import { AppError } from '@shared/erros/AppError';
import { ICartsRepository } from '../repositories/ICartsRepository';
import { Cart } from '../model/cart'; 
import { IProductsRepository } from '../../products/repositories/IProductsRepository';
import { Product } from '../../products/model/Product';
import { ICartItemsRepository } from '../repositories/ICartItemsRepository';
import { ValidProductsService } from '../../products/services/ValidProductsServices';

interface IRequest {
    products?: IProductQuantity[];
    request_id: string;
}

@injectable()
class CreateCartService {
  validProductsService: ValidProductsService;
  constructor(
    @inject('CartsRepository')
    private cartsRepository: ICartsRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('CartItemsRepository')
    private cartItemsRepository: ICartItemsRepository,
  ) {
    this.validProductsService = container.resolve(ValidProductsService);
  }

  async execute({  request_id, products: productsParams = [] }: IRequest): Promise<Cart> {
    const validProducts = await this.validProductsService.execute(productsParams);
    const cart = this.cartsRepository.create({
      user_id: request_id,
    });
    const cart_items = productsParams.map(productsParam =>{
        return this.cartItemsRepository.create({
            cart_id: cart.id,
            product_id: productsParam.product_id,
            quantity: productsParam.quantity ? productsParam.quantity : 1,
        })
    });

    cart.cart_items = cart_items;

    const savedCart = await this.cartsRepository.save(cart);


    return savedCart;
  }
}

export { CreateCartService };
