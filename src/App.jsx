import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import SortPage from "./pages/SortPage.jsx";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme/theme.js";
import { PostsProvider } from "./context/PostContext.jsx";

function App() {
  return (
    <PostsProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/sort" element={<SortPage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </PostsProvider>
  );
}

export default App;
