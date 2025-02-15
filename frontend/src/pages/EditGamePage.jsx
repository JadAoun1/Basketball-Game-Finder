import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function EditGamePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [game, setGame] = useState(null); // store the full game object
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [playersNeeded, setPlayersNeeded] = useState(10);

  const API_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!user) {
      alert("You must be logged in to edit a game.");
      return;
    }

    // Fetch existing game data
    axios
      .get(`${API_URL}/games/${id}`)
      .then((res) => {
        setGame(res.data);
        setTitle(res.data.title);
        setLocation(res.data.location);
        // slice(0,10) helps us format the date for <input type="date">
        setDate(res.data.date.slice(0, 10));
        setPlayersNeeded(res.data.playersNeeded);
      })
      .catch((err) => console.error("Fetch game error:", err));
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${API_URL}/games/${id}`,
        {
          title,
          location,
          date,
          playersNeeded,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Game updated successfully!");
      navigate("/games");
    } catch (err) {
      console.error("Update game error:", err);
      alert("Failed to update game.");
    }
  };

  // DELETE button logic
  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/games/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Game deleted successfully!");
      navigate("/games"); // redirect to the games list
    } catch (err) {
      console.error("Delete game error:", err);
      alert("Failed to delete game.");
    }
  };

  // If the game object hasn't loaded yet, show a loading state
  if (!game) {
    return <h1>Loading...</h1>;
  }

  // If the user is not the creator, hide the delete button
  const isCreator = game.creatorId === user?.id;

  return (
    <form onSubmit={handleUpdate}>
      <h1>Edit Game</h1>
      <div>
        <label>Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>

      <div>
        <label>Location</label>
        <input value={location} onChange={(e) => setLocation(e.target.value)} />
      </div>

      <div>
        <label>Date</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>

      <div>
        <label>Players Needed</label>
        <input
          type="number"
          value={playersNeeded}
          onChange={(e) => setPlayersNeeded(e.target.value)}
        />
      </div>

      <button type="submit">Save Changes</button>

      {/* Show "Delete" button only if this user is the creator */}
      {isCreator && (
        <button type="button" onClick={handleDelete} style={{ marginLeft: "10px" }}>
          Delete Game
        </button>
      )}
    </form>
  );
}
