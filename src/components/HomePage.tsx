import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Route, Routes, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";

import { useQuery } from "@tanstack/react-query";
import { fetchUserData } from "../api/yahooAuthService";
import UserProfileMenu from "./UserProfileMenu";
import { useEffect } from "react";
import setupAxiosInterceptors from "../api/setupAxiosInterceptors";
export default function HomePage() {
  const navigate = useNavigate();
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUserData,
  });

  useEffect(() => {
    // Define the redirect function
    const redirectToLogin = () => navigate("/login");

    // Setup interceptors with the navigation function
    setupAxiosInterceptors(redirectToLogin);
  }, [navigate]);

  return (
    <Box sx={{ display: "flex", backgroundColor: "linear-gradient(135deg, #3498db, #8e44ad)" }}>
      <CssBaseline />
      <AppBar
        position="fixed"

      >
        <Toolbar>
          <Typography
            onClick={() => navigate("/")}
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, cursor: "pointer" }}
          >
            DehDeh Premium
          </Typography>
          {user && (
            <UserProfileMenu
              userName={user.name}
              imageUrl={user.profile_images.image64}
            />
          )}
        </Toolbar>
      </AppBar>

      {/* Spacer for AppBar */}
      <Toolbar />

      <Box component="main" sx={{ flexGrow: 1, pt: 10 }}>
        <Routes>
          <Route path="/*" element={<div />} />
        </Routes>
      </Box>
    </Box>
  );
}
