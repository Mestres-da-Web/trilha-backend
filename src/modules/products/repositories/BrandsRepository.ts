import { IPaginatedRequest } from '../../../shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from '../../../shared/interfaces/IPaginatedResponse';
import { Brand } from '../model/Brand';
import { IBrandsRepository, ICreateBrandDto } from './IBrandsRepository';
import { Repository, getRepository } from 'typeorm'

class BrandsRepository implements IBrandsRepository {
  private ormRepository: Repository<Brand>;

  constructor() {
    this.ormRepository = getRepository(Brand);
  }

  create({ name }: ICreateBrandDto): Brand {
    return this.ormRepository.create({name});
  }

  async list({
    page = 1,
    limit = 50,
  }: IPaginatedRequest<Brand>): Promise<IPaginatedResponse<Brand>> {
    const [results, total] = await this.ormRepository.findAndCount({
      skip: (page - 1)*limit,
      take: limit,
    })

    return {
      results,
      limit,
      page,
      total
    }
  }

  async findBy(filters: Partial<Brand>): Promise<Brand | undefined> {
    return await this.ormRepository.findOne(filters)
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  async save(brand: Brand): Promise<Brand> {
    return await this.ormRepository.save(brand);
  }
  
}

export { BrandsRepository };
