import { useDispatch } from 'react-redux'
import { createPost } from '../store/actions/postsActions.js'
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
} from '@mui/material'

function PostCreateModal({ open, onClose, onSuccess, onError }) {
  const dispatch = useDispatch()
  const [localError, setLocalError] = useState('')
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    userId: '',
  })
  const handleSubmit = async e => {
    setLocalError('')
    e.preventDefault()

    if (!formData.title.trim()) {
      setLocalError('Заголовок обязателен')
      return
    }

    if (!formData.userId || isNaN(formData.userId)) {
      setLocalError('User ID должен быть числом')
      return
    }

    dispatch(
      createPost(
        formData,
        createdPost => {
          onSuccess()
          setFormData({ title: '', userId: '', body: '' })
          onClose()
        },
        errorMessage => {
          onError(errorMessage)
        }
      )
    )
  }

  const handleChange = event => {
    const { name, value } = event.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <Dialog
      open={open}
      onClose={() => onClose()}
      maxWidth="xs"
      fullWidth
      disableEnforceFocus={false}
      disableAutoFocus={false}
    >
      <DialogTitle>Создать</DialogTitle>

      {localError && (
        <Alert severity="error" sx={{ mx: 3, mt: 1 }}>
          {localError}
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              id="outlined-basic"
              name="title"
              onChange={handleChange}
              value={formData.title}
              label="Title"
              variant="outlined"
              required
              error={!!localError && localError.includes('Заголовок')}
            />

            <TextField
              id="outlined-basic"
              name="userId"
              onChange={handleChange}
              value={formData.userId}
              label="userId"
              variant="outlined"
              required
              error={!!localError && localError.includes('User ID')}
            />

            <TextField
              id="outlined-basic"
              name="body"
              onChange={handleChange}
              value={formData.body}
              label="Text"
              variant="outlined"
              multiline
              rows={4}
              required
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ mr: 2, mb: 2 }}>
          <Button
            onClick={() => {
              setFormData({ title: '', userId: '', body: '' })
              setLocalError('')
              onClose()
            }}
          >
            Отмена
          </Button>
          <Button type="submit" variant="contained">
            Сохранить
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default PostCreateModal
