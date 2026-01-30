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
import { useTitle } from 'react-use'
import { useHeader } from '../context/HeaderContext'
import PostCreateModal from '../components/PostCreateModal'
import PostsGrid from '../components/PostsGrid'
import { useGetPostsQuery, useCreatePostMutation, Post } from '../api/blogApi'
import { useToast } from '../hooks/useToast'
import { useDebounce } from '../hooks/useDebounce'
import SearchBar from '../components/SearchBar'

function HomePage() {
  useTitle('Home')
  const toast = useToast()
  const [, setHeaderProps] = useHeader()

  useEffect(() => {
    setHeaderProps('HomePage')
  }, [setHeaderProps])

  const [columns, setColumns] = useState<number>(4)
  const [openModal, setOpenModal] = useState(false)

  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')

  const handleChooseColumns = (event: SelectChangeEvent<number>) => {
    setColumns(event.target.value as number)
  }

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

  const [
    createPostMutation,
    { isLoading: isCreating, error: createError, reset: resetCreateMutation },
  ] = useCreatePostMutation()

  useEffect(() => {
    if (hasError && error) {
      const errorMessage = getErrorMessage(error)
      toast.error(`Ошибка загрузки постов: ${errorMessage}`)
    }
  }, [hasError, error, toast])

  useEffect(() => {
    if (createError) {
      const errorMessage = getErrorMessage(createError)
      toast.error(`Ошибка создания поста: ${errorMessage}`)
      resetCreateMutation()
    }
  }, [createError, resetCreateMutation, toast])

  const getErrorMessage = (error: any): string => {
    if (typeof error === 'string') return error
    if (error?.data?.message) return error.data.message
    if (error?.message) return error.message
    return 'Неизвестная ошибка'
  }

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

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
    resetCreateMutation()
  }

  const handleCreateSuccess = () => {
    toast.success('Пост успешно создан!')
    setOpenModal(false)
  }

  const handleCreateError = (error: any) => {
    const errorMessage = getErrorMessage(error)
    toast.error(`Ошибка при создании поста: ${errorMessage}`)
    setOpenModal(false)
  }

  const handleCreatePost = async (postData: Omit<Post, 'id'>) => {
    try {
      const result = await createPostMutation(postData).unwrap()
      return result
    } catch (error) {
      throw error
    }
  }

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          py: 2,
        }}
      >
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

        <FormControl sx={{ minWidth: 200, m: 1 }}>
          <InputLabel id="columns-select-label">Колонок</InputLabel>
          <Select
            labelId="columns-select-label"
            id="columns-select"
            value={columns}
            label="Колонок"
            onChange={handleChooseColumns}
            disabled={loading}
          >
            {[1, 2, 3, 4].map(num => (
              <MenuItem key={num} value={num}>
                {num} колонк{num == 1 ? 'а' : 'и'}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <SearchBar onSearch={handleSearch} debounceDelay={300} />
      </Box>

      {loading && <LinearProgress color="primary" sx={{ mb: 2 }} />}

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

              {<PostsGrid posts={posts} columns={columns} />}
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
