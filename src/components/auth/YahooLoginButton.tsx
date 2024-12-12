import { Button } from "@mui/material";
import { constructYahooLoginUrl } from "../../api/authUtils";

export default function YahooLoginButton() {
  const handleClick = () => {
    window.location.href = constructYahooLoginUrl();
  };

  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: "#6001D2", // Yahoo's primary purple
        color: "#fff", // White text for contrast
        textTransform: "none", // Keep text capitalization normal
        fontSize: "1rem", // Adjust font size for readability
        padding: "10px 20px", // Padding for a good button size
        borderRadius: "8px", // Slightly rounded corners
        fontWeight: "bold", // Add emphasis to text
        "&:hover": {
          backgroundColor: "#7B1FA2", // Slightly lighter purple for hover effect
        },
      }}
      onClick={handleClick} // Use the onClick handler for redirect
    >
      Login with Yahoo
    </Button>
  );
}
