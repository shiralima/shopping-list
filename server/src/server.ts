import 'dotenv/config';
import http, { IncomingMessage, ServerResponse } from 'http';
import { initializeDatabase } from './config/db';
import { categoriesController } from './controllers/categoryController';
import { productsController } from './controllers/productController';

const requestHandler = (req: IncomingMessage, res: ServerResponse) => {
  if (req.url?.startsWith('/api/categories')) {
    categoriesController(req, res);
  } else if (req.url?.startsWith('/api/products')) {
    productsController(req, res)
  }
  else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
};

const startServer = async () => {
  try {
    await initializeDatabase();
    const server = http.createServer(requestHandler);
    server.listen(8000, () => {
      console.log('Server is running on http://localhost:8000');
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1); // Exit the process if initialization fails
  }
};

startServer();
