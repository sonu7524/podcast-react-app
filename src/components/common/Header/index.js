import React from "react";
import "./styles.css";
import { Link, useLocation } from "react-router-dom";
import TemporaryDrawer from "./drawer";

function Header() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="navbar">
      <div className="gradient"></div>
      <div className="links">
        <Link to="/signup" className={currentPath == "/signup" ? "active" : ""}>
          Signup
        </Link>
        <Link
          to="/podcasts"
          className={currentPath == "/podcasts" ? "active" : ""}
        >
          Podcasts
        </Link>
        <Link
          to="/create-a-podcast"
          className={currentPath == "/create-a-podcast" ? "active" : ""}
        >
          Start A Podcast
        </Link>
        <Link
          to="/profile"
          className={currentPath == "/profile" ? "active" : ""}
        >
          Profile
        </Link>
      </div>
      <div className="mobile-drawer">
          <TemporaryDrawer />
      </div>
    </div>
  );
}

export default Header;
