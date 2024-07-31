import React from 'react';
import { Box, Typography, Divider, Tooltip } from '@mui/material';
import { useShop } from '../context/ShopContext';
import { Category } from '../types/interfaces/category.interface';
import { Product } from '../types/interfaces/product.interface';

const CategoryList: React.FC = () => {
  const { categories } = useShop();

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      {categories
        .filter(category => category.products.length > 0) // Display Only categories with products
        .map(({ id, name, products }: Category) => {
          const productNames = products.map((product: Product) => product.name).join(', ');

          return (
            <Box key={id} sx={{ margin: 2, width: 200 }}>
              <Tooltip title={productNames} arrow>
                <Typography variant="h6">
                  {name} ({products.length})
                </Typography>
              </Tooltip>
              <Divider sx={{ marginTop: 2 }} />
            </Box>
          );
        })}
    </Box>
  );
};

export default CategoryList;
