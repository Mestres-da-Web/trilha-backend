

import { inject, injectable } from 'tsyringe';
import { IBrandsRepository } from '../repositories/IBrandsRepository';
import { Brand } from '../model/Brand';
import { AppError } from '@shared/erros/AppError';

interface IRequest {
  name: string;
}

@injectable()
class CreateBrandService {
  constructor(
    @inject('BrandsRepository')
    private brandsRepository: IBrandsRepository
  ) {}

  async execute({ name }: IRequest): Promise<Brand> {
    const brandAlreadyExists = await this.brandsRepository.findBy({
      name
    });
    if (brandAlreadyExists) {
      throw new AppError('Marca já existe!', 403);
    }

    const createdBrand = this.brandsRepository.create({ name });
    const savedBrand = await this.brandsRepository.save(createdBrand);

    return savedBrand;
  }
}

export { CreateBrandService };
