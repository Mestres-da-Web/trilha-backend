
import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../AppError';
import { IBrandsRepository } from '../repositories/IBrandsRepository';
import { IProductsRepository } from '../repositories/IProductsRepository';
import { Product } from '../model/Product';

interface IRequest {
  id: string;
  name?: string;
  brand_id?: string;
  stock?: number;
}

@injectable()
class UpdateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('BrandsRepository')
    private brandsRepository: IBrandsRepository,
  ) {}

  async execute(datas: IRequest): Promise<Product> {
    const productExists = await this.productsRepository.findById(datas.id);
    if(!productExists){
      throw new AppError("Produto não encontrado", 404);
    }

    if(datas.brand_id){
      const newBrand = this.brandsRepository.findBy({
        id: datas.brand_id
      });

      if(!newBrand){
        throw new AppError("Marca não encontrada", 404);
      }
    }

    Object.assign(productExists, datas)


    const savedProduct = this.productsRepository.save(productExists);

     return productExists;
  }
}

export { UpdateProductService };
