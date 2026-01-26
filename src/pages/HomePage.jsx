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
import { useSelector, useDispatch } from 'react-redux'
import { fetchPosts, createPost } from '../store/actions/postsActions.js'
import { useHeader } from '../context/HeaderContext.tsx'
import PostCreateModal from '../components/PostCreateModal.jsx'

function HomePage() {
  useTitle('Home')
  const [, setHeaderProps] = useHeader()
  useEffect(() => {
    setHeaderProps('HomePage')
  }, [])

  const [columns, setColumns] = useState(4)

  const handleChoose = event => {
    setColumns(event.target.value)
  }

  const dispatch = useDispatch()
  const { posts, loading, error } = useSelector(state => state.posts)

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])

  const handleRetry = () => {
    dispatch(fetchPosts())
  }

  const [openModal, setOpenModal] = useState(false)

  const [alert, setAlert] = useState({
    open: false,
    message: '',
    severity: 'success',
  })

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false })
  }

  return (
    <Box>
      {openModal && (
        <PostCreateModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          onSuccess={() => {
            setAlert({
              open: true,
              message: 'Пост успешно создан!',
              severity: 'success',
            })
          }}
          onError={errorMessage => {
            setAlert({
              open: true,
              message: `Ошибка при создании: ${errorMessage}`,
              severity: 'error',
            })
          }}
        />
      )}

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Button variant="contained" onClick={handleRetry} sx={{ m: 2 }}>
          Обновить
        </Button>
        <Button
          variant="contained"
          onClick={() => setOpenModal(true)}
          sx={{ m: 2 }}
        >
          Создать
        </Button>
        <FormControl sx={{ width: 200, m: 2 }}>
          <InputLabel id="demo-simple-select-label">Показать по</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={columns ?? 4} // (columns !== undefined && columns !== null) ? columns : 3
            label="Показать по"
            onChange={handleChoose}
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

      {!loading && !error && posts.length === 0 && (
        <Typography>No posts available yet.</Typography>
      )}
      {!loading && !error && posts.length > 0 && (
        <Box
          sx={{
            ml: 2,
            mr: 2,
            display: 'grid',
            gridTemplateColumns: {
              xs: `repeat(${columns}, 1fr)`,
            },
            gap: 2,
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
