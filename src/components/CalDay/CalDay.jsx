import { useState } from 'react';
import * as gamesAPI from '../../utilities/games-api';
import './CalDay.css';

export default function CalDay({ date, isToday, gameData }) {
  const [addedToCalendar, setAddedToCalendar] = useState(false);

  const releaseData = gameData && gameData.results
    ? gameData.results.find((result) => {
      const releaseDate = new Date(result.released + 'T00:00:00').toDateString();
      const currentDate = date.toDateString();
      return releaseDate === currentDate;
    })
    : null;
    
  const backgroundImage = releaseData ? `url(${releaseData.background_image})` : 'none';

  const handleAddToUserCal = (evt, releaseData) =>{
    evt.stopPropagation()
    gamesAPI.addGameToUserCal(releaseData);
    setAddedToCalendar(true);
  };

  return (
    <article
      className={`CalDay${isToday ? ' today' : ''}`}
      style={{
        gridColumnStart: date.getDate() === 1 && date.getDay() + 1,
        position: 'relative',
        backgroundImage: backgroundImage,
      }}
    >
      <span style={{ position: 'absolute', top: 5, left: 10 }}>
        {date.getDate()}
      </span>
      {releaseData && (
        <div className="game-info">
          <button onClick={(evt) => handleAddToUserCal(evt, releaseData)} style={{ position: 'absolute', top: 0, right: 15, fontSize: 30 }}>+</button>
          <h3>{releaseData.name}</h3>
          {addedToCalendar && <p>{releaseData.name} added to your calendar!</p>}
        </div>
      )}
    </article>
  );
}
