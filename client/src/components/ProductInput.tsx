import React from 'react';
import { TextField } from '@mui/material';

import { PRODUCT_TEXT } from '../constants/hebrewText';

interface ProductInputProps {
  productText: string;
  onProductTextChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProductInput: React.FC<ProductInputProps> = ({ productText, onProductTextChange }) => {
  return (
    <TextField
      label={PRODUCT_TEXT}
      value={productText}
      onChange={onProductTextChange}
      fullWidth
      margin="normal"
    />
  );
};

export default ProductInput;
