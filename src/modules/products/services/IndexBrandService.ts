
import { inject, injectable } from 'tsyringe';
import { Brand } from '../model/Brand';
import { IBrandsRepository } from '../repositories/IBrandsRepository';
import { IPaginatedRequest } from '@shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from '@shared/interfaces/IPaginatedResponse';


@injectable()
class IndexBrandService {
  constructor(
    @inject("BrandsRepository")
    private brandsRepository: IBrandsRepository
    ) {}

  async execute(paginatedRequest: IPaginatedRequest<Brand>): Promise<IPaginatedResponse<Brand>> {

    const brands = await this.brandsRepository.list({
      limit: paginatedRequest.limit,
      page: paginatedRequest.page
    });

    return brands;
  }
}

export { IndexBrandService };
