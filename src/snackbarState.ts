import { atom } from 'recoil';

export const snackbarState = atom({
  key: 'snackbarState', // Unique key for this atom
  default: {
    message: '', // Snackbar message
    severity: 'info' as 'success' | 'error' | 'warning' | 'info', // Severity type
    open: false, // Snackbar visibility
  },
});
