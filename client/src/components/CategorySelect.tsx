import React from 'react';
import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';

import { useShop } from '../context/ShopContext';

import { CATEGORY } from '../constants/hebrewText';
import { Category } from '../types/interfaces/category.interface';

interface CategorySelectProps {
  selectedCategory: Category | null;
  onCategoryChange: (event: SelectChangeEvent<number>) => void;
}

const CategorySelect: React.FC<CategorySelectProps> = ({ selectedCategory, onCategoryChange }) => {
  const { categories } = useShop();

  return (
    <FormControl fullWidth margin="normal">
      <InputLabel id="category-select-label">{CATEGORY}</InputLabel>
      <Select
        labelId="category-select-label"
        id="category-select"
        value={selectedCategory ? selectedCategory.id : ''}
        onChange={onCategoryChange}
        label={CATEGORY}
      >
        {categories.map((category) => (
          <MenuItem key={category.id} value={category.id}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CategorySelect;
