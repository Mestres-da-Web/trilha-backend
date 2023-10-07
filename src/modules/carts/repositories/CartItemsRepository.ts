import { IPaginatedRequest } from '@shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from '@shared/interfaces/IPaginatedResponse';
import { Cart_item } from '../model/cart_item';
import { ICartItemsRepository, ICreateCartItemDto } from '../repositories/ICartItemsRepository'

import { Repository, getRepository } from 'typeorm'

class CartItemsRepository implements ICartItemsRepository {
  private ormRepository: Repository<Cart_item>;

  constructor() {
    this.ormRepository = getRepository(Cart_item);
  }

  create(product: ICreateCartItemDto): Cart_item {
    return this.ormRepository.create({
      ...product
    });
  }

  async list({
    page = 1,
    limit = 50,
  }: IPaginatedRequest<Cart_item>): Promise<IPaginatedResponse<Cart_item>> {
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

  async findBy(filters: Partial<Cart_item>): Promise<Cart_item | undefined> {
    return await this.ormRepository.findOne(filters)
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  async save(cart: Cart_item): Promise<Cart_item> {
    return await this.ormRepository.save(cart);
  }
  
}

export { CartItemsRepository };
