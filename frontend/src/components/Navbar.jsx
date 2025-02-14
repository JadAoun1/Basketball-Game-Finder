import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">🏀 Game Finder</h1>
        <div className="space-x-4">
          <Link className="text-white" to="/">Home</Link>
          <Link className="text-white" to="/games">Games</Link>
          <Link className="text-white" to="/create-game">Create</Link>
          <Link className="text-white" to="/profile">Profile</Link>
          <Link className="text-white" to="/settings">Settings</Link>
        </div>
      </div>
    </nav>
  );
}
