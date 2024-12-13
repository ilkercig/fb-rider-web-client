import { Navigate, Outlet } from "react-router-dom";
import { checkAuthentication } from "./api/yahooAuthService";
import { CircularProgress, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

const ProtectedRoute: React.FC = () => {
  const {
    data: isAuth,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["checkAuthentication"],
    queryFn: checkAuthentication,
  });

  // While checking authentication, you can render a loading spinner or similar
  if (isLoading) {
    return (
      <>
        <CircularProgress />
        <Typography variant="h6">Loading...</Typography>
      </>
    );
  }
  if (isError || !isAuth) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
