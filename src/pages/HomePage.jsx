import PostCard from '../components/PostCard.jsx'
import {
  Box,
  Typography,
  Button,
  Alert,
  Snackbar,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  LinearProgress,
} from '@mui/material'
import { useTitle } from 'react-use'
import { useState, useEffect } from 'react'
import { useHeader } from '../context/HeaderContext.tsx'
import PostCreateModal from '../components/PostCreateModal.jsx'

import { useGetPostsQuery, useCreatePostMutation } from '../api/blogApi'

function HomePage() {
  useTitle('Home')
  const [, setHeaderProps] = useHeader()

  useEffect(() => {
    setHeaderProps('HomePage')
  }, [setHeaderProps])

  const [columns, setColumns] = useState(4)

  const handleChoose = event => {
    setColumns(event.target.value)
  }

  const {
    data: posts = [],
    isLoading: loading,
    isError: hasError,
    error,
    refetch,
  } = useGetPostsQuery(undefined)

  const [
    createPostMutation,
    { isLoading: isCreating, error: createError, reset: resetCreateMutation },
  ] = useCreatePostMutation()

  const handleRetry = () => {
    refetch()
  }

  const [openModal, setOpenModal] = useState(false)

  const [alert, setAlert] = useState({
    open: false,
    message: '',
    severity: 'success',
  })

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false })
    if (createError) {
      resetCreateMutation()
    }
  }

  const handleCreateSuccess = () => {
    setAlert({
      open: true,
      message: 'Пост успешно создан!',
      severity: 'success',
    })
    setOpenModal(false)
  }

  const handleCreateError = errorMessage => {
    setAlert({
      open: true,
      message: `Ошибка при создании: ${errorMessage}`,
      severity: 'error',
    })
    setOpenModal(false)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
    resetCreateMutation()
  }

  return (
    <Box>
      <PostCreateModal
        open={openModal}
        onClose={handleCloseModal}
        onSuccess={handleCreateSuccess}
        onError={handleCreateError}
        createPost={createPostMutation}
        isCreating={isCreating}
      />

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        <Button
          variant="contained"
          onClick={handleRetry}
          sx={{ m: 2 }}
          disabled={loading}
        >
          {loading ? 'Обновление...' : 'Обновить'}
        </Button>
        <Button
          variant="contained"
          onClick={() => setOpenModal(true)}
          sx={{ m: 2 }}
          disabled={isCreating}
        >
          {isCreating ? 'Создание...' : 'Создать пост'}
        </Button>
        <FormControl sx={{ width: 200, m: 2 }}>
          <InputLabel id="columns-select-label">Показать по</InputLabel>
          <Select
            labelId="columns-select-label"
            id="columns-select"
            value={columns}
            label="Показать по"
            onChange={handleChoose}
            disabled={loading}
          >
            <MenuItem value={1}>1 колонка</MenuItem>
            <MenuItem value={2}>2 колонки</MenuItem>
            <MenuItem value={3}>3 колонки</MenuItem>
            <MenuItem value={4}>4 колонки</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={alert.severity}
          sx={{ width: '100%' }}
        >
          {alert.message}
        </Alert>
      </Snackbar>

      {loading && <LinearProgress color="primary" />}

      {hasError && !loading && (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Alert
            severity="error"
            sx={{ mb: 2 }}
            action={
              <Button color="inherit" size="small" onClick={handleRetry}>
                Повторить
              </Button>
            }
          >
            Ошибка при загрузке постов: {error?.message || 'Неизвестная ошибка'}
          </Alert>
        </Box>
      )}

      {!loading && !hasError && posts.length === 0 && (
        <Typography
          variant="h6"
          align="center"
          sx={{ mt: 4, color: 'text.secondary' }}
        >
          Нет доступных постов. Создайте первый пост!
        </Typography>
      )}

      {!loading && !hasError && posts.length > 0 && (
        <Box
          sx={{
            ml: 2,
            mr: 2,
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: `repeat(${columns}, 1fr)`,
            },
            gap: 3,
          }}
        >
          {posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </Box>
      )}
    </Box>
  )
}

export default HomePage
