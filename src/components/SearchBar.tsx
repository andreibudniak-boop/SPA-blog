import React, { ChangeEvent, useState, useEffect, useRef } from 'react'
import {
  TextField,
  Toolbar,
  IconButton,
  InputAdornment,
  Box,
} from '@mui/material'
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material'

interface SearchBarProps {
  onSearch: (query: string) => void
  debounceDelay: number
}

type Timer = ReturnType<typeof setTimeout>

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, debounceDelay }) => {
  const [query, setQuery] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const typingTimerRef = useRef<Timer | null>(null)

  const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value
    setQuery(value)
    setIsTyping(true)

    if (typingTimerRef.current) {
      clearTimeout(typingTimerRef.current)
    }

    typingTimerRef.current = setTimeout(() => {
      setIsTyping(false)
    }, debounceDelay)

    onSearch(value)
  }

  const handleClean = (): void => {
    setQuery('')
    setIsTyping(false)
    if (typingTimerRef.current) {
      clearTimeout(typingTimerRef.current)
    }
    onSearch('')
  }

  useEffect(() => {
    return () => {
      if (typingTimerRef.current) {
        clearTimeout(typingTimerRef.current)
      }
    }
  }, [])

  return (
    <Toolbar disableGutters sx={{ mr: 'auto', pl: 0, px: 0 }}>
      <Box sx={{ position: 'relative', width: '100%', maxWidth: 600, pl: 0 }}>
        <TextField
          fullWidth
          id="outlined-basic"
          variant="outlined"
          size="small"
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
