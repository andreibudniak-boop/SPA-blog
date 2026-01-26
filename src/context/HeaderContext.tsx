import React, { createContext, useContext, useState } from 'react'

type HeaderContextType = [string, (value: string) => void]

const HeaderContext = createContext<HeaderContextType | undefined>(undefined)

interface HeaderProviderProps {
  children: React.ReactNode
}

export const HeaderProvider: React.FC<HeaderProviderProps> = ({ children }) => {
  const [headerProps, setHeaderProps] = useState<string>('Logo')

  return (
    <HeaderContext.Provider value={[headerProps, setHeaderProps]}>
      {children}
    </HeaderContext.Provider>
  )
}

export const useHeader = (): HeaderContextType => {
  const context = useContext(HeaderContext)
  if (context === undefined) {
    throw new Error('useHeader must be used within a HeaderProvider')
  }
  return context
}
