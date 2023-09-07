import { v4 as uuidv4 } from 'uuid';

import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { cart_status } from './dto/cart_status';
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


  @ManyToOne(() => Cart, cart => cart.cart_items )
  @JoinColumn({
    name: 'cart_id'
  })
  cart: Cart;

  @Column()
  cart_id: string;
}

export { Cart_item };
