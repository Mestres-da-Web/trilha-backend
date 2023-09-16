import { v4 as uuidv4 } from 'uuid';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Cart } from '../../carts/model/cart';
import { Address } from '../../address/model/Address';


enum UserRoles {
  master = 'MASTER',
  client = 'CLIENT'
}

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ enum: UserRoles, default: UserRoles.client})
  role: string

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Cart, cart => cart.user, {
    onDelete: 'CASCADE'
  })
  carts: Cart[];


  @OneToMany(() => Address, address => address.user, {
    onDelete: 'CASCADE'
  })
  addresses: Address[];


}

export { User, UserRoles };
