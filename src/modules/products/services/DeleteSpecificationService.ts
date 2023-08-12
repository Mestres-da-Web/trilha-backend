import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../AppError';
import { ISpecificationsRepository } from "../repositories/ISpecificationsRepository";

interface IRequest {
  id: string;
}

@injectable()
class DeleteSpecificationService {
  constructor(
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository,
  ) {}

  execute({ id }: IRequest): void {
    const specificationExists = this.specificationsRepository.findBy({
      id
    });
    if(!specificationExists){
      throw new AppError("Especificação nãso encontrado", 404);
    }
    this.specificationsRepository.delete(id);
  }
}

export { DeleteSpecificationService };
