// src/components/SearchBar.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/results?query=${query}`);
  };

  return (
    <div>
      <h1>Drug Search</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a drug"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
