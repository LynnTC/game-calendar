import './CalDay.css';

export default function CalDay({ date, isToday, tasks }) {
  function handleDayClick(date) {
    alert(date);
  }

  const manana = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + 1
  );

  return (
    <article
      className={`CalDay${isToday ? ' today' : ''}`}
      style={{ gridColumnStart: date.getDate() === 1 && date.getDay() + 1 }}
      onClick={() => handleDayClick(date)}
    ></article>
  );
}
