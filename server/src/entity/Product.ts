import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Category } from './Category';

@Entity({ name: "products" })
export class Product { 
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ default: 1 })
  quantity!: number;

  @ManyToOne(() => Category, category => category.products)
  category!: Category;
}
