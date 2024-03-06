import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UserCalDay.css';

export default function CalDay({ date, isToday, games }) {
  const navigate = useNavigate();

  const gameData = games && games[0]
    ? games[0].find((result) => {
      const releaseDate = new Date(result.releaseDate + 'T00:00:00').toDateString();
      const currentDate = date.toDateString();
      return releaseDate === currentDate;
    })
    : null;

  const backgroundImage = gameData?.background?.url || 'none';

  const handleDayClick = () => {
    if (gameData) {
      navigate(`/game/${gameData._id}`);
    }
  };

  return (
    <article
      className={`UserCalDay${isToday ? ' today' : ''}`}
      style={{
        gridColumnStart: date.getDate() === 1 ? date.getDay() + 1 : 'auto',
        position: 'relative',
        backgroundImage: backgroundImage !== 'none' ? `url(${backgroundImage})` : 'none',
        backgroundSize: 'cover',
      }}
      onClick={handleDayClick}
    >
      <span style={{ position: 'absolute', top: 0, left: 10 }}>
        {date.getDate()}
      </span>
      {gameData && (
        <div className="game-info">
          <h3>{gameData.name}</h3>
        </div>
      )}
    </article>
  );
}
