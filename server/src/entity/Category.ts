import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from './Product';
import { CategoryType } from '../enums/CategoryType.enum';

@Entity({name : "categories"})
export class Category {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: "nvarchar"
  })  
  name!: CategoryType;

  @OneToMany(() => Product, product => product.category)
  products!: Product[];
}
