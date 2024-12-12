import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { useSetRecoilState } from "recoil";
import { snackbarState } from "../snackbarState";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../api/yahooAuthService";
import { errorMessages } from "../constants/ErrorMessages";

function LogoutMenuItem() {
  const setSnackbar = useSetRecoilState(snackbarState);

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      window.location.reload(); // Reload the page after successful logout
    },
    onError: () => {
      setSnackbar({
        message: errorMessages.logout.error,
        severity: "error",
        open: true,
      });
    },
  });

  return (
    <MenuItem onClick={()=> logoutMutation.mutate()}>
      <Typography textAlign="center">Logout</Typography>
    </MenuItem>
  );
}

export default LogoutMenuItem;
