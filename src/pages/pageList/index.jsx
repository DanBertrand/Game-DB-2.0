/* eslint-disable max-len */
import './style.scss';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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

  return (
    <>
      <div className="header">
        <Link to="/">
          <h1>The Hyper Program</h1>
        </Link>
        <div>
          <SearchBar input={input} setInput={setInput} />
          <DeleteButton updateSearch={updateSearch} />
        </div>
      </div>
      <div className="presentation">
        <h2>Welcome,</h2>
        <p>
          The Hyper Progame is the world’s premier event for computer and video games and related products. At The Hyper Progame,
          the video game industry’s top talent pack the Los Angeles Convention Center, connecting tens of thousands of the best,
          brightest, and most innovative in the interactive entertainment industry. For three exciting days, leading-edge companies,
          groundbreaking new technologies, and never-before-seen products will be showcased. The Hyper Progame connects you
          with both new and existing partners, industry executives, gamers, and social influencers providing unprecedented exposure.
        </p>
      </div>
      <div className="game-list">
        {search && search.results.length > 1 ? search.results.map((game) => <DisplayGame key={game.slug} gameSlug={game.slug} />) : (
          <p className="no-result">
            Sorry ... we couldn
            {'\''}
            t find your content
          </p>
        )}
      </div>
      <button type="button">Show More</button>
    </>
  );
};

export default PageList;
