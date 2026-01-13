import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

function Header(props) {
  return (
    <>
      {/* <Box sx={(theme) => ({ mr: 1, color: theme.palette.primary.main })}>
        Главная
      </Box> */}
      <AppBar position="static" sx={{ mb: 2 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {props.title}
          </Typography>
          <Box>
            <Button component={Link} to="/" color="white" sx={{ mr: 1 }}>
              Главная
            </Button>

            <Button component={Link} to="/about" color="white" sx={{ mr: 1 }}>
              О Проекте
            </Button>

            <Button component={Link} to="/sort" color="white">
              Сортировка
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Header;
