/* eslint-disable max-len */
import './style.scss';
import React, { useState, useEffect } from 'react';
import DisplayGame from '../../components/displayList/index';
import SearchBar from '../../components/searchBar/index';

const PageList = () => {
  const [input, setInput] = useState();
  const [search, setSearch] = useState((localStorage.getItem('Search') ? JSON.parse(localStorage.getItem('Search')) : ''));
  const [didSearch, setDidSearch] = useState(false);
  const fetchSearch = async () => {
    if (input && input.length > 2) {
      const inputFormat = input.split(' ').join('%20');
      const response = await fetch(`https://api.rawg.io/api/games?search=${inputFormat}&page_size=27`);
      const json = await response.json();
      setSearch(await json);
      localStorage.setItem('Search', JSON.stringify(await search));
      setDidSearch(true);
    }
  };

  const datePlusTenYears = () => {
    const date = new Date();
    const year = date.getFullYear() + 10;
    const dateNoYear = date.toISOString().slice(4, 10);
    return year.toString().concat(dateNoYear);
  };

  const fetchFutureGames = async () => {
    if (!didSearch) {
      const futureDates = `?dates=${new Date().toISOString().slice(0, 10)},${datePlusTenYears()}`;
      const response = await fetch(`https://api.rawg.io/api/games${futureDates}&ordering=-rating`);
      const json = await response.json();
      setSearch(await json);
    }
  };

  useEffect(() => { fetchSearch(); }, [input]);
  useEffect(() => { fetchFutureGames(); }, [didSearch]);

  return (
    <>
      <SearchBar input={input} setInput={setInput} />
      <div className="game-list">
        {search && search.results.map((game) => <DisplayGame key={game.slug} gameSlug={game.slug} />)}
      </div>
    </>
  );
};

export default PageList;
