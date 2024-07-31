import { DataSource } from 'typeorm';
import { Category } from '../entity/Category';
import { Product } from '../entity/Product';

export const AppDataSource = new DataSource({
  type: 'mssql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '1433', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [Category, Product],
  options: {
    encrypt: true,
    trustServerCertificate: true
  }
});
