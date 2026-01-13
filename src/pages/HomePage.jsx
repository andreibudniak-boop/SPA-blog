import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import PostCard from "../components/PostCard.jsx";
import { Box, Typography, CircularProgress, Button } from "@mui/material";
import { usePosts } from "../context/PostContext.jsx";

function HomePage() {
  const { posts, loading, error, refetch } = usePosts();

  const handleRetry = () => {
    refetch();
  };

  return (
    <Box>
      <Header title="Home Page" />
      <Button variant="contained" onClick={handleRetry} sx={{ m: 2 }}>
        Обновить
      </Button>

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {!loading && !error && posts.length === 0 && (
        <Typography>No posts available yet.</Typography>
      )}
      {!loading && !error && posts.length > 0 && (
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
      )}

      <Footer />
    </Box>
  );
}

export default HomePage;
