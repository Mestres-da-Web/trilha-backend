
import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../AppError';
import { IUsersRepository } from '../repositories/IUsersRepository';
import { User } from '../model/User';

interface IRequest {
  id: string;
}

@injectable()
class ShowUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ id }: IRequest): Promise<User> {
    const userExists = await this.usersRepository.findBy({
      id,
    });
    if(!userExists){
      throw new AppError("Usuário não encontrada", 404);
    }
    
    return userExists;
  }
}

export { ShowUserService };
