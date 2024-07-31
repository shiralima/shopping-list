import { IncomingMessage, ServerResponse } from 'http';
import { getProducts } from '../services/productService';

export const productsController = async (req: IncomingMessage, res: ServerResponse) => {
  if (req.method === 'GET') {
    try {
      const products = await getProducts();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(products));
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
    }
  } else {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Method Not Allowed');
  }
};
