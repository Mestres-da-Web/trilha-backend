import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/erros/AppError';
import { IAddressesRepository } from '../repositories/IAddressesRepository';
import { Address } from '../model/Address';

interface IRequest {
  id :string;
  zip_code: string;
  city: string;
  state: string;
  neighborhood: string;
  complement: string;
  number: string;
  request_id: string;
}

@injectable()
class UpdateAddressService {
  constructor(
    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository
  ) {}

  async execute({request_id, ...addressValues}: IRequest): Promise<Address> {
    const addressExists = await this.addressesRepository.findBy({
      id: addressValues.id,
    });
    if(!addressExists){
      throw new AppError("Endereço não encontrado", 404);
    }


    Object.assign(addressExists, {
      ...addressValues
    });

    const savedAddress = this.addressesRepository.save(addressExists);
    return savedAddress;
  }
}

export { UpdateAddressService };
