import { Category } from '../entity/Category';
import { AppDataSource } from '../config/ormconfig';
import { CategoryType } from '../enums/CategoryType.enum';

export const getCategories = async () => {
    const categoryRepository = AppDataSource.getRepository(Category);
    return await categoryRepository.find({
        relations: ["products"]
    });
};

export const initializeCategories = async () => {
    const categoryRepository = AppDataSource.getRepository(Category);
    const existingCategories = await categoryRepository.find();

    if (existingCategories.length === 0) {
        // Map enum values to category objects
        const initialCategories = Object.values(CategoryType).map(name => ({ name }));

        await categoryRepository.save(initialCategories);
        console.log('Initial categories table successfully');
    }
};