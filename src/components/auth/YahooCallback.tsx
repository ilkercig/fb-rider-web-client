'use client'
import { CircularProgress, Typography } from "@mui/material";
import ErrorPage from "../ErrorPage";
import useYahooAuthCallback from "@/lib/hooks/useAuthCallback";

const YahooCallback = () => {
  const { loading, error } = useYahooAuthCallback();

  if (loading) {
    return (
      <div>
        <CircularProgress />
        <Typography variant="h6">Logging you in...</Typography>
      </div>
    );
  }
  if (error) {
    return <ErrorPage errorMessage={error} />;
  }
  return <div aria-hidden="true" style={{ display: "none" }} />;
};

export default YahooCallback;
