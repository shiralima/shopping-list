import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Category } from './Category';

@Entity({ name: "products" })
export class Product { //todo fix !
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ default: 1 })
  quantity!: number;

  @ManyToOne(() => Category, category => category.products)
  category!: Category;
}
