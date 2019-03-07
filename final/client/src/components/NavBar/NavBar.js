import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

function NavBar() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/mytable">My Table</Link>
        </li>
        <li>
          <Link to="/account">My Account</Link>
        </li>
      </ul>
      ))}
    </div>
  );
}
export default NavBar;
