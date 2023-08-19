
import { inject, injectable } from 'tsyringe';
import { User } from '../model/User';
import { IUsersRepository } from '../repositories/IUsersRepository';
import { IPaginatedRequest } from '../../../shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from '../../../shared/interfaces/IPaginatedResponse';

@injectable()
class IndexUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
    ) {}

  async execute(paginatedRequest: IPaginatedRequest<User>): Promise<IPaginatedResponse<User>> {

    const users = await this.usersRepository.list({
      limit: paginatedRequest.limit,
      page: paginatedRequest.page
    });

    return users;
  }
}

export { IndexUserService };
