import { useState, useEffect } from 'react';
import './HomeCalendar.css';
import CalDay from '../../components/CalDay/CalDay';

const MO_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function Calendar({ tasks }) {
  const today = new Date(new Date().setHours(0, 0, 0, 0));
  const [calMo, setCalMo] = useState(today.getMonth());
  const [calYr, setCalYr] = useState(today.getFullYear());
  const [gameData, setGameData] = useState(null)

  useEffect(() => {
    async function fetchApiKey() {
      try {
        const response = await fetch('/api/gameApiKey');
        if (!response.ok) {
          throw new Error(`Failed to fetch API key. Status: ${response.status}`);
        }
        const { apiKey } = await response.json();
        const startDate = new Date(calYr, calMo, 1).toISOString().split('T')[0];
        const endDate = new Date(calYr, calMo + 1, 0).toISOString().split('T')[0];

        const gameResponse = await fetch(`https://rawg.io/api/games?key=${apiKey}&dates=${startDate},${endDate}`);
        if (!gameResponse.ok) {
          throw new Error(`Failed to fetch game data. Status: ${gameResponse.status}`);
        }
        const gameData = await gameResponse.json();
        setGameData(gameData);
      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchApiKey();
  }, [calMo, calYr]);

  const numCalDays = new Date(calYr, calMo + 1, 0).getDate();

  const calDays = gameData ? (
    new Array(numCalDays).fill().map((_, idx) => {
      const date = new Date(calYr, calMo, idx + 1);
      return (
        <CalDay
          key={date}
          date={date}
          isToday={today.valueOf() === date.valueOf()}
          tasks={tasks}
          gameData={gameData}
        />
      );
    })
  ) : null;

  function handlePrevMo() {
    if (calMo === 0) {
      setCalMo(11);
      setCalYr(calYr - 1);
    } else {
      setCalMo(calMo - 1);
    }
  }

  function handleNextMo() {
    if (calMo === 11) {
      setCalMo(0);
      setCalYr(calYr + 1);
    } else {
      setCalMo(calMo + 1);
    }
  }

  return (
    <>
    <section className="Calendar">
      <header className="flex-ctr-ctr">
        <span onClick={handlePrevMo}>&#x21e6;</span>
        <span>
          {MO_NAMES[calMo]}, {calYr}
        </span>
        <span onClick={handleNextMo}>&#x21e8;</span>
      </header>
      <div className="flex-ctr-ctr">Sunday</div>
      <div className="flex-ctr-ctr">Monday</div>
      <div className="flex-ctr-ctr">Tuesday</div>
      <div className="flex-ctr-ctr">Wednesday</div>
      <div className="flex-ctr-ctr">Thursday</div>
      <div className="flex-ctr-ctr">Friday</div>
      <div className="flex-ctr-ctr">Saturday</div>
      {calDays}
    </section>
    <a className="rawglink" href="https://rawg.io/" target="_blank" rel="noopener noreferrer">Information from rawg.io API</a>
    </>
  );
}