import { IPaginatedRequest } from "../../../shared/interfaces/IPaginatedRequest";
import { IPaginatedResponse } from "../../../shared/interfaces/IPaginatedResponse";
import { Product } from "../model/Product";
import { IProductsRepository, ICreateProductDto } from "./IProductsRepository";
import { getRepository, Repository } from "typeorm";

class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  create(productParams: ICreateProductDto): Product {
    const product = this.ormRepository.create({
      ...productParams,
    })
    return product;
  }
  async save(product: Product): Promise<Product>{
    const savedProduct = this.ormRepository.save(product);
    
    return savedProduct;
  }

  async list({
    limit = 50,
    page = 1,
    filters = {},
  }: IPaginatedRequest<Product>): Promise<IPaginatedResponse<Product>> {
    const query = this.ormRepository.createQueryBuilder('products')
    .leftJoinAndSelect('products.brand', 'brand')
    .leftJoinAndSelect('products.specification', 'specification')
    .skip((page - 1) * limit)
    .take(limit);

    if(filters.brand_id){
      query.where('brand.id = :brand_id',{
        brand_id: filters.brand_id
      })
    }

    const [products, total] = await query.getManyAndCount();

    return {
      results: products,
      limit,
      page,
      total,
    };
  }

  // findByName(name: string): Product | undefined {
  //   const product = this.products.find((product) => product.name === name);

  //   return product;
  // }

  async findById(id: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne({
      where: {
        id
      }
    })

    return product;
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id)
  }

}

export { ProductsRepository };
