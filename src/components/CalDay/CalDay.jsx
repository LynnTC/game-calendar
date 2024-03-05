import React from 'react';
import './CalDay.css';

export default function CalDay({ date, isToday, gameData }) {
  function handleDayClick(date) {
    alert(date);
  }


  const releaseData = gameData && gameData.results
    ? gameData.results.find((result) => {
      const releaseDate = new Date(result.released + 'T00:00:00').toDateString();
      const currentDate = date.toDateString();
      return releaseDate === currentDate;
    })
    : null;

  const backgroundImage = releaseData ? `url(${releaseData.background_image})` : 'none';

  return (
    <article
      className={`CalDay${isToday ? ' today' : ''}`}
      style={{
        gridColumnStart: date.getDate() === 1 && date.getDay() + 1,
        position: 'relative',
        backgroundImage: backgroundImage,
      }}
      onClick={() => handleDayClick(date)}
    >
      <span style={{ position: 'absolute', top: 0, left: 10 }}>
        {date.getDate()}
      </span>
      {releaseData && (
        <div className="game-info">
          <h3>{releaseData.name}</h3>
        </div>
      )}
    </article>
  );
}
