import React from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'
import ThemeToggle from './ThemeToggle'
import { useHeader } from '../context/HeaderContext'

interface HeaderProps {
  title: string
}
const Header: React.FC<HeaderProps> = props => {
  const [headerProps] = useHeader()

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          {headerProps && (
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {headerProps}
            </Typography>
          )}
          <ThemeToggle />
          <Box>
            <Button component={Link} to="/" sx={{ mr: 1, color: 'white' }}>
              Главная
            </Button>

            <Button component={Link} to="/about" sx={{ mr: 1, color: 'white' }}>
              О Проекте
            </Button>

            <Button component={Link} to="/sort" sx={{ color: 'white' }}>
              Сортировка
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  )
}

export default Header
