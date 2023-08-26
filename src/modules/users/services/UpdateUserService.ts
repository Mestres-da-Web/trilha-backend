import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../AppError';
import { IUsersRepository } from '../repositories/IUsersRepository';
import { User, UserRoles } from '../model/User';

interface IRequest {
  id: string;
  name: string;
  email: string;
  password: string;
  request_id: string;
}

@injectable()
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({request_id, ...userValues}: IRequest): Promise<User> {
    const userExists = await this.usersRepository.findBy({
      id: userValues.id,
    });
    if(!userExists){
      throw new AppError("Usuário não encontrada", 404);
    }

    const requestUser = await this.usersRepository.findBy({
      id: request_id,
    });

    if(!requestUser){
      throw new AppError("Não autorizado", 401);
    }

    if(requestUser.id !== userExists.id && requestUser.role !== UserRoles.master){
      throw new AppError("Não autorizado", 401);
    }


    Object.assign(userExists, {
      ...userValues
    });

    const savedUser = this.usersRepository.save(userExists);
    return savedUser;
  }
}

export { UpdateUserService };
