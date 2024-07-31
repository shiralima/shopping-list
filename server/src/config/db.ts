import { initializeCategories } from '../services/categoryService';
import { AppDataSource } from './ormconfig';

export const initializeDatabase = async () => {
  try {
    await AppDataSource.initialize();
    await initializeCategories();
    console.log('Data Source has been initialized!');
  } catch (error) {
    console.error('Error during Data Source initialization:', error);
    throw error;
  }
};
