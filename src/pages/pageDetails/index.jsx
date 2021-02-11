import './style.scss';
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

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
    <>
      <div className="header">
        <Link to="/">
          <h1>The Hyper Program</h1>
        </Link>
      </div>
      {game ? <h1>{game.name}</h1> : <p>Loading ...</p>}
    </>
  );
};

export default PageDetails;
