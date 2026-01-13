import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import { Box, Typography } from "@mui/material";

function AboutPage() {
  return (
    <Box>
      <Header title="About Page" />
      <Typography sx={{ m: 5 }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores neque
        assumenda cum repudiandae ab officiis, sed ex voluptas provident optio.
        Eaque, voluptate placeat? Quibusdam molestiae perspiciatis rerum aut, ab
        ducimus.
      </Typography>
      <Footer />
    </Box>
  );
}

export default AboutPage;
