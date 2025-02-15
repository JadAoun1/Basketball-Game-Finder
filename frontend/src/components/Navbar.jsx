import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext"; 

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Optional: function to handle logout + redirect
  const handleLogout = () => {
    logout();
    navigate("/"); 
  };

  return (
    <nav className="bg-blue-500 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">Game Finder</h1>
        <div className="space-x-4">
          <Link className="text-white" to="/">Home</Link>
          <Link className="text-white" to="/games">Games</Link>
          <Link className="text-white" to="/create-game">Create</Link>
          <Link className="text-white" to="/profile">Profile</Link>
          <Link className="text-white" to="/settings">Settings</Link>

          {user ? (
            
            <button onClick={handleLogout} className="text-white bg-red-600 px-3 py-1 rounded">
              Logout
            </button>
          ) : (
            
            <>
              <Link className="text-white" to="/login">Login</Link>
              <Link className="text-white" to="/signup">Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
