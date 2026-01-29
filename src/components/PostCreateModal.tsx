import React from 'react'
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

type PostCreateModalProps = {
  open: boolean
  onClose: () => void
  onSuccess: () => void
  onError: (errorMessage: string) => void
  createPost: ({}) => Promise<unknown>
  isCreating: boolean
}

const PostCreateModal: React.FC<PostCreateModalProps> = ({
  open,
  onClose,
  onSuccess,
  onError,
  createPost,
  isCreating,
}: PostCreateModalProps) => {
  const [localError, setLocalError] = useState('')

  type FormData = {
    title: string
    body: string
    userId: number | null
  }
  const [formData, setFormData] = useState<FormData>({
    title: '',
    body: '',
    userId: null,
  })

  const handleSubmit = async (e: React.FormEvent) => {
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
      await createPost(formData)
      setFormData({ title: '', userId: null, body: '' })
      onSuccess()
    } catch (error) {
      const rtkError = error as {
        data?: {
          message?: string
          error?: string
          statusCode?: number
        }
        status?: number
        message?: string
      }
      const errorMessage =
        rtkError?.data?.message ||
        rtkError?.data?.error ||
        rtkError?.message ||
        'Неизвестная ошибка'
      setLocalError(errorMessage)
      onError(errorMessage)
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
      setFormData({ title: '', userId: null, body: '' })
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
