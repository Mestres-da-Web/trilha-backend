import { IPaginatedRequest } from '../../../shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from '../../../shared/interfaces/IPaginatedResponse';
import { User } from '../model/User';

interface ICreateUserDto {
  name: string;
  email: string;
  password: string;
}

interface IUsersRepository {
  create(user: ICreateUserDto): User;
  save(user: User): Promise<User>;
  list(paginatedRequest: IPaginatedRequest<User>): Promise<IPaginatedResponse<User>>;
  findBy(filters: Partial<User>): Promise<User | undefined>;
  delete(id: string): Promise<void>;
}

export { IUsersRepository, ICreateUserDto };
