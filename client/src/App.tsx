import React from 'react';
import { Box } from '@mui/material';
import { ShopProvider } from './context/ShopContext';
import AddProductForm from './components/AddProductForm';
import CategoryList from './components/CategoryList';
import TotalItems from './components/TotalItems';

const App: React.FC = () => {
  return (
    <ShopProvider>
      <Box sx={{ padding: 2 }}>
        <TotalItems />
        <AddProductForm />
        <CategoryList />
      </Box>
    </ShopProvider>
  );
};

export default App;
