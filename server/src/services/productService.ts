import { Product } from '../entity/Product';
import { AppDataSource } from '../config/ormconfig';

export const addProduct = async (name: string, categoryId: number) => {
    const productRepository = AppDataSource.getRepository(Product);
    const product = productRepository.create({ name, category: { id: categoryId } });
    await productRepository.save(product);
    return product;
};

export const getProducts = async () => {
    const productRepository = AppDataSource.getRepository(Product);
    return await productRepository.find();
};
