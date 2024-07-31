import { IncomingMessage, ServerResponse } from 'http';
import { deleteProducts, getProducts, saveOrder } from '../services/productService';

export const productsController = async (req: IncomingMessage, res: ServerResponse) => {
  if (req.method === 'POST' && req.url === '/api/products/order') {
    await handleSaveOrder(req, res);
  } else if (req.method === 'GET' && req.url === '/api/products') {
    await handleGetProducts(req, res);
  } else if (req.method === 'DELETE' && req.url === '/api/products') {
    await handleDeleteProducts(req, res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
};

const handleSaveOrder = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    let body = ''; 
    req.on('data', chunk => body += chunk.toString());
    req.on('end', async () => {
      try {
        const { categories } = JSON.parse(body);

        await saveOrder(categories);
        res.end();
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
}

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


const handleDeleteProducts = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    await deleteProducts();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end();
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal Server Error');
  }
};
