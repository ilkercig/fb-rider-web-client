'use client'
import { Snackbar, Alert } from '@mui/material'
import { useSnackbar } from '@/lib/snackbarContext'

const GlobalSnackbar = () => {
  const { snackbar, setSnackbar } = useSnackbar()

  const handleClose = () => {
    setSnackbar({ ...snackbar, open: false })
  }

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
  )
}

export default GlobalSnackbar
