import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/erros/AppError';
import { IBrandsRepository } from '../repositories/IBrandsRepository';

interface IRequest {
  id: string;
}

@injectable()
class DeleteBrandService {
  constructor(
    @inject("BrandsRepository")
    private brandsRepository: IBrandsRepository
  ) {}

  async execute({ id }: IRequest): Promise<void> {
    const brandExists = this.brandsRepository.findBy({
      id,
    });
    if(!brandExists){
      throw new AppError("Marca não encontrado", 404);
    }
    await this.brandsRepository.delete(id);
  }
}

export { DeleteBrandService };
