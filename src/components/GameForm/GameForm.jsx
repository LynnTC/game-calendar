import { useState } from 'react';
import DatePicker from 'react-datepicker';
import "./GameForm.css"
import * as gamesAPI from '../../utilities/games-api';

export default function GameForm({}) {
  const [Game, setGame] = useState({
    name: '',
    description: '',
    releaseDate: '',
    useUpload: false,
    backgroundImage: '',
  });

  const handleCreateGame = async () => {
    try {
      const createdGame = await gamesAPI.createGame(Game);
      console.log('Game created:', createdGame);
    } catch (error) {
      console.error('Error creating game:', error);
    }
  };

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const createdGame = await gamesAPI.createGame(Game);
      handleCreateGame(createdGame);
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
      setGame({ ...Game, [name]: checked });
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
          Use Background Image URL
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
            name="backgroundImage"
            onChange={handleChange}
            accept="image/*"
          />
        </div>
      ) : (
        <div>
          <label>Background Image URL</label>
          <input
            type="text"
            name="backgroundImage"
            value={Game.backgroundImage}
            onChange={handleChange}
            placeholder="Enter image URL"
          />
        </div>
      )}
      <button type="submit">Add Game</button>
    </form>
  );
}
