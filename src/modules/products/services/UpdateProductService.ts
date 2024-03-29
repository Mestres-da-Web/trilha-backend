
import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/erros/AppError';
import { IBrandsRepository } from '../repositories/IBrandsRepository';
import { IProductsRepository } from '../repositories/IProductsRepository';
import { Product } from '../model/Product';
import { IStorageProviderDto } from '@shared/container/providers/StorageProvider/model/IStorageProvider';

interface IRequest {
  id: string;
  name?: string;
  brand_id?: string;
  stock?: number;
  filenames: string[]
}

@injectable()
class UpdateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('BrandsRepository')
    private brandsRepository: IBrandsRepository,

    @inject("StorageProvider")
    private storageProvider: IStorageProviderDto,
  ) {}

  async execute({
    filenames,
    ...datas
  }: IRequest): Promise<Product> {
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


    await Promise.all(
      productExists.images.map(async image =>{
        await this.storageProvider.deleteFile(image);
      }),
    )
    await Promise.all(
      filenames.map(async image =>{
        await this.storageProvider.saveFile(image);
      }),
    )


    Object.assign(productExists, datas)

    productExists.images = filenames;

    const savedProduct = this.productsRepository.save(productExists);

     return productExists;
  }
}

export { UpdateProductService };
