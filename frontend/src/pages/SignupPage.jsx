import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function SignupPage() {
  const { signup } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [email, setEmail]     = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(username, email, password);
      setMessage("Signup successful! You are now logged in.");
    } catch (error) {
      console.error("Signup error:", error);
      setMessage("Signup failed. See console for details.");
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-3xl mb-4">Sign Up</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          className="border p-2"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-blue-500 text-white p-2 rounded" type="submit">
          Sign Up
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}
