import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface ErrorPageProps {
  errorMessage: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ errorMessage }) => {
  const navigate = useNavigate();
  return (
    <Container
      maxWidth="sm"
      sx={{
        textAlign: "center",
        mt: 10,
        p: 4,
        borderRadius: 2,
        boxShadow: 3,
        bgcolor: "background.paper",
      }}
    >
      {/* Mascot Placeholder */}
      <Box
        component="img"
        src="brick.webp"
        alt="Mascot"
        sx={{ width: "100%", mb: 3 }}
      />

      {/* Error Message */}
      <Typography variant="h4" color="error" gutterBottom>
        Oops! Something went wrong.
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        {errorMessage}
      </Typography>

      {/* Home Page Redirect Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={()=>navigate("/")}
        sx={{ textTransform: "none", fontSize: "1rem" }}
      >
        Go to Home Page
      </Button>
    </Container>
  );
};

export default ErrorPage;
