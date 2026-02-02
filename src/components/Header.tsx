import React from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'
import ThemeToggle from './ThemeToggle'
import { useHeader } from '../context/HeaderContext'
import { Nav } from './Nav'

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

          <Nav />
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  )
}

export default Header
