import { v4 as uuidv4 } from 'uuid';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/model/User';
import { Cart } from '../../carts/model/cart';
import { Address } from '../../address/model/Address';
import { OrderStatus } from './dto/Order_status';



@Entity('orders')
class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ enum: OrderStatus, default: OrderStatus.PROCESSING, type: 'varchar' })
  status: OrderStatus;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, user => user.addresses, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({
    name: "user_id"
  })
  user: User;

  @OneToOne(() => Cart, cart => cart.order, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({
    name: "cart_id"
  })
  cart: Cart

  @ManyToOne(() => Address, address => address.order, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({
    name: "address_id"
  })
  address: Address

  

}

export { Order };
