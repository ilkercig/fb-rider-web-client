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

  useEffect(() => {
    logger.warn("ProtectedRoute mounted");
    return () => {
      logger.warn("ProtectedRoute unmounted");
    };
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
    logger.error("Attempt to redirect to login");
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
