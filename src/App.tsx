import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import YahooCallback from "./components/auth/YahooCallback";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProtectedRoute from "./ProtectedRoute";
import HomePage from "./components/HomePage";
import GlobalSnackbar from "./components/GlobalSnackbar";
function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route path="/callback" element={<YahooCallback />} />

          <Route element={<ProtectedRoute />}>
            <Route path="*" element={<HomePage />} />
          </Route>
        </Routes>
        <GlobalSnackbar />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
