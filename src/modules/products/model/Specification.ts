import { v4 as uuidv4 } from 'uuid';
import { Product } from './Product';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity("specifications")
class Specification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Product, product => product.specification )
  products: Product[];

}

export { Specification };
