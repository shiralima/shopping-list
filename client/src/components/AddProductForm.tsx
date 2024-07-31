import React, { useState } from 'react';
import { Button, Box, SelectChangeEvent } from '@mui/material';

import { useShop } from '../context/ShopContext';
import { useAlert } from '../context/AlertContext';

import ProductInput from './ProductInput';
import CategorySelect from './CategorySelect';

import { ADD, ADD_PRODUCT_MISSING_CATEGORY_MSG, ADD_PRODUCT_MISSING_TEXT_MSG, CLEAR_ORDER, FINISH_ORDER, ORDER_SUCCESS_MSG } from '../constants/hebrewText';

import { AlertType } from '../types/enums/AlertType.enum';
import { Category } from '../types/interfaces/category.interface';

const AddProductForm: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [productText, setProductText] = useState<string>('');
  const { setCategories, categories, clearOrder } = useShop();
  const { setAlert } = useAlert();

  const handleCategoryChange = (event: SelectChangeEvent<number>) => {
    const selectedId = event.target.value as number;
    const selected = categories.find(category => category.id === selectedId) || null;
    setSelectedCategory(selected);
  };

  const handleProductTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductText(event.target.value);
  };

  const finishOrder = async () => {
    await fetch('/api/products/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ categories }),
    });

    setAlert({ message: ORDER_SUCCESS_MSG, type: AlertType.SUCCESS })
  }

  const addProduct = async () => {
    if (!productText) {
      setAlert({ message: ADD_PRODUCT_MISSING_TEXT_MSG, type: AlertType.ERROR });
      return;
    }

    if (!selectedCategory) {
      setAlert({ message: ADD_PRODUCT_MISSING_CATEGORY_MSG, type: AlertType.ERROR });
      return;
    }

    let productFound = false;

    setCategories(prevCategories => {
      return prevCategories.map(category => {
        if (category.id === selectedCategory.id) {
          const updatedProducts = category.products.map(product => {
            if (product.name === productText) {
              productFound = true;
              return { ...product, quantity: (product.quantity || 1) + 1 };
            }
            return product;
          });

          if (!productFound) {
            updatedProducts.push({ name: productText, id: category.products.length + 1, quantity: 1 });
          }

          return { ...category, products: updatedProducts };
        }
        return category;
      });
    });

    setProductText("");
  };

  const isAllCategoriesEmpty = categories.every(category => category.products.length === 0);

  return (
    <Box sx={{ maxWidth: 400, margin: '0 auto', padding: 2 }}>
      <CategorySelect selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />
      <ProductInput productText={productText} onProductTextChange={handleProductTextChange} />
      <Box sx={{ display: 'flex', marginTop: 5, justifyContent: 'space-around' }}>
        <Button variant="contained" color="primary" onClick={addProduct}>
          {ADD}
        </Button>
        {!isAllCategoriesEmpty ?
          <>
            <Button variant="contained" color="primary" onClick={finishOrder}>
              {FINISH_ORDER}
            </Button>
            <Button variant="contained" color="primary" onClick={clearOrder}>
              {CLEAR_ORDER}
            </Button>
          </>
          : null
        }
      </Box>
    </Box>
  );
};

export default AddProductForm;
