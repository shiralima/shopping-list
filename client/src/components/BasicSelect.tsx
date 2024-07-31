import React, { useState, useEffect } from 'react';
import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent, TextField, Button, Typography, Box } from '@mui/material';

interface Category {
  id: number;
  name: string;
}

const BasicSelect: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [productText, setProductText] = useState<string>('');

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/categories');
        if (!res.ok) {
          throw new Error(`Status: ${res.status}`);
        }
        const data: Category[] = await res.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Handle category change
  const handleCategoryChange = (event: SelectChangeEvent<number>) => {
    const selectedId = event.target.value as number;
    const selected = categories.find(category => category.id === selectedId) || null;
    setSelectedCategory(selected);
  };

  // Handle product text change
  const handleProductTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductText(event.target.value);
  };

  // Handle add product
  const handleAddProduct = async () => {
    if (!productText || !selectedCategory) {
      alert('Please enter product text and select a category.'); 
      return;
    }

    try {
      const res = await fetch('/api/products', { //todo - check best Rest practice 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: productText,
          categoryId: selectedCategory.id,
        }),
      });

      if (!res.ok) {
        throw new Error(`Status: ${res.status}`);
      }

      setProductText('');
      setSelectedCategory(null);
      alert('Product added successfully.');
      
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: '0 auto', padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Shopping List
      </Typography>
      
      <FormControl fullWidth margin="normal">
        <InputLabel id="basic-select-label">Category</InputLabel>
        <Select
          labelId="basic-select-label"
          id="basic-select"
          value={selectedCategory ? selectedCategory.id : ''}
          onChange={handleCategoryChange}
          label="Category"
        >
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Product Text"
        value={productText}
        onChange={handleProductTextChange}
        fullWidth
        margin="normal"
      />

      <Button variant="contained" color="primary" onClick={handleAddProduct} sx={{ marginTop: 2 }}>
        Add
      </Button>
    </Box>
  );
};

export default BasicSelect;
