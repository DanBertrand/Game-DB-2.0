import './style.scss';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const PageDetails = () => {
  const { slug } = useParams();
  const [game, setGame] = useState();
  const fetchData = async () => {
    const response = await fetch(`https://api.rawg.io/api/games/${slug}`);
    const json = await response.json();
    setGame(await json);
  };
  useEffect(() => { fetchData(); }, []);
  return (
    (game ? <h1>{game.name}</h1> : <p>Loading ...</p>)
  );
};

export default PageDetails;
