import { useNavigate } from "react-router-dom";
import { checkAuthentication } from "./api/yahooAuthService";
import { CircularProgress, Typography } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import logger from "./logger";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const result = await checkAuthentication();
        setIsAuth(result);
      } catch {
        setIsAuth(false);
      }
      setIsLoading(false);
    }

    checkAuth();

    logger.warn("component did mount");

    if (!isLoading && isAuth === false) {
      logger.warn("Loading...");
      navigate("/login");

      return;
    }
  }, [isAuth, isLoading, navigate]);

  // While checking authentication, you can render a loading spinner or similar
  if (isLoading) {
    return (
      <>
        <CircularProgress />
        <Typography variant="h6">Loading...</Typography>
      </>
    );
  }

  if (isAuth === true) {
    return <>{children}</>;
  }

  return null;
};

export default ProtectedRoute;
