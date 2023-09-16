
import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../AppError';
import { IAddressesRepository } from '../repositories/IAddressesRepository';
import { Address } from '../model/Address';


interface IRequest {
  id: string;
  request_id: string;
}

@injectable()
class ShowAddressService {
  constructor(
    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,
  ) {}

  async execute({ id, request_id }: IRequest): Promise<Address> {
    const addressExists = await this.addressesRepository.findBy({
      id,
      user_id: request_id,
    });
    if(!addressExists){
      throw new AppError("Endereço não encontrado", 404);
    }
    
    return addressExists;
  }
}

export { ShowAddressService };
