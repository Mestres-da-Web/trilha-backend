

import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/erros/AppError';
import { IUsersRepository } from '../repositories/IUsersRepository';
import { User } from '../model/User';
import { IHashProviderDto } from '../../../shared/container/providers/HashProvider/model/IHashProvider';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProviderDto

  ) {}

  async execute({ name, email, password }: IRequest): Promise<User> {
    const userAlreadyExists = await this.usersRepository.findBy({
      email
    });
    if (userAlreadyExists) {
      throw new AppError('Email já esta sendo utilizado!', 403);
    }

    const hashPassword = await this.hashProvider.generateHash(password);

    const createdUser = this.usersRepository.create({ name, email, password: hashPassword });
    const savedUser = await this.usersRepository.save(createdUser);

    return savedUser;
  }
}

export { CreateUserService };
