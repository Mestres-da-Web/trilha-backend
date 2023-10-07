

import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/erros/AppError';
import { IAddressesRepository } from '../repositories/IAddressesRepository';
import { Address } from '../model/Address';
import { IHashProviderDto } from '../../../shared/container/providers/HashProvider/model/IHashProvider';

interface IRequest {
  zip_code: string;
  city: string;
  state: string;
  neighborhood: string;
  complement: string;
  number: string;
  request_id: string;
}

@injectable()
class CreateAddressService {
  constructor(
    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,

  ) {}

  async execute({ ...data}: IRequest): Promise<Address> {

    const { request_id, ...rest } = data;
    const createdAddress = this.addressesRepository.create({
      user_id: request_id,
      ...rest,
    });
    const savedAddress = await this.addressesRepository.save(createdAddress);

    return savedAddress;
  }
}

export { CreateAddressService };
