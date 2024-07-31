import React from 'react';
import { Snackbar, Alert as MuiAlert } from '@mui/material';
import { Alert } from '../types/types/Alert.type';

interface AlertComponentProps {
    alert: Alert;
    onClose: () => void;
}

const AlertComponent: React.FC<AlertComponentProps> = ({ alert, onClose }) => {
    return (
        <Snackbar
            open={Boolean(alert)}
            autoHideDuration={3000}
            onClose={onClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            sx={{
                '& .MuiSnackbar-root': {
                    top: '20px',
                }
            }}
        >
            <MuiAlert
                onClose={onClose}
                severity={alert?.type}
                sx={{
                    width: '100%',
                    maxWidth: '600px',
                    backgroundColor: 'blue',
                    color: 'white',
                    fontSize: '1.5rem',
                }}
            >
                {alert?.message}
            </MuiAlert>
        </Snackbar>
    );
};

export default AlertComponent;
