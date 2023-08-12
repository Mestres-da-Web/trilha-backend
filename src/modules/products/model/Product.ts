import { v4 as uuidv4 } from 'uuid';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Specification } from './Specification';
import { Brand } from './Brand';

@Entity("products")
class Product {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  brand_id: string;
  
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
