import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CharactersList from "./components/CharacterList";
import CharacterDetails from "./components/CharacterDetails";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 text-gray-900">
        <Routes>
          <Route path="/" element={<CharactersList />} />
          <Route path="/character/:id" element={<CharacterDetails />} />
        </Routes>
      </div>
    </Router>
  );
}
