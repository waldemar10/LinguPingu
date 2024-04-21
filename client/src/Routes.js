import { Route, Routes, Navigate } from "react-router-dom";
import Landing from "./pages/LandingPage";
import Login from "./pages/LoginPage";
import Registration from "./pages/RegistrationPage";
import Home from "./pages/HomePage";
import Vocabulary from "./pages/Vocabulary";
import Profile from "./pages/ProfilePage";
import Learn from "./pages/Learn";
import MemoryGame from "./pages/MemoryGame";
import CreateVocabCard from "./pages/CreateVocabCard";
import CreateCollection from "./pages/CreateCollection";
import Grammar from "./pages/Grammar/GrammarHub";
import Lessons from "./pages/Grammar/Lessons";
import Settings from "./pages/Settings";
import EditCard from "./pages/EditVocabulary";
import EditCollection from "./pages/EditCollection";
import TimeAttackGame from "./pages/TimeAttackGame";
import GamesPage from "./pages/GamesPage";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/landing" replace />} />
      <Route path="/landing" exact element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/home" element={<Home />} />
      <Route path="/vocabulary" element={<Vocabulary />} />
      <Route path="/vocabulary/learn" element={<Learn />} />
      <Route path="/vocabulary/createCard" element={<CreateVocabCard />} />
      <Route path="/vocabulary/editCard" element={<EditCard />} />
      <Route path="/vocabulary/editCollection" element={<EditCollection />} />
      <Route path="/games" element={<GamesPage />} />
      <Route path="/games/memory" element={<MemoryGame />} />
      <Route path="/games/timeAttack" element={<TimeAttackGame />} />
      <Route path="/settings" element={<Settings />} />
      <Route
        path="/vocabulary/createCollection"
        element={<CreateCollection />}
      />
      <Route path="/profile" element={<Profile />} />
      <Route path="/grammar" element={<Grammar />} />
      {/*  <Route path="/grammar/:targetLanguage/:selectedTab" element={<Grammar />} /> */}
      <Route
        path="/grammar/:lessonIndex/:grammarIndex/"
        element={<Lessons />}
      />
    </Routes>
  );
}
