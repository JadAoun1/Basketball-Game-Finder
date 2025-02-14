import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function GamesPage() {
  const [games, setGames] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios.get(`${API_URL}/games`)
      .then(res => setGames(res.data))
      .catch(err => console.error("Error fetching games:", err));
  }, []);

  return (
    <div className="text-center mt-10">
      <h1 className="text-3xl font-bold">Find a Pickup Game Near You</h1>
      <ul className="mt-5">
        {games.map(game => (
          <li key={game.id} className="bg-gray-200 p-3 my-2 rounded">
            <Link to={`/game/${game.id}`} className="text-blue-500 hover:underline">
              {game.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
