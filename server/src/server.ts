import http from 'http';
import { AppDataSource } from './ormconfig';
import { Category } from './entity/Category';
import { Product } from './entity/Product';
import { CategoryType } from './enums/CategoryType.enum';

AppDataSource.initialize()
  .then(async () => {
    console.log('Data Source has been initialized!');

    const categoryRepository = AppDataSource.getRepository(Category);
    const existingCategories = await categoryRepository.find();

    if (existingCategories.length === 0) {
      const initialCategories = [
        { name: CategoryType.FRUITS_AND_VEGETABLE },
        { name: CategoryType.CLEANING_PRODUCTS },
        { name: CategoryType.PASTRIES },
        { name: CategoryType.MEAT_AND_FISH },
        { name: CategoryType.CHEESES },
      ];

      await categoryRepository.save(initialCategories);
      console.log('Initial categories have been inserted');
    }

    const server = http.createServer(async (req, res) => {
      if (req.method === 'GET' && req.url === '/api/categories') {
        try {
          const categories = await AppDataSource.getRepository(Category).find();
          res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify(categories));
        } catch (error) {
          console.error('Error fetching categories:', error);
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Internal Server Error');
        }
      } else if (req.method === 'GET' && req.url === '/api/products') {
        try {
          const products = await AppDataSource.getRepository(Product).find();
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(products));
        } catch (error) {
          console.error('Error fetching products:', error);
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Internal Server Error');
        }
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
      }
    });

    server.listen(8000, () => {
      console.log('Server is running on http://localhost:8000');
    });
  })
  .catch((error) => {
    console.error('Error during Data Source initialization:', error);
  });
