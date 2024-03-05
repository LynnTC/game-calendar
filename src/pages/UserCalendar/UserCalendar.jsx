import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as gamesAPI from '../../utilities/games-api';
import './UserCalendar.css';
import UserCalDay from '../../components/UserCalDay/UserCalDay'

const MO_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export default function UserCalendar({ tasks }) {
  const today = new Date(new Date().setHours(0, 0, 0, 0));
  const [calMo, setCalMo] = useState(today.getMonth());
  const [calYr, setCalYr] = useState(today.getFullYear());
  const numCalDays = new Date(calYr, calMo + 1, 0).getDate();
  const [games, setGames] = useState([]);

  
  useEffect(() => {
    async function userGames(Game) {
        const game = await gamesAPI.getAll();
        setGames([...games, game]);
        console.log(game)
      }
    userGames();
  }, []);

  const calDays = new Array(numCalDays).fill().map((_, idx) => {
    const date = new Date(calYr, calMo, idx + 1);
    return (
      <UserCalDay
        date={date}
        isToday={today.valueOf() === date.valueOf()}
        tasks={tasks}
        key={date}
        games={games}
      />
    );
  });

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
    <section className="UserCalendar">
      <header className="flex-ctr-ctr">
        <span onClick={handlePrevMo}>&#x21e6;</span>
        <span>
          {MO_NAMES[calMo]}, {calYr}
        </span>
        <span onClick={handleNextMo}>&#x21e8;</span>
      </header>
      <div className="flex-ctr-ctr">Su</div>
      <div className="flex-ctr-ctr">Mo</div>
      <div className="flex-ctr-ctr">Tu</div>
      <div className="flex-ctr-ctr">We</div>
      <div className="flex-ctr-ctr">Th</div>
      <div className="flex-ctr-ctr">Fr</div>
      <div className="flex-ctr-ctr">Sa</div>
      {calDays}
      <footer>
        <Link to="/gameform">Add Game To Your Calendar</Link>
      </footer>
    </section>
  );
}
