import { IPaginatedRequest } from '../../../shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from '../../../shared/interfaces/IPaginatedResponse';
import { Specification } from '../model/Specification';

interface ICreateSpecificationDto {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  create({ name, description }: ICreateSpecificationDto): Specification;
  save(specification: Specification): Promise<Specification>;
  findByName(name: string): Promise<Specification | undefined>;
  list(paginatedRequest:  IPaginatedRequest<Specification>): Promise<IPaginatedResponse<Specification>>;
  // findById(id: string): Specification | undefined;
  findBy(filters: Partial<Specification>): Promise<Specification | undefined>;

  delete(id: string): Promise<void>;
}

export { ISpecificationsRepository, ICreateSpecificationDto };
