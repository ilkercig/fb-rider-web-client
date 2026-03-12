'use client'
import { Button } from "@mui/material";
import { constructYahooLoginUrl } from "@/lib/api/authUtils";

export default function YahooLoginButton() {
  const handleClick = () => {
    window.location.href = constructYahooLoginUrl();
  };

  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: "#6001D2",
        color: "#fff",
        textTransform: "none",
        fontSize: "1rem",
        padding: "10px 20px",
        borderRadius: "8px",
        fontWeight: "bold",
        "&:hover": {
          backgroundColor: "#7B1FA2",
        },
      }}
      onClick={handleClick}
    >
      Login with Yahoo
    </Button>
  );
}
