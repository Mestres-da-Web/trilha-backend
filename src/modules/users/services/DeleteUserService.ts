import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../AppError';
import { IUsersRepository } from '../repositories/IUsersRepository';

interface IRequest {
  id: string;
}

@injectable()
class DeleteUserService {
  constructor(
    @inject("UsersRepository")
    private UsersRepository: IUsersRepository
  ) {}

  async execute({ id }: IRequest): Promise<void> {
    const UserExists = this.UsersRepository.findBy({
      id,
    });
    if(!UserExists){
      throw new AppError("Usuário não encontrado", 404);
    }
    await this.UsersRepository.delete(id);
  }
}

export { DeleteUserService };
