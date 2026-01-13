import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      setPosts(response.data);
    } catch (err) {
      setError(err.message || "Failed to load posts");
      console.error("Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const value = {
    posts,
    loading,
    error,
    refetch: fetchPosts,
  };

  return (
    <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
  );
};

export const usePosts = () => {
  const context = useContext(PostsContext);

  if (!context) {
    throw new Error(" PostsProvider");
  }

  return context;
};
