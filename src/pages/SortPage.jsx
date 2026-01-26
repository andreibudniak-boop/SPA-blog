import SearchBar from '../components/SearchBar.jsx'
import { useState, useEffect } from 'react'
import PostCard from '../components/PostCard.jsx'
import { useTitle } from 'react-use'
import { useDispatch, useSelector } from 'react-redux'
import { Toolbar, Box } from '@mui/material'
import { fetchPosts } from '../store/actions/postsActions.js'
import { useHeader } from '../context/HeaderContext.tsx'

function SortPage() {
  useTitle('sort')
  const [, setHeaderProps] = useHeader()
  useEffect(() => {
    setHeaderProps('SortPage')
  }, [])

  const [searchQuery, setSearchQuery] = useState('')

  const dispatch = useDispatch()
  const { posts, loading, error } = useSelector(state => state.posts)

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])

  const filterPosts = () => {
    if (!searchQuery.trim()) {
      return posts
    }

    const query = searchQuery.toLowerCase()
    return posts.filter(post => post.title.toLowerCase().includes(query))
  }

  const filteredPosts = filterPosts()

  const handleSearch = query => {
    setSearchQuery(query)
  }

  return (
    <Box>
      <Toolbar />
      <SearchBar onSearch={handleSearch} />
      <Toolbar />
      <Box sx={{ ml: 2, mr: 2 }}>
        {filteredPosts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </Box>
    </Box>
  )
}

export default SortPage
