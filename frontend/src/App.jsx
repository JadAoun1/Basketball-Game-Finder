import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import HomePage from "./pages/HomePage";
import GamesPage from "./pages/GamesPage";
import GameDetailsPage from "./pages/GameDetailsPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import CreateGamePage from "./pages/CreateGamePage";
import MyGamesPage from "./pages/MyGamesPage";
import SettingsPage from "./pages/SettingsPage";
import MessagesPage from "./pages/MessagesPage";

export default function App() {
  return (
    <div className="relative min-h-screen">
      {/* Sidebar is fixed */}
      <Sidebar />
      {/* Main content area */}
      <main className="pt-4 pb-4 px-4 md:pl-64">
        <div className="max-w-4xl mx-auto">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/games" element={<GamesPage />} />
            <Route path="/game/:id" element={<GameDetailsPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/create-game" element={<CreateGamePage />} />
            <Route path="/my-games" element={<MyGamesPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/messages" element={<MessagesPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
