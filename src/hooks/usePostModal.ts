import { toast } from 'react-toastify'
import { useState, useEffect, useCallback } from 'react'
import { useCreatePostMutation, Post } from '../api/blogApi'
import { getErrorMessage } from '../pages/HomePage'

export const usePostModal = () => {
  const [openModal, setOpenModal] = useState(false)
  const [
    createPostMutation,
    { isLoading: isCreating, error: createError, reset: resetCreateMutation },
  ] = useCreatePostMutation()

  useEffect(() => {
    if (createError) {
      const errorMessage = getErrorMessage(createError)
      toast.error(`Ошибка создания поста: ${errorMessage}`)
      resetCreateMutation()
    }
  }, [createError, resetCreateMutation, toast])

  const handleOpenModal = useCallback(() => {
    setOpenModal(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setOpenModal(false)
    resetCreateMutation()
  }, [resetCreateMutation])

  const handleCreateSuccess = useCallback(() => {
    toast.success('Пост успешно создан!')
    setOpenModal(false)
  }, [])

  const handleCreateError = useCallback(
    (error: any) => {
      const errorMessage = getErrorMessage(error)
      toast.error(`Ошибка при создании поста: ${errorMessage}`)
      setOpenModal(false)
    },
    [getErrorMessage]
  )

  const handleCreatePost = useCallback(
    async (postData: Omit<Post, 'id'>) => {
      try {
        const result = await createPostMutation(postData).unwrap()
        return result
      } catch (error) {
        throw error
      }
    },
    [createPostMutation]
  )

  return {
    openModal,
    isCreating,
    createError,
    handleOpenModal,
    handleCloseModal,
    handleCreateSuccess,
    handleCreateError,
    handleCreatePost,
  }
}
