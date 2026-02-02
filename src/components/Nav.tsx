import { Box, Button } from '@mui/material'
import { Link } from 'react-router-dom'

export const Nav = () => {
  return (
    <Box
      component="nav"
      sx={{
        display: 'flex',
        '& ul': {
          display: 'flex',
          listStyle: 'none',
          padding: 0,
          margin: 0,
          gap: '8px',
        },
        '& li': {
          margin: 0,
          padding: 0,
        },
      }}
    >
      <ul>
        <li>
          <Button
            component={Link}
            to="/"
            sx={{
              mr: 1,
              color: 'white',
            }}
          >
            Главная
          </Button>
        </li>
        <li>
          <Button
            component={Link}
            to="/about"
            sx={{
              mr: 1,
              color: 'white',
            }}
          >
            О Проекте
          </Button>
        </li>
      </ul>
    </Box>
  )
}
