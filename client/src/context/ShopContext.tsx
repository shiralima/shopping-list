import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

import { Category } from '../types/interfaces/category.interface';

interface ProviderValue {
  categories: Category[];
  getCategories: () => void;
  addProduct: (name: string, categoryId: number) => void;
}

interface ShopProviderProps {
  children: ReactNode;
}

const ShopContext = createContext<ProviderValue | null>(null);

export const ShopProvider: React.FC<ShopProviderProps> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>([]);

  const getCategories = async () => {
    const response = await fetch('/api/categories');
    const data = await response.json();
    setCategories(data);
  };

  const addProduct = async (name: string, categoryId: number) => {
    const response = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, categoryId }),
    });

    const product = await response.json();

    setCategories(prevCategories => {
      return prevCategories.map(category =>
        category.id === categoryId
          ? { ...category, products: [...category.products, product] }
          : category
      );
    });
  };

  useEffect(() => {

    const inzaliseStates = async () => {
      await getCategories();
    }

    inzaliseStates();

  }, []);

  return (
    <ShopContext.Provider value={{ categories, getCategories, addProduct }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext)!;
