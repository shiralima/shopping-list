import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

import { useAlert } from './AlertContext';

import { Category } from '../types/interfaces/category.interface';
import { AlertType } from '../types/enums/AlertType.enum';

interface ShopContextType {
  categories: Category[];
  addProduct: (name: string, categoryId: number) => void;
  finishOrder: () => void;
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
      setAlert({ message: "הייתה בעיה בהבאת הקטגוריות מהשרת, נסו לרענון", type: AlertType.ERROR })
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

    setAlert({ message: "הזמנה בוצעה בהצלחה! מוזמנים ליצור הזמנה חדש. ניתן לאפס את ההזמנה או להוסיף מוצרים עוד מוצרים להזמנה הישנה שלכם ולהזמין אותם עוד פעם", type: AlertType.SUCCESS })
  }

  const clearOrder = async () => {
    try {

      await fetch('/api/products', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      setAlert({ message: "סל הקניות נוקה בהצלחה, מוזמנים לאסוף מוצרים חדשים", type: AlertType.SUCCESS });

      await getCategories();  
    } catch (error) {
      console.log('error:', error)
      setAlert({ message: "אירעה שגיאה בניקוי סל הקניות, נסו לרענון", type: AlertType.ERROR });
    }
  }

  useEffect(() => {

    const inzaliseStates = async () => {
      await getCategories();
    }

    inzaliseStates();

  }, []);

  return (
    <ShopContext.Provider value={{ categories, finishOrder, addProduct, clearOrder }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext)!;
