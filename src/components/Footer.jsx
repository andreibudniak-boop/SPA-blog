import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

function Footer() {
  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ justifyContent: "center" }}>
        <Typography variant="h6" color="inherit">
          Footer
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Footer;
