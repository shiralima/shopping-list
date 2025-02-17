import { Product } from '../entity/Product';
import { AppDataSource } from '../config/ormconfig';
import { Category } from '../entity/Category';

export const saveOrder = async (categories: Category[]) => {
    const productRepository = AppDataSource.getRepository(Product);
    const categoryRepository = AppDataSource.getRepository(Category);

    const productsToSave = categories.flatMap(category =>
        category.products.map(product => ({
            ...product,
            categoryId: category.id,
        }))
    );


    for (const productData of productsToSave) {
        const category = await categoryRepository.findOneBy({ id: productData.categoryId });
        if (category) {
            const product = productRepository.create({ ...productData, category });
            await productRepository.save(product);
        }
    }
};

export const deleteProducts = async () => {
    const productRepository = AppDataSource.getRepository(Product);
    return await productRepository.clear();
};
