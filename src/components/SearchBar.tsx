import React, { ChangeEvent, useState } from 'react'
import { TextField, Button, Toolbar } from '@mui/material'

interface SearchBarProps {
  onSearch: (query: string) => void
}
const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('')

  const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value
    setQuery(value)
    onSearch(value)
  }

  const handleClean = (): void => {
    setQuery('')
    onSearch('')
  }

  return (
    <Toolbar sx={{ display: 'flex', justifyContent: 'center' }}>
      <TextField
        id="outlined-basic"
        label="Поиск по заголовку"
        variant="outlined"
        value={query}
        onChange={handleSearch}
        sx={{ margin: 2 }}
      />
      {query && (
        <Button onClick={handleClean} variant="outlined">
          clean
        </Button>
      )}
    </Toolbar>
  )
}

export default SearchBar
