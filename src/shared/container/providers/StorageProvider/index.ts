import {container} from 'tsyringe'
import { IStorageProviderDto } from './model/IStorageProvider';
import { StorageProvider } from './implementation/StorageProvider';

container.registerSingleton<IStorageProviderDto>('StorageProvider', StorageProvider);
