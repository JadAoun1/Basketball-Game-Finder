import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function GameDetailsPage() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [game, setGame] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${API_URL}/games/${id}`)
      .then((res) => setGame(res.data))
      .catch((err) => console.error("Error fetching game details:", err));
  }, [id]);

  // Join game logic
  const handleJoin = async () => {
    if (!user) {
      alert("You must be logged in to join a game.");
      return navigate("/login");
    }

    try {
      await axios.post(
        `${API_URL}/games/${id}/join`,
        {}, // no body needed
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Joined game!");
      // Re-fetch the game to update UI
      const updatedRes = await axios.get(`${API_URL}/games/${id}`);
      setGame(updatedRes.data);
    } catch (err) {
      console.error("Join game error:", err);
      alert(err?.response?.data?.message || "Failed to join game.");
    }
  };

  if (!game) return <h1>Loading...</h1>;

  // If user is already in playersJoined, hide "Join" button
  const isJoined = user && game.playersJoined?.includes(user.id);

  return (
    <div>
      <h1>{game.title}</h1>
      <p>Location: {game.location}</p>
      <p>Date: {new Date(game.date).toLocaleString()}</p>
      <p>Players Needed: {game.playersNeeded}</p>
      <p>Joined Players: {game.playersJoined?.length ?? 0}</p>

      {/* Show Join button if user not joined yet */}
      {!isJoined && (
        <button onClick={handleJoin}>Join Game</button>
      )}
    </div>
  );
}
