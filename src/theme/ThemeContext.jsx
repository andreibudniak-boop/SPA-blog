import React, {
  createContext,
  useState,
  useContext,
  useMemo,
  useEffect,
} from 'react'

const ThemeContext = createContext()

export const useThemeContext = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useThemeContext must be used within ThemeProvider')
  }
  return context
}

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    const saved = localStorage.getItem('theme-mode')
    return saved || 'light'
  })

  useEffect(() => {
    localStorage.setItem('theme-mode', mode)
  }, [mode])

  const toggleTheme = () => {
    setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'))
  }

  const value = useMemo(
    () => ({
      mode,
      toggleTheme,
    }),
    [mode]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
