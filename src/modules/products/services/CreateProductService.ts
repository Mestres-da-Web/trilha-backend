
import { AppError } from '../../../AppError';
import { Product } from '../model/Product';
import { Specification } from '../model/Specification';
import { IBrandsRepository } from '../repositories/IBrandsRepository';
import { IProductsRepository } from '../repositories/IProductsRepository';
import { ISpecificationsRepository } from '../repositories/ISpecificationsRepository';
import {inject, injectable} from 'tsyringe'

interface IRequest {
  name: string;
  brand_id: string;
  specification_id?: string;
}

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
    
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository,

    //@inject('BrandsRepository')
    //private brandsRepository: IBrandsRepository,
    //rivate specificationsRepository: ISpecificationsRepository
    ) {}

  async execute({ name, brand_id, specification_id }: IRequest): Promise<Product> {
    // const brand = this.brandsRepository.findById(brand_id);

    // if(!brand){
    //   throw new AppError("Marca não encontrado", 404);
    // }

    // let specification: Specification | undefined = undefined;
    
    if(specification_id){
      const specification = await this.specificationsRepository.findBy({
        id: specification_id,
      });

      if(!specification){
        throw new AppError("Especificação não encontrada ", 404)
      }
    }

    // const productAlreadyExists = this.productsRepository.findByName(name);
    // if (productAlreadyExists) {
    //   throw new AppError('Produto já existe!', 403);
    // }
    const product = this.productsRepository.create({ name, specification_id });
    const savedProduct = this.productsRepository.save(product);

    return savedProduct;
  }
}

export { CreateProductService };
