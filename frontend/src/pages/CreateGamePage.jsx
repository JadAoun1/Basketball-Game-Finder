import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function CreateGamePage() {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [playersNeeded, setPlayersNeeded] = useState(10);
  const API_URL = import.meta.env.VITE_API_URL;

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("You must be logged in to create a game.");
      return;
    }
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(`${API_URL}/games`, {
        title, location, date, playersNeeded,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Game created successfully!");
      // maybe redirect or clear form
    } catch (err) {
      console.error("Error creating game:", err);
      alert("Failed to create game.");
    }
  };

  return (
    <form onSubmit={handleCreate}>
      <h1>Create a New Game</h1>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
      <input value={location} onChange={e => setLocation(e.target.value)} placeholder="Location" />
      <input type="date" value={date} onChange={e => setDate(e.target.value)} placeholder="Date" />
      <input
        type="number"
        value={playersNeeded}
        onChange={e => setPlayersNeeded(e.target.value)}
      />
      <button type="submit">Create Game</button>
    </form>
  );
}
