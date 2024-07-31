import { Product } from '../entity/Product';
import { AppDataSource } from '../config/ormconfig';

export const getProducts = async () => {
    const productRepository = AppDataSource.getRepository(Product);
    return await productRepository.find();
};
