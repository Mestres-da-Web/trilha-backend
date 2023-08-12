import { IPaginatedRequest } from '../../../shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from '../../../shared/interfaces/IPaginatedResponse';
import { Brand } from '../model/Brand';

interface ICreateBrandDto {
  name: string;
}

// interface IUpdateBrandDto extends ICreateBrandDto {
//   id: string;
// }

interface IBrandsRepository {
  create({ name }: ICreateBrandDto): Brand;
  save(brand: Brand): Promise<Brand>;
  list({page, limit}: IPaginatedRequest<Brand>): Promise<IPaginatedResponse<Brand>>;
  findBy(filters: Partial<Brand>): Promise<Brand | undefined>;
  delete(id: string): Promise<void>;
}

export { IBrandsRepository, ICreateBrandDto };
