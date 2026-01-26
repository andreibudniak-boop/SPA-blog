import { Box, Typography, Toolbar } from '@mui/material'
import { useTitle } from 'react-use'
import { useHeader } from '../context/HeaderContext.tsx'
import { useEffect } from 'react'

function AboutPage() {
  useTitle('About')
  const [, setHeaderProps] = useHeader()
  useEffect(() => {
    setHeaderProps('AboutPage')
  }, [])

  return (
    <Box>
      <Typography sx={{ m: 5 }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores neque
        assumenda cum repudiandae ab officiis, sed ex voluptas provident optio.
        Eaque, voluptate placeat? Quibusdam molestiae perspiciatis rerum aut, ab
        ducimus.
      </Typography>
    </Box>
  )
}

export default AboutPage
