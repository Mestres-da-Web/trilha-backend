
import { inject, injectable } from 'tsyringe';
import { IPaginatedRequest } from '../../../shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from '../../../shared/interfaces/IPaginatedResponse';
import { Address } from '../model/Address';
import { IAddressesRepository } from '../repositories/IAddressesRepository';

@injectable()
class IndexAddressService {
  constructor(
    @inject("AddressesRepository")
    private usersRepository: IAddressesRepository
    ) {}

  async execute(paginatedRequest: IPaginatedRequest<Address>): Promise<IPaginatedResponse<Address>> {

    const users = await this.usersRepository.list({
      limit: paginatedRequest.limit,
      page: paginatedRequest.page,
      filters: paginatedRequest.filters,
    });

    return users;
  }
}

export { IndexAddressService };
