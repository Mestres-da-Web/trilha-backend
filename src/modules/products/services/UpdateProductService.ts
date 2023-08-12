
import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../AppError';
import { IBrandsRepository } from '../repositories/IBrandsRepository';
import { IProductsRepository } from '../repositories/IProductsRepository';

interface IRequest {
  id: string;
  name: string;
  brand_id?: string;
}

@injectable()
class UpdateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  async execute({ id, name, brand_id }: IRequest): Promise<void> {
    const productExists = await this.productsRepository.findById(id);
    if(!productExists){
      throw new AppError("Produto não encontrado", 404);
    }

    // if(brand_id){
    //   const newBrand = this.brandsRepository.findById(brand_id);
    //   if(newBrand){
    //     const oldBrand = productExists.brand;
    //     oldBrand.products = oldBrand.products.filter(product => product.id !== productExists.id)
    //     newBrand.products.push(productExists);
    //     productExists.brand = newBrand;
    //   }
    // }

    productExists.name = name;
    this.productsRepository.save(productExists);
  }
}

export { UpdateProductService };
