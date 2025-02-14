import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function GameDetailsPage() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios.get(`${API_URL}/game/${id}`)
      .then(res => setGame(res.data))
      .catch(err => console.error("Error fetching game details:", err));
  }, [id]);

  if (!game) return <h1 className="text-3xl text-center mt-10">Loading...</h1>;

  return (
    <div className="text-center mt-10">
      <h1 className="text-3xl font-bold">{game.name}</h1>
      <p className="text-lg mt-2">📍 Location: {game.location}</p>
    </div>
  );
}
