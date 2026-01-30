import React, { ChangeEvent, useState, useEffect } from 'react'
import {
  TextField,
  Button,
  Toolbar,
  IconButton,
  InputAdornment,
  Box,
} from '@mui/material'
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material'
import { useDebounce } from '../hooks/useDebounce'

interface SearchBarProps {
  onSearch: (query: string) => void
  debounceDelay?: number
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  debounceDelay = 300,
}) => {
  const [query, setQuery] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const debouncedSearch = useDebounce(onSearch, debounceDelay)

  const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value
    setQuery(value)
    setIsTyping(true)
    debouncedSearch(value)
  }

  const handleClean = (): void => {
    setQuery('')
    setIsTyping(false)
    onSearch('')
  }

  useEffect(() => {
    if (isTyping) {
      const timer = setTimeout(() => setIsTyping(false), debounceDelay)
      return () => clearTimeout(timer)
    }
  }, [isTyping, debounceDelay])

  return (
    <Toolbar sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
      <Box sx={{ position: 'relative', width: '100%', maxWidth: 600 }}>
        <TextField
          fullWidth
          id="outlined-basic"
          label="Поиск по заголовку"
          variant="outlined"
          value={query}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color={isTyping ? 'primary' : 'action'} />
              </InputAdornment>
            ),
            endAdornment: query && (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClean}
                  size="small"
                  edge="end"
                  aria-label="очистить поиск"
                >
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          placeholder="Введите название поста..."
          sx={{
            '& .MuiOutlinedInput-root': {
              pr: query ? 1 : undefined,
            },
          }}
        />

        {isTyping && (
          <Box
            sx={{
              position: 'absolute',
              bottom: -20,
              right: 0,
              fontSize: '0.75rem',
              color: 'text.secondary',
              fontStyle: 'italic',
            }}
          >
            Поиск...
          </Box>
        )}
      </Box>
    </Toolbar>
  )
}

export default SearchBar
