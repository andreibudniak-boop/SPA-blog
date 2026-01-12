import React from "react";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import SearchBar from "../components/SearchBar.jsx";
import { POSTS } from "../constants/posts.js";
import { useState } from "react";
import PostCard from "../components/PostCard.jsx";

function SortPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filterPosts = () => {
    if (!searchQuery.trim()) {
      return POSTS;
    }

    const query = searchQuery.toLowerCase();
    return POSTS.filter((post) => post.title.toLowerCase().includes(query));
  };

  const filteredPosts = filterPosts();

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div>
      <Header title="Sort Page" />
      <SearchBar onSearch={handleSearch} />
      {filteredPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
      <Footer />
    </div>
  );
}

export default SortPage;
