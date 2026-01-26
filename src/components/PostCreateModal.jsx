import { useState } from 'react'
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Stack,
  DialogActions,
  TextField,
  Alert,
  CircularProgress,
} from '@mui/material'

function PostCreateModal({
  open,
  onClose,
  onSuccess,
  onError,
  createPost,
  isCreating,
}) {
  const [localError, setLocalError] = useState('')
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    userId: '',
  })

  const handleSubmit = async e => {
    e.preventDefault()
    setLocalError('')

    if (!formData.title.trim()) {
      setLocalError('Заголовок обязателен')
      return
    }

    if (!formData.userId || isNaN(formData.userId)) {
      setLocalError('User ID должен быть числом')
      return
    }

    if (!formData.body.trim()) {
      setLocalError('Текст обязателен')
      return
    }

    try {
      await createPost(formData).unwrap()
      setFormData({ title: '', userId: '', body: '' })
      onSuccess()
    } catch (error) {
      const errorMessage =
        error?.data?.message || error?.message || 'Неизвестная ошибка'
      setLocalError(errorMessage)
      onError(errorMessage)
    }
  }

  const handleChange = event => {
    const { name, value } = event.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
    if (localError) {
      setLocalError('')
    }
  }

  const handleClose = () => {
    if (!isCreating) {
      setFormData({ title: '', userId: '', body: '' })
      setLocalError('')
      onClose()
    }
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      disableEnforceFocus={false}
      disableAutoFocus={false}
    >
      <DialogTitle>Создать пост</DialogTitle>

      {localError && (
        <Alert
          severity="error"
          sx={{ mx: 3, mt: 1 }}
          onClose={() => setLocalError('')}
        >
          {localError}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              id="title-input"
              name="title"
              onChange={handleChange}
              value={formData.title}
              label="Заголовок"
              variant="outlined"
              required
              error={!!localError && localError.includes('Заголовок')}
              disabled={isCreating}
              fullWidth
            />

            <TextField
              id="user-id-input"
              name="userId"
              onChange={handleChange}
              value={formData.userId}
              label="User ID"
              variant="outlined"
              required
              error={!!localError && localError.includes('User ID')}
              disabled={isCreating}
              type="number"
              fullWidth
            />

            <TextField
              id="body-input"
              name="body"
              onChange={handleChange}
              value={formData.body}
              label="Текст поста"
              variant="outlined"
              multiline
              rows={4}
              required
              error={!!localError && localError.includes('Текст')}
              disabled={isCreating}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ mr: 2, mb: 2 }}>
          <Button onClick={handleClose} disabled={isCreating} color="inherit">
            Отмена
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isCreating}
            startIcon={isCreating ? <CircularProgress size={20} /> : null}
          >
            Сохранить
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default PostCreateModal
