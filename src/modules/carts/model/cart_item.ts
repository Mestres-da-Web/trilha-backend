

import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Cart } from './cart';
import { Product } from '../../products/model/Product';


@Entity("cart_items")
class Cart_item {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    default: 0
  })
  quantity: number;

  @ManyToOne(() => Product, product => product.cart_items )
  @JoinColumn({
    name: 'product_id'
  })
  product: Product;

  @Column()
  product_id: string;


  @ManyToOne(() => Cart, cart => cart.cart_items,{
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'cart_id'
  })
  cart: Cart;

  @Column()
  cart_id: string;
}

export { Cart_item };
