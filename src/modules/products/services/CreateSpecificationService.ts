
import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../AppError';
import { ISpecificationsRepository } from '../repositories/ISpecificationsRepository';
import { Specification } from '../model/Specification';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationService {
  constructor(
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository,
  ) {}

  async execute({ name, description }: IRequest): Promise<Specification> {
    const specificationAlreadyExists = await this.specificationsRepository.findBy({
      name,
      description,
    });
    if (specificationAlreadyExists) {
      throw new AppError('Especificação já existe!', 403);
    }
    const createdSpecification = this.specificationsRepository.create({ name, description });
    const savedSpecification = this.specificationsRepository.save(createdSpecification);
    return savedSpecification;
  }
}

export { CreateSpecificationService };
