import { IPaginatedRequest } from '@shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from '@shared/interfaces/IPaginatedResponse';
import { Address } from '../model/Address';
import { IAddressesRepository, ICreateAddressDto } from './IAddressesRepository';
import { Repository, getRepository } from 'typeorm'

class AddressesRepository implements IAddressesRepository {
  private ormRepository: Repository<Address>;

  constructor() {
    this.ormRepository = getRepository(Address);
  }

  create({ ...data }: ICreateAddressDto): Address {
    return this.ormRepository.create({ ...data });
  }

  async list({
    page = 1,
    limit = 50,
    filters,
  }: IPaginatedRequest<Address>): Promise<IPaginatedResponse<Address>> {
    const [results, total] = await this.ormRepository.findAndCount({
      skip: (page - 1)*limit,
      take: limit,
      where: filters,
    })

    return {
      results,
      limit,
      page,
      total
    }
  }

  async findBy(filters: Partial<Address>): Promise<Address | undefined> {
    return await this.ormRepository.findOne(filters)
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  async save(user: Address): Promise<Address> {
    return await this.ormRepository.save(user);
  }
  
}

export { AddressesRepository };
