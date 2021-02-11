/* eslint-disable max-len */
import './style.scss';
import React, { useState, useEffect } from 'react';
import DisplayGame from '../../components/displayList/index';
import SearchBar from '../../components/searchBar/index';

const PageList = () => {
  const [input, setInput] = useState();
  const [search, setSearch] = useState();
  const fetchData = async () => {
    if (input && input.length > 2) {
      const inputFormat = input.split(' ').join('%20');
      const response = await fetch(`https://api.rawg.io/api/games?search=${inputFormat}&page_size=27`);
      const json = await response.json();
      setSearch(await json);
    }
  };
  useEffect(() => { fetchData(); }, [input]);

  return (
    <>
      <SearchBar input={input} setInput={setInput} fetchData={fetchData} />
      <div className="game-list">
        {search && search.results.map((game) => <DisplayGame key={game.slug} gameSlug={game.slug} />)}
      </div>
    </>
  );
};

export default PageList;
