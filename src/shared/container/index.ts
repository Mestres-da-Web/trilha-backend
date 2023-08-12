import {container} from 'tsyringe'
import { ProductsRepository } from '../../modules/products/repositories/ProductsRepository'
import { IProductsRepository  } from '../../modules/products/repositories/IProductsRepository'
import { ISpecificationsRepository } from '../../modules/products/repositories/ISpecificationsRepository';
import { SpecificationsRepository } from '../../modules/products/repositories/SpecificationsRepository';
import { IBrandsRepository } from '../../modules/products/repositories/IBrandsRepository';
import { BrandsRepository } from '../../modules/products/repositories/BrandsRepository';

container.registerSingleton<IProductsRepository>('ProductsRepository', ProductsRepository);

container.registerSingleton<ISpecificationsRepository>('SpecificationsRepository', SpecificationsRepository);

container.registerSingleton<IBrandsRepository>('BrandsRepository', BrandsRepository);
