import Comments from '../components/Comments.jsx'
import { useParams, useLocation } from 'react-router-dom'
import { useTitle } from 'react-use'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchComments } from '../store/actions/commentsActions.js'
import { fetchPost } from '../store/actions/postsActions.js'
import { useHeader } from '../context/HeaderContext.tsx'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Toolbar,
  LinearProgress,
} from '@mui/material'

function PostPage() {
  useTitle('PostPage')

  const [, setHeaderProps] = useHeader()
  useEffect(() => {
    setHeaderProps('PostPage')
  }, [])

  const { id } = useParams()

  const dispatch = useDispatch()
  const { post, loadingPost, error } = useSelector(state => state.posts)

  const {
    comments,
    loading: commentsLoading,
    error: commentsError,
  } = useSelector(state => state.comments)

  useEffect(() => {
    dispatch(fetchPost(id))
    dispatch(fetchComments(id))
  }, [id, dispatch])

  if (loadingPost)
    return (
      <>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
          }}
        >
          <LinearProgress />
        </Box>
      </>
    )

  if (!post)
    return (
      <>
        <Typography>no post</Typography>
      </>
    )

  return (
    <>
      <Box sx={{ p: 3 }}>
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
              {post.id}
            </Typography>
            <Typography
              variant="h5"
              component="div"
              sx={{ color: 'inherit', mb: 1.5 }}
            >
              {post.title}
            </Typography>
            <Typography sx={{ color: 'text.info', mb: 1.5 }}>
              {post.body}
            </Typography>
            <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
              Author id:{post.userId}
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Box sx={{ p: 3 }}>
        <Comments comments={comments} />
      </Box>
      <Toolbar />
    </>
  )
}

export default PostPage
