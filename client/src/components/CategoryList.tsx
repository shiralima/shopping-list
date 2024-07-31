import React from 'react';
import { Box, Typography, Divider, Grid } from '@mui/material';

// icons
import CakeIcon from '@mui/icons-material/Cake';
import AppleIcon from '@mui/icons-material/Apple';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import CleanHandsIcon from '@mui/icons-material/CleanHands';
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { useShop } from '../context/ShopContext';

import { NO_ITEMS_YET } from '../constants/hebrewText';
import { Category } from '../types/interfaces/category.interface';
import { CategoryType } from '../types/enums/CategoryType.enum';

const CategoryList: React.FC = () => {
  const { categories } = useShop();

  const isAllCategoriesEmpty = categories.every(category => category.products.length === 0);

  const categoryIcons: { [key in CategoryType]: React.ReactNode } = {
    [CategoryType.FRUITS_AND_VEGETABLE]: <AppleIcon sx={{ fontSize: 30 }} />,
    [CategoryType.CLEANING_PRODUCTS]: <CleanHandsIcon sx={{ fontSize: 30 }} />,
    [CategoryType.PASTRIES]: <CakeIcon sx={{ fontSize: 30 }} />,
    [CategoryType.MEAT_AND_FISH]: <RestaurantIcon sx={{ fontSize: 30 }} />,
    [CategoryType.CHEESES]: <LocalPizzaIcon sx={{ fontSize: 30 }} />,
  };

  return (
    <Box sx={{ padding: 2, direction: 'rtl' }}>
      {isAllCategoriesEmpty ? (
        <Box sx={{ textAlign: 'center', padding: 2 }}>
          <ShoppingCartIcon sx={{ fontSize: 40, color: 'primary.main' }} />
          <Typography variant="h6" sx={{ marginTop: 1 }}>
            {NO_ITEMS_YET}
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {categories
            .filter(category => category.products.length > 0)
            .map(({ id, name, products }: Category) => {
              const productNames = products.map(({ name, quantity }) => `${name} (${quantity || 1})`).join(', ');

              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={id}>
                  <Box sx={{ padding: 2, border: '1px solid #ddd', borderRadius: 2 }}>
                    <Typography variant="h6" sx={{ textAlign: 'right', display: 'flex', alignItems: 'center' }}>
                      {categoryIcons[name as CategoryType]}
                      {name} ({products.length})
                    </Typography>
                    <Typography variant="body2" sx={{ textAlign: 'right', marginTop: 1, color: 'text.secondary' }}>
                      {productNames}
                    </Typography>
                    <Divider sx={{ marginTop: 2, backgroundColor: 'primary.main' }} />
                  </Box>
                </Grid>
              );
            })}
        </Grid>
      )}
    </Box>
  );
};

export default CategoryList;
