import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function LoginPage() {
  const { login } = useContext(AuthContext);  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();          
    try {
      await login(email, password);
      alert("Login successful!");
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Check console for details.");
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-3xl mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="border p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="bg-blue-500 text-white p-2 rounded" type="submit">
          Log In
        </button>
      </form>
    </div>
  );
}
