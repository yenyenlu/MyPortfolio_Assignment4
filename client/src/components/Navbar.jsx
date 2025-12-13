import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Navbar(){
  const { isAuthed, logout } = useAuth()

  return (
    <nav className="navbar">
      <div className="logo" title="Yan Lu"><span style={{fontWeight:800}}>YL</span></div>
      <ul className="nav-links">
        <li><NavLink to="/" end>Home</NavLink></li>
        <li><NavLink to="/about">About</NavLink></li>
        <li><NavLink to="/projects">Projects</NavLink></li>
        <li><NavLink to="/services">Services</NavLink></li>
        <li><NavLink to="/contact">Contact</NavLink></li>
        <li className="spacer" />
        {isAuthed ? (
          <>
            <li><NavLink to="/profile">Profile</NavLink></li>
            <li><button className="link-btn" onClick={logout}>Sign Out</button></li>
          </>
        ) : (
          <>
            <li><NavLink to="/signin">Sign In</NavLink></li>
            <li><NavLink to="/signup">Sign Up</NavLink></li>
          </>
        )}
      </ul>
    </nav>
  )
}