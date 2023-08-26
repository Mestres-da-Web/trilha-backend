import {container} from 'tsyringe'
import { IHashProviderDto } from './model/IHashProvider';
import { HashProvider } from './implementation/HashProvider';

container.registerSingleton<IHashProviderDto>('HashProvider', HashProvider);
