import { v4 as uuidv4 } from 'uuid';

import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { cart_status } from './dto/cart_status';
import { Cart_item } from './cart_item';


@Entity("carts")
class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ enum: cart_status, default: cart_status.PROCESSING, type: 'varchar' })
  status: cart_status

  @OneToMany(() => Cart_item, Cart_item => Cart_item.cart, {
    onDelete: 'CASCADE'
  })
  cart_items: Cart_item[];

}

export { Cart };
