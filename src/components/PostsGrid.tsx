import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import PostCard from './PostCard'

type Post = {
  id: number
  title: string
  body: string
  userId: number
}
interface PostsGridProps {
  posts: Post[]
  columns: number
}

const GridContainer = styled(Box, {
  shouldForwardProp: prop => prop !== 'columns',
})<{ columns: number }>(({ theme, columns }) => ({
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
  display: 'grid',
  gap: theme.spacing(3),
  gridTemplateColumns: '1fr',

  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
  },
}))

const PostsGrid: React.FC<PostsGridProps> = ({ posts, columns }) => {
  return (
    <GridContainer columns={columns}>
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </GridContainer>
  )
}

export default PostsGrid
