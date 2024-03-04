import { useState } from 'react';
import { redirect } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "./GameForm.css"
import * as gamesAPI from '../../utilities/games-api';

export default function GameForm({}) {
  const [Game, setGame] = useState({
    name: '',
    description: '',
    releaseDate: '',
    useUpload: false,
    background: {
      url: '',
      file: '',
    },
  });

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const createdGame = await gamesAPI.createGame(Game);
      return redirect('/calendar');
    } catch (error) {
      console.error('Error creating game:', error);
    }
  }

  const handleDateChange = (date) => {
    setGame({ ...Game, releaseDate: date });
  };

  function handleChange(evt) {
    const { name, value, type, checked } = evt.target;
    if (type === 'checkbox') {
      setGame({ ...Game, [name]: checked, background: { url: '', file: '' } });
    } else if (name === 'background') {
      // Handle background separately
      setGame({ ...Game, background: { ...Game.background, url: value } });
    } else {
      setGame({ ...Game, [name]: value });
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Game Name</label>
        <input
          name="name"
          value={Game.name}
          onChange={handleChange}
          placeholder="Game Name"
          required
        />
      </div>

      <div>
        <label>Game Description</label>
        <input
          name="description"
          value={Game.description}
          onChange={handleChange}
          placeholder="Game Description"
        />
      </div>
      <div>
        <label>Release Date</label>
        <DatePicker
          selected={Game.releaseDate}
          onChange={handleDateChange}
          dateFormat="MM/dd/yyyy"
        />
      </div>

      <div>
        <label>
          Upload Background Image?
          <input
            type="checkbox"
            name="useUpload"
            checked={Game.useUpload}
            onChange={handleChange}
          />
        </label>
      </div>

      {Game.useUpload ? (
        <div>
          <label>Upload Background Image</label>
          <input
            type="file"
            name="background"
            onChange={handleChange}
            accept="image/*"
          />
        </div>
      ) : (
        <div>
          <label>Background URL</label>
          <input
            type="text"
            name="background"
            value={Game.background.url}
            onChange={handleChange}
            placeholder="Enter image URL"
          />
        </div>
      )}
      <button type="submit">Add Game</button>
    </form>
  );
}
