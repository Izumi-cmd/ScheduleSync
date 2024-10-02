import React from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__title">
          ScheduleSync
        </Link>
      </div>
    </header>
  );
};

export default Header;
