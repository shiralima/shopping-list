import React, { createContext, useState, useContext, ReactNode, Dispatch, SetStateAction } from 'react';

import { Alert } from '../types/types/Alert.type';

import AlertComponent from '../components/AlertComponent';

interface AlertContextType {
    setAlert: Dispatch<SetStateAction<Alert | null>>;
}

interface AlertProviderProps {
    children: ReactNode;
}

const AlertContext = createContext<AlertContextType | null>(null);

export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
    const [alert, setAlert] = useState<Alert | null>(null);

    const handleClose = () => setAlert(null);

    return (
        <AlertContext.Provider value={{ setAlert }}>
            {children}
            {alert && <AlertComponent alert={alert} onClose={handleClose} />}
        </AlertContext.Provider>
    );
};

export const useAlert = () => useContext(AlertContext)!;

