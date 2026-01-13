import React from "react";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import PostCard from "../components/PostCard.jsx";
import { POSTS } from "../constants/posts.js";
import { useState } from "react";
import { Box, Typography } from "@mui/material";

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
