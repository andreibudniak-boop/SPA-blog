import React from 'react'
import { Paper, Divider, Grid, Avatar, Box, Typography } from '@mui/material'
import { useGetCommentsByPostIdQuery } from '../api/blogApi'

const imgLink =
  'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'

const Comments = ({ postId }) => {
  const {
    data: comments = [],
    isLoading,
    isError,
  } = useGetCommentsByPostIdQuery(postId, {
    skip: !postId,
  })

  if (isLoading) {
    return (
      <Paper style={{ padding: '40px 20px' }}>
        <Typography>Загрузка комментариев...</Typography>
      </Paper>
    )
  }

  if (isError) {
    return (
      <Paper style={{ padding: '40px 20px' }}>
        <Typography color="error">Ошибка при загрузке комментариев</Typography>
      </Paper>
    )
  }

  if (comments.length === 0) {
    return (
      <Paper style={{ padding: '40px 20px' }}>
        <Typography>Пока нет комментариев</Typography>
      </Paper>
    )
  }

  return (
    <Paper style={{ padding: '40px 20px' }}>
      {comments.map((comment, index) => (
        <Box key={comment.id}>
          {index > 0 && (
            <Divider variant="fullWidth" style={{ margin: '30px 0' }} />
          )}

          <Grid container wrap="nowrap" spacing={2}>
            <Avatar src={imgLink} />
            <Grid justifyContent="left">
              <Typography variant="h5" style={{ margin: 0, textAlign: 'left' }}>
                {comment.name}
              </Typography>
              <Typography style={{ textAlign: 'left', color: 'gray' }}>
                {comment.email}
              </Typography>
              <Typography style={{ textAlign: 'left' }}>
                {comment.body}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      ))}
    </Paper>
  )
}

export default Comments
