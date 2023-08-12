
import { inject, injectable } from 'tsyringe';
import { Specification } from '../model/Specification';
import { ISpecificationsRepository } from '../repositories/ISpecificationsRepository';
import { IPaginatedRequest } from '../../../shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from '../../../shared/interfaces/IPaginatedResponse';

@injectable()
class IndexSpecificationService {
  constructor(
    @inject("SpecificationsRepository")
    private specificatiosRepository: ISpecificationsRepository
    ) {}

  async execute(paginatedRequest: IPaginatedRequest<Specification>): Promise<IPaginatedResponse<Specification>> {

    const specificatios = await this.specificatiosRepository.list({
      limit: paginatedRequest.limit,
      page: paginatedRequest.page
    });

    return specificatios;
  }
}

export { IndexSpecificationService };
