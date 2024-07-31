import React, { useEffect } from 'react';
import AddProductForm from './components/AddProductForm';
import CategoryList from './components/CategoryList';
import TotalItems from './components/TotalItems';
import { useAlert } from './context/AlertContext';
import { AlertType } from './types/enums/AlertType.enum';
import { WELCOME_MSG } from './constants/hebrewText';

const App: React.FC = () => {

  const { setAlert } = useAlert();

  useEffect(() => {
    setAlert({
      type: AlertType.INFO,
      message: WELCOME_MSG,
    });
  }, [setAlert]);

  return (
    <>
      <TotalItems />
      <AddProductForm />
      <CategoryList />
    </>
  );
};

export default App;
