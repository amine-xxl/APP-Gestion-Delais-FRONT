import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Acceuil from "./components/Acceuil";
import Entries from "./components/Entries";
import Exits from "./components/Exits";
import Stats from "./components/Stats";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Acceuil />} />
          <Route path="/Entries" element={<Entries />} />
          <Route path="/Exits" element={<Exits />} />
          <Route path="/Stats" element={<Stats />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
