import { useRecoilState } from 'recoil';
import { Snackbar, Alert } from '@mui/material';
import { snackbarState } from '../snackbarState';

const GlobalSnackbar = () => {
  const [snackbar, setSnackbar] = useRecoilState(snackbarState);

  const handleClose = () => {
    setSnackbar({ ...snackbar, open: false }); // Close the Snackbar
  };

  return (
    <Snackbar 
      open={snackbar.open} 
      autoHideDuration={6000} 
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={snackbar.severity}>
        {snackbar.message}
      </Alert>
    </Snackbar>
  );
};

export default GlobalSnackbar;
