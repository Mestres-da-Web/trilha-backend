
import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../AppError';
import { IBrandsRepository } from '../repositories/IBrandsRepository';
import { Brand } from '../model/Brand';

interface IRequest {
  id: string;
}

@injectable()
class ShowBrandService {
  constructor(
    @inject('BrandsRepository')
    private brandsRepository: IBrandsRepository,
  ) {}

  async execute({ id }: IRequest): Promise<Brand> {
    const brandExists = await this.brandsRepository.findBy({
      id,
    });
    if(!brandExists){
      throw new AppError("Marca não encontrada", 404);
    }
    
    return brandExists;
  }
}

export { ShowBrandService };
