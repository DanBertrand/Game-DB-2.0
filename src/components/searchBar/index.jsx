import React from 'react';

const SearchBar = ({ input, setInput }) => (
  <input
    type="text"
    value={input || ''}
    onKeyDown={(e) => (e.key === 'Enter' ? console.log(input) : null)}
    onChange={(e) => setInput(e.target.value)}
    placeholder="Search your game here ..."
  />
);

export default SearchBar;
