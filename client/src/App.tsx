import React, { useEffect } from 'react';
import AddProductForm from './components/AddProductForm';
import CategoryList from './components/CategoryList';
import TotalItems from './components/TotalItems';
import { useAlert } from './context/AlertContext';
import { AlertType } from './types/enums/AlertType.enum';

const App: React.FC = () => {

  const { setAlert } = useAlert();

  useEffect(() => {
    setAlert({
      type: AlertType.INFO,
      message: 'ברוכים הבאים לאתר רשימת הקניות שלכם! קניה נעימה',
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
