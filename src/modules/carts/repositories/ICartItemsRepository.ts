import { IPaginatedRequest } from '@shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from '@shared/interfaces/IPaginatedResponse';
import { Cart_item } from '../model/cart_item'


interface ICreateCartItemDto {
  cart_id: string;
  product_id: string;
  quantity: number;
}

interface ICartItemsRepository {
  create(cart_item: ICreateCartItemDto): Cart_item;
  save(cartItems: Cart_item): Promise<Cart_item>;
  list({page, limit}: IPaginatedRequest<Cart_item>): Promise<IPaginatedResponse<Cart_item>>;
  findBy(filters: Partial<Cart_item>): Promise<Cart_item | undefined>;
  delete(id: string): Promise<void>;
}

export { ICartItemsRepository, ICreateCartItemDto };
