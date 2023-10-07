import { IPaginatedRequest } from '@shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from '@shared/interfaces/IPaginatedResponse';
import { User } from '../model/User';
import { IUsersRepository, ICreateUserDto } from './IUsersRepository';
import { Repository, getRepository } from 'typeorm'

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  create({ name, email, password }: ICreateUserDto): User {
    return this.ormRepository.create({name, email, password });
  }

  async list({
    page = 1,
    limit = 50,
  }: IPaginatedRequest<User>): Promise<IPaginatedResponse<User>> {
    const [results, total] = await this.ormRepository.findAndCount({
      skip: (page - 1)*limit,
      take: limit,
    })

    return {
      results,
      limit,
      page,
      total
    }
  }

  async findBy(filters: Partial<User>): Promise<User | undefined> {
    return await this.ormRepository.findOne(filters)
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  async save(user: User): Promise<User> {
    return await this.ormRepository.save(user);
  }
  
}

export { UsersRepository };
