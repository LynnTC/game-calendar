import './UserCalDay.css';

export default function UserCalDay({ date, isToday, tasks }) {
  function handleDayClick(date) {
    alert(date);
  }

  const caldate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + 1
  );
  const tasksToday = Array.isArray(tasks)
    ? tasks.filter(
        (task) =>
          task.date.valueOf() >= date.valueOf() &&
          task.date.valueOf() < caldate.valueOf()
      )
    : [];

  const taskItems = tasksToday.map(
    (task) => task.category.slice(0, 3) + '<br/>'
  );

  return (
    <article
      className={`UserCalDay${isToday ? ' today' : ''}`}
      style={{ gridColumnStart: date.getDate() === 1 && date.getDay() + 1 }}
      onClick={() => handleDayClick(date)}
    ></article>
  );
}
