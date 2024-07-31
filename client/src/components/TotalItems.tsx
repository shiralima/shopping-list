import React from 'react';
import { Box, Typography } from '@mui/material';
import { useShop } from '../context/ShopContext';
import { TOTAL, ITEMS } from '../constants/hebrewText';

const TotalItems: React.FC = () => {
  const { categories } = useShop();

  let totalItemsCounter = 0;

  categories.forEach(({ products }) => {
    products.forEach(({ quantity }) => {
      totalItemsCounter += quantity || 1
    })
  });

  return (
    <Box sx={{ marginBottom: 2 }}>
      <Typography variant="h6">{TOTAL}: {totalItemsCounter} {ITEMS}</Typography>
    </Box>
  );
};

export default TotalItems;
