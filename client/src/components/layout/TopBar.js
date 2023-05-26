import React, { useState } from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../authentication/SignOutButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faDumbbell, faChartBar, faUserLock } from '@fortawesome/free-solid-svg-icons';

const TopBar = ({ user }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  let fullName
  if (user) {
    fullName = `${user.firstName} ${user.lastName}`
  } else {
    fullName = null
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const unauthenticatedListItems = [
    <li key="sign-in">
      <div className="menu-item">
        <Link to="/user-sessions/new">
          Sign In
        </Link>
      </div>
    </li>,
    <li key="sign-up">
      <div className="menu-item">
        <Link to="/users/new" className="menu-item">
          Sign Up
        </Link>
      </div>
    </li>,
  ];
  
  const authenticatedListItems = [
    <li className="fullName" key="fullName">
      <Link to="/profile" className="menu-item">
        Account
      </Link>
    </li>,
    <li key="sign-out" className="menu-item">
      <SignOutButton />
    </li>,
  ];

  return (
    <div className="top-bar-container">
      <div className="sidebar">
        <ul className="menu">
          <li>
            <Link to="/">
              <FontAwesomeIcon icon={faHome} />
            </Link>
          </li>
          <li>
            <Link to="/workouts">
              <FontAwesomeIcon icon={faDumbbell} />
            </Link>
          </li>
          <li>
            <Link to="/dashboard">
              <FontAwesomeIcon icon={faChartBar} />
            </Link>
          </li>
        </ul>
      </div>
      <div className="user-menu">
        <ul className="menu">
          <li onClick={toggleMenu} className="user-icon" >
            <FontAwesomeIcon icon={faUserLock} />
          </li>
          {menuOpen && (
            <div className="user-menu-items">
              {user ? authenticatedListItems : unauthenticatedListItems}
            </div>
          )}
          
        </ul>
      </div>
    </div>
  );
};

export default TopBar;
