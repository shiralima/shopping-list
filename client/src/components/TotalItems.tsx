import React from 'react';
import { Box, Typography } from '@mui/material';
import { useShop } from '../context/ShopContext';
import { TOTAL_ITEMS } from '../constants/hebrewText';

const TotalItems: React.FC = () => {
  const { categories } = useShop();

  let totalItemsCounter = 0;

  categories.forEach(({ products }) => {
    totalItemsCounter += products.length
  });

  return (
    <Box sx={{ marginBottom: 2 }}>
      <Typography variant="h6">{TOTAL_ITEMS}: {totalItemsCounter}</Typography>
    </Box>
  );
};

export default TotalItems;
