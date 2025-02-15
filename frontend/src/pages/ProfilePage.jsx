import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

export default function ProfilePage() {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!user) return; 
    const token = localStorage.getItem("token");

    axios
      .get(`${API_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => setProfile(res.data))
      .catch(err => console.error("Profile error:", err));
  }, [user]);

  if (!user) return <p>Please log in to view your profile.</p>;

  return (
    <div className="text-center mt-10">
      <h1 className="text-2xl font-bold">Profile Page</h1>
      {profile ? (
        <div>
          <p>Username: {profile.username}</p>
          <p>Email: {profile.email}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
}
