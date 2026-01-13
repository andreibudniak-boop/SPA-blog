import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import SearchBar from "../components/SearchBar.jsx";
import { useState } from "react";
import PostCard from "../components/PostCard.jsx";
import { usePosts } from "../context/PostContext.jsx";

function SortPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { posts, loading, error, refetch } = usePosts();

  const filterPosts = () => {
    if (!searchQuery.trim()) {
      return posts;
    }

    const query = searchQuery.toLowerCase();
    return posts.filter((post) => post.title.toLowerCase().includes(query));
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
