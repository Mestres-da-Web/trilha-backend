import { IPaginatedRequest } from '../../../shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from '../../../shared/interfaces/IPaginatedResponse';
import { Cart } from '../model/cart';
import { ICartsRepository, ICreateCartDto } from './ICartsRepository';
import { Repository, getRepository } from 'typeorm'

class CartsRepository implements ICartsRepository {
  private ormRepository: Repository<Cart>;

  constructor() {
    this.ormRepository = getRepository(Cart);
  }

  create(): Cart {
    return this.ormRepository.create({});
  }

  async list({
    page = 1,
    limit = 50,
  }: IPaginatedRequest<Cart>): Promise<IPaginatedResponse<Cart>> {
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

  async findBy(filters: Partial<Cart>): Promise<Cart | undefined> {
    return await this.ormRepository.findOne(filters)
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  async save(cart: Cart): Promise<Cart> {
    return await this.ormRepository.save(cart);
  }
  
}

export { CartsRepository };
