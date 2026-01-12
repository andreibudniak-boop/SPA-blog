import React from "react";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import { Typography } from "@mui/material";

function AboutPage() {
  return (
    <div>
      <Header title="About Page" />
      <Typography sx={{ m: 5 }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores neque
        assumenda cum repudiandae ab officiis, sed ex voluptas provident optio.
        Eaque, voluptate placeat? Quibusdam molestiae perspiciatis rerum aut, ab
        ducimus.
      </Typography>
      <Footer />
    </div>
  );
}

export default AboutPage;
