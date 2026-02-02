import { useHeader } from '../context/HeaderContext'
import { useEffect } from 'react'
import { useTitle } from 'react-use'

export const usePageTitle = (title: string, headerTitle = ' ') => {
  useTitle(title)
  const [, setHeaderProps] = useHeader()

  useEffect(() => {
    setHeaderProps(headerTitle)
  }, [setHeaderProps])
}
