
import { container, inject, injectable } from 'tsyringe';
import { AppError } from '../../../AppError';
import { ICartsRepository } from '../repositories/ICartsRepository';
import { Cart } from '../model/cart'; 
import { IProductsRepository } from '../../products/repositories/IProductsRepository';
import { Product } from '../../products/model/Product';
import { ValidProductsService } from '../../products/services/ValidProductsServices';
import { ICartItemsRepository } from '../repositories/ICartItemsRepository';



interface IRequest {
  id: string;
  products?: IProductQuantity[];
  request_id: string;
}

@injectable()
class UpdateCartService {
  validProductsService: ValidProductsService;
  constructor(
    @inject('CartsRepository')
    private cartsRepository: ICartsRepository,

    @inject('CartItemsRepository')
    private cartItemsRepository: ICartItemsRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {
    this.validProductsService = container.resolve(ValidProductsService);
  }

  async execute({ id, products = [], request_id }: IRequest): Promise<Cart> {
    const validProducts = await this.validProductsService.execute(products);

    const cart = await this.cartsRepository.findBy({
      id: id,
      user_id: request_id,
    })

    if(!cart){
      throw new AppError("Carrinho não encontrado", 404);
    }

    await Promise.all(
      cart.cart_items.map(async item =>{
        return await this.cartItemsRepository.delete(item.id);
      })
    )

    cart.cart_items = products.map(prd => {
      return this.cartItemsRepository.create({
        cart_id: cart.id,
        product_id: prd.product_id,
        quantity: prd.quantity? prd.quantity : 1,
      })
    });

    const savedCart = await this.cartsRepository.save(cart)

    return savedCart;
  }
}

export { UpdateCartService };
