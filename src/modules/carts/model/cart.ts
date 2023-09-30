

import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, ManyToOne, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Cart_item } from './cart_item';
import {User} from '../../users/model/User'
import { Order } from '../../order/model/Order';



@Entity("carts")
class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Cart_item, Cart_item => Cart_item.cart, {
    cascade: true,
  })
  cart_items: Cart_item[];

  @ManyToOne(() => User, user => user.carts,{
    onDelete: 'CASCADE'
  })
  @JoinColumn({
    name: 'user_id'
  })
  user: User;

  @OneToOne(() => Order, order => order.cart, {
    nullable: true
  })
  @JoinColumn({
    name: "order_id"
  })
  order?: Order;

  @Column({
    nullable: true
  })
  order_id: string;

  @Column()
  user_id: string;

}

export { Cart };
