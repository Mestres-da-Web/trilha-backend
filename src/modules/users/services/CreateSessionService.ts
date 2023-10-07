
import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/erros/AppError';
import { IUsersRepository } from '../repositories/IUsersRepository';
import { User } from '../model/User';
import { IHashProviderDto } from '../../../shared/container/providers/HashProvider/model/IHashProvider';
import { jwtGenerate } from '../../../shared/util/jwtGenerate';

interface IRequest {
  email: string;
  password: string;
}

@injectable()
class CreateSessionService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject("HashProvider")
    private hashProvider: IHashProviderDto,
  ) {}

  async execute({ email, password }: IRequest): Promise<{
    user: User,
    access_token: string
  }> {
    const userExists = await this.usersRepository.findBy({
      email,
    });
    if(!userExists){
      throw new AppError("Email ou senha inválido", 404);
    }

    if(!await this.hashProvider.compareHash(password, userExists.password)){
      throw new AppError("Email ou senha inválido", 404)
    }

    const token = jwtGenerate(userExists.id, userExists.role);
    
    return {
      user: userExists,
      access_token: token,
    };
  }
}

export { CreateSessionService };
