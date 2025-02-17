import { IncomingMessage, ServerResponse } from 'http';
import { getCategories } from '../services/categoryService';
import { Category } from '../entity/Category';

export const categoriesController = async (req: IncomingMessage, res: ServerResponse) => {
  if (req.method === 'GET' && req.url === '/api/categories') {
    await handleGetCategories(res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
};

const handleGetCategories = async (res: ServerResponse) => {
  try {
    const categories = await getCategories();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(categories));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal Server Error');
  }
};
