import React from 'react'
import { Paper, Divider, Grid, Avatar, Box, Typography } from '@mui/material'

const imgLink =
  'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'

interface CommentType {
  id: number
  name: string
  email: string
  body: string
}
interface CommentsProps {
  comments: CommentType[]
}
const Comments: React.FC<CommentsProps> = ({ comments }) => {
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
