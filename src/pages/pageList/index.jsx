/* eslint-disable max-len */
import './style.scss';
import React, { useState, useEffect } from 'react';
import DeleteButton from '../../components/deleteButton/index';
import DisplayGame from '../../components/displayList/index';
import SearchBar from '../../components/searchBar/index';

const PageList = ({ didSearch, updateSearch }) => {
  const [input, setInput] = useState();
  const [search, setSearch] = useState((localStorage.getItem('Search') ? JSON.parse(localStorage.getItem('Search')) : ''));

  const fetchSearch = async () => {
    if (input && input.length > 2) {
      const inputFormat = input.split(' ').join('%20');
      const response = await fetch(`https://api.rawg.io/api/games?search=${inputFormat}&page_size=27`);
      const json = await response.json();
      setSearch(await json);
      localStorage.setItem('Search', JSON.stringify(await search));
      updateSearch('keep');
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
      const response = await fetch(`https://api.rawg.io/api/games${futureDates}`);
      const json = await response.json();
      setSearch(await json);
      localStorage.setItem('Search', JSON.stringify(await search));
    }
  };

  useEffect(() => { fetchSearch(); }, [input]);
  useEffect(() => { fetchFutureGames(); }, [didSearch]);
  console.log('Search: ', search);
  return (
    <>
      <SearchBar input={input} setInput={setInput} />
      <DeleteButton updateSearch={updateSearch} />
      <div className="game-list">
        {search && search.results.map((game) => <DisplayGame key={game.slug} gameSlug={game.slug} />)}
      </div>
    </>
  );
};

export default PageList;
