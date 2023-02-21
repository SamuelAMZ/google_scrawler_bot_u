import React, { useContext } from "react";

// contexts
import MenuOpenContext from "../../contexts/MenuOpen";

// components
import Sidemenu from "../Sidemenu/Sidemenu";

// icons
import { HiOutlineMenuAlt3 } from "react-icons/hi";

const Header = ({ page }) => {
  const { menuOpen, changeMenuOpen } = useContext(MenuOpenContext);

  return (
    <div className="header-container">
      <div className="header-elm">
        {/* hello */}
        <h2>{page}</h2>
        {/* new btn */}
        <a href="/report-leak">
          <button className="btn">Report A Leak</button>
        </a>
        {/* sidemenu */}
        <div className="mobile-menu-icon" onClick={() => changeMenuOpen(true)}>
          <HiOutlineMenuAlt3 className="icon" />
        </div>
        {menuOpen && <Sidemenu />}
      </div>
    </div>
  );
};

export default Header;
