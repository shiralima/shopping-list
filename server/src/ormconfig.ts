import { DataSource } from 'typeorm';
import { Category } from './entity/Category';
import { Product } from './entity/Product';

export const AppDataSource = new DataSource({
  type: 'mssql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '1433'),
  username: process.env.DB_USER || 'sa',
  password: process.env.DB_PASSWORD || 'Z10mz10m!',
  database: process.env.DB_NAME || 'shopping_list',
  entities: [Category, Product],
  synchronize: true,
  logging: true,
  extra: {
    encrypt: true,  // Enable encryption
    trustServerCertificate: true // Trust the self-signed certificate
  }
});
