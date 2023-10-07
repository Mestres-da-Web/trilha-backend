
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Specification } from './Specification';
import { Brand } from './Brand';
import { Cart_item } from '../../carts/model/cart_item';
import { Expose } from "class-transformer";
import { uploadConfig } from "../../../config/upload";

@Entity("products")
class Product {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  brand_id: string;

  @Column({
    default: 0
  })
  stock: number;

  @Column({
    array: true,
    type: "varchar",
    default: "{}"
  })
  images: string[];

  @Expose({name: "images_url"})
  getImagesUrls(): string[] {
    if(this.images?.length <= 0){
      return [];
    }

    switch(uploadConfig.driver){
      case 'disk':
        return this.images.map(image =>{
          return `${process.env.API_URL}/files/${image}`
        })
      default: return []
        
    }
  }

  @OneToMany(() => Cart_item, cart_items => cart_items.product)
  @JoinColumn({
    name: 'cart_id'
  })
  cart_items: Cart_item[];
  
  @ManyToOne(() => Brand)
  @JoinColumn({ name: 'brand_id' })
  brand: Brand;

  @Column({ nullable: true })
  specification_id?: string

  @ManyToOne(() => Specification)
  @JoinColumn({ name: 'specification_id' })
  specification?: Specification;

}

export { Product };
