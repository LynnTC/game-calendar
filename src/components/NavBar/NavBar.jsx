import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';
import './NavBar.css';

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <nav className='cyber-glitch-0'>
      <div className="left-links">
        <Link to="/">Home</Link>
        &nbsp;&nbsp;
        <Link to="/calendar">Personal Calendar</Link>
      </div>
      <div className="right-links">
        {user ? (
          <>
            <span>Welcome, {user.name}</span>
            &nbsp;&nbsp;<Link to="" onClick={handleLogOut} className="logout">Log Out</Link>
          </>
        ) : (
          <Link to="/login">Log In or Sign Up</Link>
        )}
      </div>
    </nav>
  );
}

