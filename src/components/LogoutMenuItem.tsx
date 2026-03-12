'use client'
import MenuItem from "@mui/material/MenuItem"
import Typography from "@mui/material/Typography"
import { useSetSnackbar } from "@/lib/snackbarContext"
import { useMutation } from "@tanstack/react-query"
import { logout } from "@/lib/api/yahooAuthService"
import { errorMessages } from "@/lib/constants/ErrorMessages"

function LogoutMenuItem() {
  const setSnackbar = useSetSnackbar()

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      window.location.reload()
    },
    onError: () => {
      setSnackbar({
        message: errorMessages.logout.error,
        severity: "error",
        open: true,
      })
    },
  })

  return (
    <MenuItem onClick={() => logoutMutation.mutate()}>
      <Typography textAlign="center">Logout</Typography>
    </MenuItem>
  )
}

export default LogoutMenuItem
