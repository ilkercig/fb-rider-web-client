import { useNavigate } from "react-router-dom";
import { checkAuthentication } from "./api/yahooAuthService";
import { CircularProgress, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { ReactNode, useEffect } from "react";
import logger from "./logger";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const {
    data: isAuth,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["checkAuthentication"],
    queryFn: checkAuthentication,
  });

  useEffect(() => {
    logger.warn("component did mount");

    if (isLoading) {
      logger.warn("Loading...");
      return;
    }

    if (isAuth === false) {
      logger.warn("Redirecting to login page");
      navigate("/login");
    }
    if (isError) {
      logger.warn("Error occured");
      logger.warn("Redirecting to login page");
      navigate("/login");
    }
    return () => {
      logger.warn("component will unmount");
    };
  }, [isAuth, isError, isLoading, navigate]);

  // While checking authentication, you can render a loading spinner or similar
  if (isLoading) {
    return (
      <>
        <CircularProgress />
        <Typography variant="h6">Loading...</Typography>
      </>
    );
  }
  if (isError) {
    return (
      <Typography variant="h6">
        An error occurred while checking authentication
      </Typography>
    );
  }

  if (isAuth === true) {
    return <>{children}</>;
  }

  return null;
};

export default ProtectedRoute;
