import { IncomingMessage, ServerResponse } from 'http';
import { addProduct, getProducts } from '../services/productService';

export const productsController = async (req: IncomingMessage, res: ServerResponse) => {
  if (req.method === 'POST' && req.url === '/api/products') {
    await handleAddProduct(req, res);
  } else if (req.method === 'GET' && req.url === '/api/products') {
    await handleGetProducts(req, res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
};

const handleAddProduct = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    let body = ''; //todo - put it outside
    req.on('data', chunk => body += chunk.toString());
    req.on('end', async () => {
      try {
        const { name, categoryId } = JSON.parse(body);

        if (!name || !categoryId) {
          res.writeHead(400, { 'Content-Type': 'text/plain' });
          res.end('Bad Request: Missing name or categoryId');
          return;
        }

        const product = await addProduct(name, categoryId);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(product));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Invalid JSON');
      }
    });
  } catch (error) {
    console.error('Error adding product:', error);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal Server Error');
  }
};

const handleGetProducts = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const products = await getProducts();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(products));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal Server Error');
  }
};
