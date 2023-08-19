

import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../AppError';
import { IUsersRepository } from '../repositories/IUsersRepository';
import { User } from '../model/User';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ name, email, password }: IRequest): Promise<User> {
    const userAlreadyExists = await this.usersRepository.findBy({
      email
    });
    if (userAlreadyExists) {
      throw new AppError('Email já esta sendo utilizado!', 403);
    }

    const createdUser = this.usersRepository.create({ name, email, password  });
    const savedUser = await this.usersRepository.save(createdUser);

    return savedUser;
  }
}

export { CreateUserService };
