import React, { useState } from "react";
import { TextField, Button, Box, Toolbar } from "@mui/material";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  const handleClean = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <Toolbar sx={{ display: "flex", justifyContent: "center" }}>
      <TextField
        id="outlined-basic"
        label="Поиск по заголовку"
        variant="outlined"
        value={query}
        onChange={handleSearch}
        sx={{ margin: 2 }}
      />
      {query && (
        <Button onClick={handleClean} variant="outlined">
          clean
        </Button>
      )}
    </Toolbar>
  );
}

export default SearchBar;
