import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Acceuil from "./components/Acceuil";
import Entries from "./components/Entries";
import Exits from "./components/Exits";
import Stats from "./components/Stats";
import Footer from "./components/Footer";
import Edit from "./components/Edit";
import useReminders from "./hooks/useReminder";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCourriers, setLoading } from './store/courrierSlice';
import axios from 'axios';

export default function App() {
  useReminders();
   const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setLoading(true));
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/courriers`)
            .then(res => {
                dispatch(setCourriers(res.data));
                dispatch(setLoading(false));
            })
            .catch(err => {
                console.error(err);
                dispatch(setLoading(false));
            });
    }, []);
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
       <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Acceuil />} />
          <Route path="/Entries" element={<Entries />} />
          <Route path="/Exits" element={<Exits />} />
          <Route path="/Stats" element={<Stats />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>
       </main>
      <Footer />
    </div>
  );
}
