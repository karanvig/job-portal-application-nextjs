// Components/SearchBar.js
"use client";

import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (event) => {
    setQuery(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <div className="flex items-center space-x-2">
      <input
        type="text"
        placeholder="Search jobs..."
        value={query}
        onChange={handleChange}
        className="p-2 border rounded-lg"
      />
    </div>
  );
};

export default SearchBar;
