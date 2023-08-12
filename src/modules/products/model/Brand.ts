import { v4 as uuidv4 } from 'uuid';
import { Product } from './Product';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('brands')
class Brand {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Product, product => product.brand)
  products: Product[]

}

export { Brand };
