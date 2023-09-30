
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Specification } from './Specification';
import { Brand } from './Brand';
import { Cart_item } from '../../carts/model/cart_item';

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

  @OneToMany(() => Cart_item, cart_items => cart_items.product)
  @JoinColumn({
    name: 'cart_id'
  })
  cart_items: Cart_item[];

  @Column({
    default: '{}',
    array: true,
    type: "varchar"
  })
  images: string[];
  
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
