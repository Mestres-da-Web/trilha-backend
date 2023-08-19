import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../AppError';
import { IUsersRepository } from '../repositories/IUsersRepository';
import { User } from '../model/User';

interface IRequest {
  id: string;
  name: string;
  email: string;
  password: string;
}

@injectable()
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(userValues: IRequest): Promise<User> {
    const userExists = await this.usersRepository.findBy({
      id: userValues.id,
    });
    if(!userExists){
      throw new AppError("Usuário não encontrada", 404);
    }

    Object.assign(userExists, {
      ...userValues
    })

    const savedUser = this.usersRepository.save(userExists);
    return savedUser;
  }
}

export { UpdateUserService };
