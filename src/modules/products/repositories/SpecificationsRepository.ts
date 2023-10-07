import { Repository, getRepository } from 'typeorm';
import { Specification } from '../model/Specification';
import {
  ICreateSpecificationDto,
  ISpecificationsRepository,
} from './ISpecificationsRepository';
import { IPaginatedRequest } from '@shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from '@shared/interfaces/IPaginatedResponse';

class SpecificationsRepository implements ISpecificationsRepository {
  private ormRepository: Repository<Specification>;

  constructor() {
    this.ormRepository = getRepository(Specification);
  }

  create(createData: ICreateSpecificationDto): Specification {
    const specification = this.ormRepository.create({
      ...createData
    });

    return specification;
  }

  async save(specParams: Specification): Promise<Specification> {
    const savedSpecification = await this.ormRepository.save(specParams);

    return savedSpecification;
  }

  async findById(id: string): Promise<Specification | undefined> {
    const specification = await this.ormRepository.findOne({
      where: {
        id,
      }
    });

    return specification;
  }

  async findByName(name: string): Promise<Specification | undefined> {
    const specification = await this.ormRepository.findOne({
      where: {
        name,
      }
    });

    return specification;
  }

  async findBy(filters: Partial<Specification>): Promise<Specification | undefined> {
    const specification = await this.ormRepository.findOne(filters);

    return specification;
  }

  async list({
    limit = 50,
    page = 1,
  }: IPaginatedRequest<Specification>): Promise<IPaginatedResponse<Specification>> {
    
    const [specifications, total] = await this.ormRepository.findAndCount({
      skip: (page - 1)*limit,
      take: limit,
    })

    return {
      results: specifications,
      limit,
      page,
      total,
    };
  }

  // findByName({ name }: ICreateSpecificationDto): Specification | undefined {
  //   const specification = this.specifications.find(
  //     specification => specification.name === name,
  //   );

  //   return specification;
  // }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
  
}

export { SpecificationsRepository };
