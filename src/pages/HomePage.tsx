import React, { useState, useEffect } from 'react'
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
import { useGetPostsQuery, useCreatePostMutation } from '../api/blogApi'
import { useToast } from '../hooks/useToast'

function HomePage() {
  useTitle('Home')
  const toast = useToast()
  const [, setHeaderProps] = useHeader()

  useEffect(() => {
    setHeaderProps('HomePage')
  }, [setHeaderProps])

  const [columns, setColumns] = useState<number>(4)
  const [openModal, setOpenModal] = useState(false)

  const handleChooseColumns = (event: SelectChangeEvent<number>) => {
    setColumns(event.target.value as number)
  }

  const {
    data: posts = [],
    isLoading: loading,
    isError: hasError,
    error,
    refetch,
  } = useGetPostsQuery()

  const [
    createPostMutation,
    { isLoading: isCreating, error: createError, reset: resetCreateMutation },
  ] = useCreatePostMutation()

  // Обработка ошибки загрузки
  useEffect(() => {
    if (hasError && error) {
      const errorMessage = getErrorMessage(error)
      toast.error(`Ошибка загрузки постов: ${errorMessage}`)
    }
  }, [hasError, error, toast])

  // Обработка ошибки создания
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
          startIcon={loading ? undefined : undefined}
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
      </Box>

      {loading && <LinearProgress color="primary" sx={{ mb: 2 }} />}

      {!loading && !hasError && posts.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h5" color="text.secondary" gutterBottom>
            Нет доступных постов
          </Typography>
          <Button variant="contained" onClick={handleOpenModal} size="large">
            Создать первый пост
          </Button>
        </Box>
      )}

      {!loading && !hasError && posts.length > 0 && (
        <PostsGrid posts={posts} columns={columns} />
      )}

      <PostCreateModal
        open={openModal}
        onClose={handleCloseModal}
        onSuccess={handleCreateSuccess}
        onError={handleCreateError}
        createPost={createPostMutation}
        isCreating={isCreating}
      />
    </Box>
  )
}

export default HomePage
