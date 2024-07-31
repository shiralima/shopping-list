import React, { useState } from 'react';
import { Button, Box, SelectChangeEvent } from '@mui/material';
import { useShop } from '../context/ShopContext';
import CategorySelect from './CategorySelect';
import ProductInput from './ProductInput';
import { ADD } from '../constants/hebrewText';
import { Category } from '../types/interfaces/category.interface';

const AddProductForm: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [productText, setProductText] = useState<string>('');
  const { addProduct, categories } = useShop();

  const handleCategoryChange = (event: SelectChangeEvent<number>) => {
    const selectedId = event.target.value as number;
    const selected = categories.find(category => category.id === selectedId) || null;
    setSelectedCategory(selected);
  };

  const handleProductTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductText(event.target.value);
  };

  const handleAddProduct = async () => {
    if (selectedCategory) {
      await addProduct(productText, selectedCategory.id);
      setProductText(''); // Clear the input field after adding the product
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: '0 auto', padding: 2 }}>
      <CategorySelect selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />
      <ProductInput productText={productText} onProductTextChange={handleProductTextChange} />
      <Button variant="contained" color="primary" onClick={handleAddProduct} sx={{ marginTop: 2 }}>
        {ADD}
      </Button>
    </Box>
  );
};

export default AddProductForm;
