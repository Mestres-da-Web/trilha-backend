import { IPaginatedRequest } from '../../../shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from '../../../shared/interfaces/IPaginatedResponse';
import { Order } from '../model/Order';

interface ICreateOrderDto {
  address_id: string,
  cart_id: string;
  user_id: string,
}

interface IOrdersRepository {
  create(order: ICreateOrderDto): Order;
  save(order: Order): Promise<Order>;
  list(paginatedRequest: IPaginatedRequest<Order>): Promise<IPaginatedResponse<Order>>;
  findBy(filters: Partial<Order>): Promise<Order | undefined>;
  delete(id: string): Promise<void>;
}

export { IOrdersRepository, ICreateOrderDto };
