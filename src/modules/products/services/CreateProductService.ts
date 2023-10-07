
import { AppError } from '@shared/erros/AppError';
import { IStorageProviderDto } from '../../../shared/container/providers/StorageProvider/model/IStorageProvider';
import { Product } from '../model/Product';
import { Specification } from '../model/Specification';
import { IBrandsRepository } from '../repositories/IBrandsRepository';
import { IProductsRepository } from '../repositories/IProductsRepository';
import { ISpecificationsRepository } from '../repositories/ISpecificationsRepository';
import {inject, injectable} from 'tsyringe'
import {instanceToInstance} from 'class-transformer'

interface IRequest {
  name: string;
  brand_id: string;
  specification_id?: string;
  filenames?: string[];
  stock?: number;
}

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
    
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository,

    @inject('BrandsRepository')
    private brandsRepository: IBrandsRepository,

    @inject("StorageProvider")
    private storageProvider: IStorageProviderDto,

    ) {}

  async execute({ name, brand_id, specification_id, filenames }: IRequest): Promise<Product> {
    const brand = this.brandsRepository.findBy({
      id: brand_id
    });

    if(!brand){
      throw new AppError("Marca não encontrado", 404);
    }

    let specification: Specification | undefined = undefined;
    
    if(specification_id){
      const specification = await this.specificationsRepository.findBy({
        id: specification_id,
      });

      if(!specification){
        throw new AppError("Especificação não encontrada ", 404)  
      }
    }

    const savedPromisesFiles = filenames?.map(async fileName => {
      return await this.storageProvider.saveFile(fileName);
    }).filter(filenames => filenames);

    const savedFiles = await Promise.all(savedPromisesFiles as Promise<string>[])




    const product = this.productsRepository.create({ name, specification_id, brand_id, images: savedFiles });

    const savedProduct = this.productsRepository.save(product);

    return instanceToInstance(savedProduct);
  }
}

export { CreateProductService };
