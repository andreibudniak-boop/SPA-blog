import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage.js'
import AboutPage from './pages/AboutPage.js'
import SortPage from './pages/SortPage.jsx'
import PostPage from './pages/PostPage.js'
import Header from './components/Header.js'
import { ThemeProvider } from './theme/ThemeContext.jsx'
import { lightTheme, darkTheme } from './theme/theme.js'
import {
  ThemeProvider as MuiThemeProvider,
  CssBaseline,
  Box,
} from '@mui/material'
import { useTitle } from 'react-use'
import { Provider } from 'react-redux'
import store from './app/store.js'
import { useThemeContext } from './theme/ThemeContext.jsx'
import Footer from './components/Footer.js'
import { HeaderProvider } from './context/HeaderContext.js'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const AppContent = () => {
  const { mode } = useThemeContext()
  const theme = mode === 'light' ? lightTheme : darkTheme

  return (
    <HeaderProvider>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Header title={''} />
            <Box sx={{ overflow: 'auto', height: 'calc(100vh - 64px - 64px)' }}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/sort" element={<SortPage />} />
                <Route path="/posts/:id" element={<PostPage />} />
              </Routes>
            </Box>
            <Footer />
          </Box>
        </Router>
      </MuiThemeProvider>
    </HeaderProvider>
  )
}

function App() {
  useTitle('App')
  return (
    <ThemeProvider>
      <Provider store={store}>
        <AppContent />
      </Provider>
    </ThemeProvider>
  )
}

export default App
