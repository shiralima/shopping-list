import { IncomingMessage, ServerResponse } from 'http';
import { getCategories } from '../services/categoryService';

export const categoriesController = async (req: IncomingMessage, res: ServerResponse) => {
  if (req.method === 'GET') {
    try {
      const categories = await getCategories();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(categories));
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
    }
  } else {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Method Not Allowed');
  }
};
