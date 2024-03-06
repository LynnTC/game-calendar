import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as gamesAPI from '../../utilities/games-api';
import './GameDetail.css';

export default function GameDetail() {
  const [game, setGame] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const game = await gamesAPI.getGameById(id);
        setGame(game);

      } catch (error) {
        console.error('Error fetching game details:', error);
      }
    };

    fetchGameDetails();
  }, [id]);

  if (!game) return null;

  return (
    <div>
      <h2>{game.name}</h2>
      <p>Release Date: {game.releaseDate}</p>
      <img className="gameart" src={`${game.background.url}`} alt="" />
    </div>
  );
}
