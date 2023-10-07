

import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/erros/AppError';
import { IHashProviderDto } from '../../../shared/container/providers/HashProvider/model/IHashProvider';
import { Order } from '../model/Order';
import { IOrdersRepository } from '../repositories/IOrdersRepository';
import { ICartsRepository } from '../../carts/repositories/ICartsRepository';
import { IAddressesRepository } from '../../address/repositories/IAddressesRepository';
import { IProductsRepository } from '../../products/repositories/IProductsRepository';
import { Product } from '../../products/model/Product';

interface IRequest {
  cart_id: string,
  address_id: string;
  request_id: string;
}

@injectable()
class CreateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,


    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('CartsRepository')
    private cartsRepository: ICartsRepository,

  ) {}

  async execute({ ...data }: IRequest): Promise<Order> {

    const cart = await this.cartsRepository.findBy({
      id: data.cart_id,
      user_id: data.request_id
    });

    if(!cart){
      throw new AppError("Carrinho não encontrado", 404)
    }

    if(cart.order){
      throw new AppError("O carrinho selecionado já esta dentro de um pedido", 403)
    }

    cart.cart_items.map(item => {
      if(item.product.stock < item.quantity){
        throw new AppError("A quantidade do produto "+item.product.name+" não está disponível", 400);
      }
    })

    const address = await this.addressesRepository.findBy({
      id: data.address_id,
      user_id: data.request_id,
    });

    if(!address){
      throw new AppError("Endereço não encontrado", 404)
    }
    
    const createdOrder = this.ordersRepository.create({ 
      address_id: data.address_id,
      cart_id: data.cart_id,
      user_id: data.request_id,
     });

    const savedOrder = await this.ordersRepository.save(createdOrder);

    const promises: Promise<Product>[] = [];
    cart.cart_items.map(item => {
      item.product.stock = item.product.stock - item.quantity;
      promises.push(this.productsRepository.save(item.product));
    })

    await Promise.all(promises);

    return savedOrder;
  }
}

export { CreateOrderService };
