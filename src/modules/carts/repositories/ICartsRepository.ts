import { IPaginatedRequest } from '@shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from '@shared/interfaces/IPaginatedResponse';
import { Cart } from '../model/cart';
import { Cart_item } from '../model/cart_item';

interface ICreateCartDto {
  user_id: string;
}

// interface IUpdateCartDto extends ICreateCartDto {
//   id: string;
// }

interface ICartsRepository {
  create({}: ICreateCartDto): Cart;
  save(cart: Cart): Promise<Cart>;
  list({page, limit}: IPaginatedRequest<Cart>): Promise<IPaginatedResponse<Cart>>;
  findBy(filters: Partial<Cart>): Promise<Cart | undefined>;
  delete(id: string): Promise<void>;
}

export { ICartsRepository, ICreateCartDto };
