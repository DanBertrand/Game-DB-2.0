/* eslint-disable max-len */
import './style.scss';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Linux from '../../images/logos/linux.svg';
import Mobile from '../../images/logos/mobile.svg';
import PS4 from '../../images/logos/ps4.svg';
import Switch from '../../images/logos/switch.svg';
import PC from '../../images/logos/windows.svg';
import Xbox from '../../images/logos/xbox.svg';

const GameCard = ({ game }) => {
  const [isHovered, setIsHovered] = useState(false);
  const toggleHover = () => setIsHovered((previsHovered) => !previsHovered);
  const displayPlatform = (platform) => {
    if (platform.platform.slug === 'pc') { return <img src={PC} alt={`${game.name}`} />; }
    if (platform.platform.slug === 'playstation') { return <img src={PS4} alt={`${game.name}`} />; }
    if (platform.platform.slug === 'xbox') { return <img src={Xbox} alt={`${game.name}`} />; }
    if (platform.platform.slug === 'ios') { return <img src={Mobile} alt={`${game.name}`} />; }
    if (platform.platform.slug === 'nintendo') { return <img src={Switch} alt={`${game.name}`} />; }
    if (platform.platform.slug === 'android') { return <img src={Mobile} alt={`${game.name}`} />; }
    if (platform.platform.slug === 'linux') { return <img src={Linux} alt={`${game.name}`} />; }
    if (platform.platform.slug === 'mac') { return <p>Mac</p>; }
    return null;
  };
  return (
    <div onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
      <Link className="card-game" to={`/pagedetails/${game.slug}`}>
        <img className="image" src={game.background_image} alt={`${game.name}`} />
        <p className="title">{game.name}</p>
        <ul className="platform-list">
          { game.parent_platforms && game.parent_platforms.map((platform) => <li key={platform.platform.name}>{displayPlatform(platform)}</li>)}
        </ul>
      </Link>
      {isHovered
        && (
        <Link to={`/pagedetails/${game.slug}`}>
          <div className="hidden-div">
            {game.released && <p>{`Release: ${game.released}`}</p>}
            {game.developers[0] && game.developers[0].name && <p>{`Main publisher: ${game.developers[0].name}`}</p>}
            <p>{`${game.rating} / 5`}</p>
            {/* <p>{game.tags}</p> */}
          </div>
        </Link>
        )}
    </div>
  );
};

export default GameCard;
