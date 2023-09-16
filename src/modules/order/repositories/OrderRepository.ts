import { IPaginatedRequest } from '../../../shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from '../../../shared/interfaces/IPaginatedResponse';
import { Order } from '../model/Order';
import { IOrdersRepository, ICreateOrderDto } from './IOrdersRepository';
import { Repository, getRepository } from 'typeorm'

class OrdersRepository implements IOrdersRepository {
  private ormRepository: Repository<Order>;

  constructor() {
    this.ormRepository = getRepository(Order);
  }

  create({ ...data }: ICreateOrderDto): Order {
    return this.ormRepository.create({
      ...data
     });
  }

  async list({
    page = 1,
    limit = 50,
  }: IPaginatedRequest<Order>): Promise<IPaginatedResponse<Order>> {
    const [results, total] = await this.ormRepository.findAndCount({
      skip: (page - 1)*limit,
      take: limit,
    })

    return {
      results,
      limit,
      page,
      total
    }
  }

  async findBy(filters: Partial<Order>): Promise<Order | undefined> {
    return await this.ormRepository.findOne(filters)
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  async save(order: Order): Promise<Order> {
    return await this.ormRepository.save(order);
  }
  
}

export { OrdersRepository };
