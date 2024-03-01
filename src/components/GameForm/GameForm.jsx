import { useState } from 'react';

export default function GameForm({handleCreateGame}){
    const [Game, setGame] = useState({
        text:''
    })
    
  async function handleSubmit(evt) {
    handleCreateGame(Game);
    evt.preventDefault();
  }

  function handleChange(evt) {
    const gameForm = {...Game, [evt.target.name]: evt.target.value};
    setGame(gameForm);
  }

  return (
    <form onSubmit={handleSubmit}>
        <input 
        name="name"
        value={Game.name}
        onChange={handleChange}
        required
        />
        <input 
        name="description"
        value={Game.description}
        onChange={handleChange}
        required
        />
        <input 
        name="releaseDate"
        value={Game.releaseDate}
        onChange={handleChange}
        required
        />
        <input 
        name="background"
        value={Game.background}
        onChange={handleChange}
        required
        />
        <button type="Submit">Add Game</button>
    </form>
  )
  
}