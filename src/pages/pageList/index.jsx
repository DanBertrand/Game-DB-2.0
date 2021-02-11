import React, { useState } from 'react';
import SearchBar from '../../components/searchBar/index';

const PageList = () => {
  const [input, setInput] = useState();

  return (
    <>
      <div>PageList</div>
      <SearchBar input={input} setInput={setInput} />
    </>
  );
};

export default PageList;
