import Comments from '../components/Comments.jsx'
import { useParams } from 'react-router-dom'
import { useTitle } from 'react-use'
import { useEffect } from 'react'
import { useHeader } from '../context/HeaderContext.js'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Toolbar,
  LinearProgress,
} from '@mui/material'
import { useGetPostQuery } from '../api/blogApi.js'

function PostPage() {
  useTitle('PostPage')

  const { id: postId = '' } = useParams()
  const [, setHeaderProps] = useHeader()

  useEffect(() => {
    setHeaderProps('PostPage')
  }, [setHeaderProps])

  const {
    data: post,
    isLoading: postLoading,
    isError: postError,
  } = useGetPostQuery(Number(postId), {
    skip: !postId,
  })

  if (postLoading)
    return (
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
    )

  if (postError)
    return <Typography color="error">Ошибка при загрузке поста</Typography>

  if (!post) return <Typography>no post</Typography>

  return (
    <Box>
      <Box sx={{ p: 3 }}>
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
              {post.id}
            </Typography>
            <Typography variant="h5" sx={{ color: 'inherit', mb: 1.5 }}>
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
        <Comments postId={postId} />
      </Box>
      <Toolbar />
    </Box>
  )
}

export default PostPage
