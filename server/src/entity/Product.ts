import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Category } from './Category';

@Entity({ name: "products" })
export class Product { //todo fix !
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column()
  name!: string;

  @ManyToOne(() => Category, category => category.products)
  category!: Category;
}
  