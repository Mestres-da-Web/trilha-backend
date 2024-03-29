
import { inject, injectable } from 'tsyringe';
import { Cart } from '../model/cart';
import { ICartsRepository } from '../repositories/ICartsRepository';
import { IPaginatedRequest } from '@shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from '@shared/interfaces/IPaginatedResponse';
import { AppError } from '@shared/erros/AppError';

interface IRequest {
  request_id: string;
  id: string;
}

@injectable()
class DeleteCartService {
  constructor(
    @inject("CartsRepository")
    private cartsRepository: ICartsRepository
    ) {}

  async execute({
    request_id,
    id,
  }: IRequest): Promise<void> {

    const cart = await this.cartsRepository.findBy({
      id: id,
      user_id: request_id,
    });

    if(!cart){
      throw new AppError("Carrinho não encontrado", 404);
    }

    await this.cartsRepository.delete(cart.id);

    return;
  }
}

export { DeleteCartService };
