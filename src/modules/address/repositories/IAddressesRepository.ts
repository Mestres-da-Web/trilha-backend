import { IPaginatedRequest } from '@shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from '@shared/interfaces/IPaginatedResponse';
import { Address } from '../model/Address';

interface ICreateAddressDto {
  zip_code: string;
  city: string;
  state: string;
  neighborhood: string;
  complement: string;
  number: string;
  user_id: string;
}

interface IAddressesRepository {
  create(user: ICreateAddressDto): Address;
  save(user: Address): Promise<Address>;
  list(paginatedRequest: IPaginatedRequest<Address>): Promise<IPaginatedResponse<Address>>;
  findBy(filters: Partial<Address>): Promise<Address | undefined>;
  delete(id: string): Promise<void>;
}

export { IAddressesRepository, ICreateAddressDto };
