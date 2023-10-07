import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/erros/AppError';
import { IBrandsRepository } from '../repositories/IBrandsRepository';
import { Brand } from '../model/Brand';

interface IRequest {
  id: string;
  name: string;
}

@injectable()
class UpdateBrandService {
  constructor(
    @inject('BrandsRepository')
    private brandsRepository: IBrandsRepository
  ) {}

  async execute({ id, name }: IRequest): Promise<Brand> {
    const brandExists = await this.brandsRepository.findBy({
      id,
    });
    if(!brandExists){
      throw new AppError("Marca não encontrada", 404);
    }

    brandExists.name = name;
    const savedBrand = this.brandsRepository.save(brandExists);
    return savedBrand;
  }
}

export { UpdateBrandService };
