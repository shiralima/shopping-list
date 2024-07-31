import React, { useState } from 'react';
import { Button, Box, SelectChangeEvent } from '@mui/material';
import { useShop } from '../context/ShopContext';
import CategorySelect from './CategorySelect';
import ProductInput from './ProductInput';
import { ADD, CLEAR_ORDER, FINISH_ORDER } from '../constants/hebrewText';
import { Category } from '../types/interfaces/category.interface';

const AddProductForm: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [productText, setProductText] = useState<string>('');
  const { addProduct, categories, finishOrder, clearOrder } = useShop();

  const handleCategoryChange = (event: SelectChangeEvent<number>) => {
    const selectedId = event.target.value as number;
    const selected = categories.find(category => category.id === selectedId) || null;
    setSelectedCategory(selected);
  };

  const handleProductTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductText(event.target.value);
  };

  const handleAddProduct = () => {
    if (selectedCategory) {
      addProduct(productText, selectedCategory.id);
      setProductText('');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: '0 auto', padding: 2 }}>
      <CategorySelect selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />
      <ProductInput productText={productText} onProductTextChange={handleProductTextChange} />
      <Box sx={{ display: 'flex', marginTop: 5, justifyContent: 'space-around' }}>
        <Button variant="contained" color="primary" onClick={handleAddProduct}>
          {ADD}
        </Button>
        <Button variant="contained" color="primary" onClick={finishOrder}>
          {FINISH_ORDER}
        </Button>
        <Button variant="contained" color="primary" onClick={clearOrder}>
          {CLEAR_ORDER}
        </Button>
      </Box>
    </Box>
  );
};

export default AddProductForm;
