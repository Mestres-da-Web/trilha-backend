
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/model/User';
import { Order } from '../../order/model/Order';



@Entity('addresses')
class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  zip_code: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  neighborhood: string;

  @Column()
  complement: string;
  
  @Column()
  number: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, user => user.addresses, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({
    name: "user_id"
  })
  user: User;

  @Column()
  user_id: string

  @OneToMany(() => Order, order => order.address, {
    onDelete: 'CASCADE'
  })
  order: Order[];

}

export { Address };
