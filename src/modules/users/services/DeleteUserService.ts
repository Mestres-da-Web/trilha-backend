import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../AppError';
import { IUsersRepository } from '../repositories/IUsersRepository';
import { UserRoles } from '../model/User';

interface IRequest {
  id: string;
  request_id: string;
}

@injectable()
class DeleteUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ id, request_id  }: IRequest): Promise<void> {
    const userExists = await this.usersRepository.findBy({
      id,
    });
    if(!userExists){
      throw new AppError("Usuário não encontrado", 404);
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

    await this.usersRepository.delete(id);
  }
}

export { DeleteUserService };
