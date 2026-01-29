import React from 'react'
import { Card, CardContent, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

interface PostType {
  id: number
  title: string
  userId: number
  body: string
}
interface PostCardProps {
  post: PostType
}
const PostCard: React.FC<PostCardProps> = ({ post }: PostCardProps) => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate(`/posts/${post.id}`)
  }

  return (
    <Card onClick={handleClick} sx={{ mb: 2, cursor: 'pointer' }}>
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
  )
}

export default PostCard
