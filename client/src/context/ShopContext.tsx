import React, { createContext, useState, useContext, useEffect, ReactNode, SetStateAction, Dispatch } from 'react';

import { useAlert } from './AlertContext';

import { CATEGORIES_ERROR_MSG, CLEAR_ORDER_ERROR_MSG, CLEAR_ORDER_SUCCESS_MSG } from '../constants/hebrewText';

import { AlertType } from '../types/enums/AlertType.enum';
import { Category } from '../types/interfaces/category.interface';

interface ShopContextType {
  categories: Category[];
  setCategories: Dispatch<SetStateAction<Category[]>>;
  clearOrder: () => void;
}

interface ShopProviderProps {
  children: ReactNode;
}

const ShopContext = createContext<ShopContextType | null>(null);

export const ShopProvider: React.FC<ShopProviderProps> = ({ children }) => {
  const [categories, setCategories] = useState<Category[] | []>([]);

  const { setAlert } = useAlert();

  const getCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      if (!response.ok) {
        throw new Error(`Get Categories Error Status: ${response.status}`);
      }

      const data = await response.json();

      setCategories(data);
    } catch (error) {
      console.log('error:', error);
      setAlert({ message: CATEGORIES_ERROR_MSG, type: AlertType.ERROR })
    }
  };

  const clearOrder = async () => {
    try {

      await fetch('/api/products', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      setAlert({ message: CLEAR_ORDER_SUCCESS_MSG, type: AlertType.SUCCESS });

      await getCategories();
    } catch (error) {
      console.log('error:', error)
      setAlert({ message: CLEAR_ORDER_ERROR_MSG, type: AlertType.ERROR });
    }
  }

  useEffect(() => {
    const initializeCatagories = async () => {
      await getCategories();
    }

    initializeCatagories();
  }, []);

  return (
    <ShopContext.Provider value={{ categories, clearOrder, setCategories }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext)!;
