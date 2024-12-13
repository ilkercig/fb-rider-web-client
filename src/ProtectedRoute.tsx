import { Navigate, Outlet } from "react-router-dom";
import { checkAuthentication } from "./api/yahooAuthService";
import { CircularProgress, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import logger from "./logger";
import { useEffect } from "react";

const ProtectedRoute: React.FC = () => {
  const {
    data: isAuth,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["checkAuthentication"],
    queryFn: checkAuthentication,
  });

  const redirectToLogin =  isError || !isAuth;

  useEffect(() => {
    logger.warn("ProtectedRoute mounted " + redirectToLogin);
    return () => {
      logger.warn("ProtectedRoute unmounted " + redirectToLogin);
    };
  });

  // While checking authentication, you can render a loading spinner or similar
  if (isLoading) {
    logger.warn("Checking authentication...");
    return (
      <>
        <CircularProgress />
        <Typography variant="h6">Loading...</Typography>
      </>
    );
  }
  if (redirectToLogin) {
    logger.warn("Attempt to redirect to login");
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
