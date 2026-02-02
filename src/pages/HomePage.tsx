import React, { useState, useEffect, useCallback } from 'react'
import {
  Box,
  Typography,
  Button,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  LinearProgress,
  SelectChangeEvent,
} from '@mui/material'
import PostCreateModal from '../components/PostCreateModal'
import PostsGrid from '../components/PostsGrid'
import { useGetPostsQuery, useCreatePostMutation, Post } from '../api/blogApi'
import { useDebounce } from '../hooks/useDebounce'
import { usePostModal } from '../hooks/usePostModal'
import SearchBar from '../components/SearchBar'
import { toast } from 'react-toastify'
import { usePageTitle } from '../hooks/usePageTitle'

export const getErrorMessage = (error: any): string => {
  if (typeof error === 'string') return error
  if (error?.data?.message) return error.data.message
  if (error?.message) return error.message
  return 'Неизвестная ошибка'
}

function HomePage() {
  usePageTitle('Home', 'HomePage')

  const [columns, setColumns] = useState(4)
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')

  const handleChooseColumns = (event: SelectChangeEvent<number>) => {
    setColumns(event.target.value)
  }

  const {
    openModal,
    isCreating,
    createError,
    handleOpenModal,
    handleCloseModal,
    handleCreateSuccess,
    handleCreateError,
    handleCreatePost,
  } = usePostModal()

  const {
    data: posts = [],
    isLoading: loading,
    isError: hasError,
    error,
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

  useEffect(() => {
    if (hasError && error) {
      const errorMessage = getErrorMessage(error)
      toast.error(`Ошибка загрузки постов: ${errorMessage}`)
    }
  }, [hasError, error, toast])

  const handleRetry = () => {
    const toastId = toast.loading('Обновление данных...', {
      autoClose: false,
    })

    refetch()
      .unwrap()
      .then(() => {
        toast.update(toastId, {
          render: 'Данные успешно обновлены!',
          type: 'success',
          isLoading: false,
          autoClose: 3000,
        })
      })
      .catch(error => {
        const errorMessage = getErrorMessage(error)
        toast.update(toastId, {
          render: `Ошибка при обновлении: ${errorMessage}`,
          type: 'error',
          isLoading: false,
          autoClose: 5000,
        })
      })
  }

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          flexWrap: 'wrap',
          gap: 3,
          py: 2,
          px: 3,
        }}
      >
        <SearchBar onSearch={handleSearch} debounceDelay={300} />

        <Button
          variant="contained"
          onClick={handleRetry}
          sx={{ m: 1 }}
          disabled={loading}
        >
          {loading ? 'Обновление...' : 'Обновить'}
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenModal}
          sx={{ m: 1 }}
          disabled={isCreating}
        >
          {isCreating ? 'Создание...' : 'Создать пост'}
        </Button>

        <Select
          labelId="columns-select-label"
          id="columns-select"
          value={columns}
          size="small"
          onChange={handleChooseColumns}
          disabled={loading}
        >
          {[1, 2, 3, 4].map(num => (
            <MenuItem key={num} value={num}>
              колонок: {num}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {loading && <LinearProgress color="primary" sx={{ mb: 2 }} />}

      {!loading && !error && (
        <Box sx={{ ml: 2, mr: 2 }}>
          {posts.length === 0 && searchQuery && (
            <Box
              sx={{
                textAlign: 'center',
                py: 8,
                color: 'text.secondary',
              }}
            >
              <Typography variant="h6" gutterBottom>
                Ничего не найдено
              </Typography>
              <Typography variant="body1">
                По запросу "{searchQuery}" посты не найдены
              </Typography>
            </Box>
          )}

          {posts.length !== 0 && (
            <>
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

              <PostsGrid posts={posts} columns={columns} />
            </>
          )}
        </Box>
      )}

      <PostCreateModal
        open={openModal}
        onClose={handleCloseModal}
        onSuccess={handleCreateSuccess}
        onError={handleCreateError}
        createPost={handleCreatePost}
        isCreating={isCreating}
      />
    </Box>
  )
}

export default HomePage
