import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import NavBar from '../../components/NavBar/NavBar';
import HomeCalendar from '../HomeCalendar/HomeCalendar';
import UserCalendar from '../UserCalendar/UserCalendar';


export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
      <>
        <NavBar user={user} setUser={setUser} />
        <Routes>
          {/* Route components in here */}
          <Route path="/calendar/users" element={<UserCalendar />} />
          <Route path="/login" element={<AuthPage />} />
        </Routes>
      </>
        <HomeCalendar />
    </main>
  );
}
