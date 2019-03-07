import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import "./style.css";

function NavBar() {
  return (
    <div>
      <ul className="nav-list">
        <li>
          <Link to="/mytable">My Table</Link>
        </li>
        <li>
          <Link to="/account">My Account</Link>
        </li>
      </ul>
    </div>
  );
}
export default NavBar;
