import React from 'react'
import { IconButton, Tooltip } from '@mui/material'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { useThemeContext } from '../theme/ThemeContext'

const ThemeToggle: React.FC = () => {
  const { mode, toggleTheme } = useThemeContext()

  return (
    <Tooltip title={`${mode === 'light' ? 'Тёмная' : 'Светлая'} тема`}>
      <IconButton
        onClick={toggleTheme}
        color="inherit"
        aria-label="переключить тему"
      >
        {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
      </IconButton>
    </Tooltip>
  )
}

export default ThemeToggle
