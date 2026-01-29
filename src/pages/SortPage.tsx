import SearchBar from '../components/SearchBar.js'
import { useState, useEffect } from 'react'
import PostCard from '../components/PostCard.js'
import { useTitle } from 'react-use'
import { Toolbar, Box, LinearProgress, Alert, Button } from '@mui/material'
import { useHeader } from '../context/HeaderContext.js'
import { useGetPostsQuery } from '../api/blogApi.js'

function SortPage() {
  useTitle('sort')
  const [, setHeaderProps] = useHeader()
  useEffect(() => {
    setHeaderProps('SortPage')
  }, [setHeaderProps])

  const [searchQuery, setSearchQuery] = useState('')

  const {
    data: posts = [],
    isLoading: loading,
    isError: error,
    refetch,
  } = useGetPostsQuery()

  const filterPosts = () => {
    if (!searchQuery.trim()) {
      return posts
    }

    const query = searchQuery.toLowerCase()
    return posts.filter(post => post.title.toLowerCase().includes(query))
  }

  const filteredPosts = filterPosts()

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleRetry = () => {
    refetch()
  }

  return (
    <Box>
      <Toolbar />
      <SearchBar onSearch={handleSearch} />
      <Toolbar />

      {loading && <LinearProgress color="primary" />}

      {error && (
        <Box sx={{ p: 3 }}>
          <Alert
            severity="error"
            action={
              <Button color="inherit" size="small" onClick={handleRetry}>
                Повторить
              </Button>
            }
          >
            Ошибка при загрузке постов
          </Alert>
        </Box>
      )}

      {!loading && !error && (
        <Box sx={{ ml: 2, mr: 2 }}>
          {filteredPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </Box>
      )}
    </Box>
  )
}

export default SortPage
