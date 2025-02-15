import { useState, useEffect } from "react";
import axios from "axios";

export default function GamesPage() {
  const [games, setGames] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios.get(`${API_URL}/games`)
      .then(res => setGames(res.data))
      .catch(err => console.error("Error fetching games:", err));
  }, []);

  return (
    <div>
      <h1>All Pickup Games</h1>
      <ul>
        {games.map(game => (
          <li key={game._id}>
            {game.title} - {game.location} ({game.date})
          </li>
        ))}
      </ul>
    </div>
  );
}
