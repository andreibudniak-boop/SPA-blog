import SearchBar from '../components/SearchBar'
import { useState, useEffect, useCallback, useRef } from 'react'
import PostCard from '../components/PostCard'
import { useTitle } from 'react-use'
import {
  Toolbar,
  Box,
  LinearProgress,
  Alert,
  Button,
  Typography,
  CircularProgress,
} from '@mui/material'
import { useHeader } from '../context/HeaderContext'
import { useGetPostsQuery } from '../api/blogApi'
import { useDebounce } from '../hooks/useDebounce'

function SortPage() {
  useTitle('Сортировка и поиск')
  const [, setHeaderProps] = useHeader()

  useEffect(() => {
    setHeaderProps('SortPage')
  }, [setHeaderProps])

  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')

  const {
    data: posts = [],
    isLoading: loading,
    isError: error,
    isFetching: fetching,
    refetch,
  } = useGetPostsQuery(
    debouncedSearchQuery.trim()
      ? { title_like: debouncedSearchQuery }
      : undefined
  )

  const debouncedSetSearch = useDebounce((query: string) => {
    setDebouncedSearchQuery(query)
  }, 300)

  const handleSearch = useCallback(
    (query: string) => {
      setSearchQuery(query)
      debouncedSetSearch(query)
    },
    [debouncedSetSearch]
  )

  const handleRetry = useCallback(() => {
    refetch()
  }, [refetch])

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Toolbar />

      <SearchBar onSearch={handleSearch} debounceDelay={300} />

      <Toolbar />

      {loading && <LinearProgress color="primary" />}

      {fetching && !loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
          <CircularProgress size={24} />
        </Box>
      )}

      {error && (
        <Box sx={{ p: 3 }}>
          <Alert
            severity="error"
            action={
              <Button color="inherit" size="small" onClick={handleRetry}>
                Повторить
              </Button>
            }
          >
            Ошибка при загрузке постов
          </Alert>
        </Box>
      )}

      {!loading && !error && (
        <Box sx={{ ml: 2, mr: 2 }}>
          {posts.length === 0 ? (
            <Box
              sx={{
                textAlign: 'center',
                py: 8,
                color: 'text.secondary',
              }}
            >
              {searchQuery ? (
                <>
                  <Typography variant="h6" gutterBottom>
                    Ничего не найдено
                  </Typography>
                  <Typography variant="body1">
                    По запросу "{searchQuery}" посты не найдены
                  </Typography>
                </>
              ) : (
                <Typography variant="h6">Пока нет постов</Typography>
              )}
            </Box>
          ) : (
            <>
              {searchQuery && (
                <Typography
                  variant="subtitle1"
                  sx={{
                    mb: 2,
                    color: 'text.secondary',
                    fontStyle: 'italic',
                  }}
                >
                  {fetching
                    ? `Ищем по запросу "${searchQuery}"...`
                    : `Найдено постов: ${posts.length}${debouncedSearchQuery !== searchQuery ? ' (идет поиск...)' : ''}`}
                </Typography>
              )}

              {posts.map(post => (
                <Box key={post.id} sx={{ mb: 3 }}>
                  <PostCard post={post} />
                </Box>
              ))}
            </>
          )}
        </Box>
      )}
    </Box>
  )
}

export default SortPage
