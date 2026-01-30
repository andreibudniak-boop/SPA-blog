import React, {
  createContext,
  useState,
  useContext,
  useMemo,
  useEffect,
  ReactNode,
} from 'react'

type ThemeMode = 'light' | 'dark'
type ThemeContextType = {
  mode: ThemeMode
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useThemeContext = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useThemeContext must be used within ThemeProvider')
  }
  return context
}

interface ThemeProviderProps {
  children: ReactNode
}
const getSystemTheme = (): ThemeMode => {
  if (typeof window === 'undefined') return 'light'

  if (
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    return 'dark'
  }

  return 'light'
}

const getInitialTheme = (): ThemeMode => {
  if (typeof window === 'undefined') return 'light'

  const saved = localStorage.getItem('theme-mode') as ThemeMode | null

  if (saved && (saved === 'light' || saved === 'dark')) {
    return saved
  }

  return getSystemTheme()
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>(() => {
    return getInitialTheme()
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
