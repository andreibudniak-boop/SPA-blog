import React from 'react'
import { Box, Typography } from '@mui/material'

const Footer: React.FC = () => {
  return (
    <Box
      component={'footer'}
      sx={{ width: '100%', p: 2, backgroundColor: 'primary.dark' }}
    >
      <Typography variant="h6" color="white">
        Footer
      </Typography>
    </Box>
  )
}

export default Footer
