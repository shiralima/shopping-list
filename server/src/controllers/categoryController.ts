import { IncomingMessage, ServerResponse } from 'http';
import { getCategories, getCategoryWithProducts } from '../services/categoryService';

export const categoriesController = async (req: IncomingMessage, res: ServerResponse) => {
  if (req.method === 'GET' && req.url === '/api/categories') {
    await handleGetCategories(req, res);
  } else if (req.method === 'GET' && req.url?.startsWith('/api/categories/')) {
    const lastSlashParam = req.url.split('/').pop();
    if (!lastSlashParam) { //todo - move all logic for 404 to util
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    }
    const categoryId = parseInt(lastSlashParam!);
    await handleGetCategoryWithProducts(req, res, categoryId);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
};

const handleGetCategories = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const categories = await getCategories();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(categories));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal Server Error');
  }
};

const handleGetCategoryWithProducts = async (req: IncomingMessage, res: ServerResponse, categoryId: number) => {
  try {
    const category = await getCategoryWithProducts(categoryId);
    if (category) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(category));
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end(`Category id Not Found: ${categoryId}`); //todo - security?
    }
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end(`Internal Server Error: ${error}`);
  }
};
