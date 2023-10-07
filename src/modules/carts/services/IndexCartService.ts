
import { inject, injectable } from 'tsyringe';
import { Cart } from '../model/cart';
import { ICartsRepository } from '../repositories/ICartsRepository';
import { IPaginatedRequest } from '@shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from '@shared/interfaces/IPaginatedResponse';
import { instanceToInstance } from 'class-transformer';

@injectable()
class IndexCartService {
  constructor(
    @inject("CartsRepository")
    private cartsRepository: ICartsRepository
    ) {}

  async execute(paginatedRequest: IPaginatedRequest<Cart>): Promise<IPaginatedResponse<Cart>> {

    const carts = await this.cartsRepository.list({
      limit: paginatedRequest.limit,
      page: paginatedRequest.page,
      filters: paginatedRequest.filters,
    });

    return {
      results: instanceToInstance(carts.results),
      page: carts.page,
      limit: carts.limit,
      total: carts.total
    };
  }
}

export { IndexCartService };
