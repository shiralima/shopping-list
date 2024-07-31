import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

import { Category } from '../types/interfaces/category.interface';

interface ProviderValue {
  categories: Category[];
  addProduct: (name: string, categoryId: number) => void;
  finishOrder: () => void;
  clearOrder: () => void;
}

interface ShopProviderProps {
  children: ReactNode;
}

const ShopContext = createContext<ProviderValue | null>(null);

export const ShopProvider: React.FC<ShopProviderProps> = ({ children }) => {
  const [categories, setCategories] = useState<Category[] | []>([]);

  const getCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      if (!response.ok) {
        throw new Error(`Get Categories Error Status: ${response.status}`);
      }

      const data = await response.json();

      setCategories(data);
    } catch (error) { //todo alert
      setCategories([]);
    }
  };

  const addProduct = async (name: string, categoryId: number) => {
    let productFound = false;

    setCategories(prevCategories => {
      return prevCategories.map(category => {
        if (category.id === categoryId) {
          const updatedProducts = category.products.map(product => {
            if (product.name === name) {
              productFound = true;
              return { ...product, quantity: (product.quantity || 1) + 1 };
            }
            return product;
          });

          if (!productFound) {
            updatedProducts.push({ name, id: category.products.length + 1, quantity: 1 });
          }

          return { ...category, products: updatedProducts };
        }
        return category;
      });
    });
  };

  const finishOrder = async () => {
    await fetch('/api/products/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ categories }),
    });
  }

  const clearOrder = async () => {
    await fetch('/api/products', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    await getCategories(); //todo 
  }

  useEffect(() => {

    const inzaliseStates = async () => {
      await getCategories();
    }

    console.log('in--')

    inzaliseStates();

  }, []);

  return (
    <ShopContext.Provider value={{ categories, finishOrder, addProduct, clearOrder }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext)!;
