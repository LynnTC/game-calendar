import './CalDay.css';

export default function CalDay({ date, isToday, tasks }) {
  function handleDayClick(date) {
    alert(date);
  }

  const Cal = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + 1
  );

  return (
    <article
      className={`CalDay${isToday ? ' today' : ''}`}
      style={{ gridColumnStart: date.getDate() === 1 && date.getDay() + 1, position: 'relative'}}
      onClick={() => handleDayClick(date)}
    >
      <span style={{ position: 'absolute', top: 0, left: 10 }}>
        {date.getDate()}
      </span>
    </article>
  );
}
