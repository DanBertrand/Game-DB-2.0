/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import GameCard from '../gameCard/index';

const DisplayList = ({ gameSlug }) => {
  const [game, setGame] = useState();
  const fetchData = async () => {
    const response = await fetch(`https://api.rawg.io/api/games/${gameSlug}`);
    const json = await response.json();
    setGame(await json);
  };
  useEffect(() => { fetchData(); }, []);
  console.log(game);
  return (
    (game ? <GameCard game={game} /> : <p>Loading ...</p>)

  );
};

export default DisplayList;
