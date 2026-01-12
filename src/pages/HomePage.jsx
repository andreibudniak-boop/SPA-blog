// import React from "react";
// import Footer from "./Footer.jsx";
// import Header from "./Header.jsx";
// import PostCard from "./PostCard.jsx";
// import SearchBar from "./SearchBar.jsx";
// import { POSTS } from "../constants/posts.js";
// import { useState } from "react";
// import { Box, Grid, Typography } from "@mui/material";

// function HomePage() {
//   let text = "";

//   if (POSTS.length == 0) {
//     text = "No posts available yet.";
//   }
//   const [posts, setPost] = useState(POSTS);
//   return (
//     <Box>
//       <Header title="Home Page" />
//       <Typography>{text}</Typography>
//       <Box
//         sx={{
//           width: "100%",
//           mx: "auto",
//         }}
//       >
//         <Grid container spacing={2} sx={{ border: "1px solid red" }}>
//           {posts.map((post) => (
//             <Grid item xs={12} md={6} key={post.id}>
//               <PostCard post={post} />
//             </Grid>
//           ))}
//         </Grid>
//       </Box>
//       <Footer />
//     </Box>
//   );
// }

// export default HomePage;

import React from "react";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import PostCard from "../components/PostCard.jsx";
import { POSTS } from "../constants/posts.js";
import { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";

function HomePage() {
  const [posts] = useState(POSTS);

  return (
    <Box>
      <Header title="Home Page" />
      {posts.length === 0 && <Typography>No posts available yet.</Typography>}

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: "center",
          "& > *": {
            width: { xs: "100%", sm: "calc(50% - 8px)" },
            maxWidth: { sm: "calc(50% - 8px)" },
          },
        }}
      >
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </Box>

      <Footer />
    </Box>
  );
}

export default HomePage;
