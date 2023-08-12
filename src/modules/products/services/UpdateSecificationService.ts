

import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../AppError';
import { ISpecificationsRepository } from '../repositories/ISpecificationsRepository';
import { Specification } from '../model/Specification';

interface IRequest {
  id: string;
  name: string;
  description: string;
}

@injectable()
class UpdateSpecificationService {
  constructor(
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository,
  ) {}

  async execute({ id, name, description }: IRequest): Promise<Specification> {
    const specificationExists = await this.specificationsRepository.findBy({
      id,
    });

    if(!specificationExists){
      throw new AppError("Especificação não encontrado", 404);
    }

    specificationExists.name = name;
    specificationExists.description = description;
    const updatedSpecification = this.specificationsRepository.save(specificationExists);

    return updatedSpecification;
  }
}

export { UpdateSpecificationService };
