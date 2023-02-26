import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

// component
import Auth from "../Auth/Auth";

// icons
import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { FiExternalLink, FiUserPlus } from "react-icons/fi";
import { FaMoneyCheck } from "react-icons/fa";
import { VscReport } from "react-icons/vsc";
import { RiImageAddLine } from "react-icons/ri";
import { BsImage, BsCardChecklist } from "react-icons/bs";

const Sidebar = () => {
  // loaction
  const location = useLocation();

  const [allowed, setAllowed] = useState(false);
  useEffect(() => {
    if (
      location.pathname === "/" ||
      location.pathname.includes("/404") ||
      location.pathname.includes("/register") ||
      location.pathname.includes("/reset-pass") ||
      location.pathname.includes("/forgot-password")
    ) {
      setAllowed(false);
    } else {
      setAllowed(true);
    }
  }, [location.pathname]);

  return (
    <>
      <Auth />
      {allowed && (
        <>
          <div className="sidebar">
            {/* heading */}
            <div className="heading">
              <Link to={"/home"}>
                {/* logo */}
                <img src="/img/logo.png" alt="" />
              </Link>
            </div>

            {/* menu elements */}
            <ul className="menu-container">
              <Link to={"/home"}>
                <li
                  className={location.pathname === "/home" ? "active-menu" : ""}
                >
                  <div className="icon-wrap">
                    <AiOutlineHome />
                  </div>
                  <p>Home</p>
                </li>
              </Link>

              <Link to={"/legal-documents"}>
                <li
                  className={
                    location.pathname === "/legal-documents"
                      ? "active-menu"
                      : ""
                  }
                >
                  <div className="icon-wrap">
                    <RiImageAddLine />
                  </div>
                  <p>Legal Documents</p>
                </li>
              </Link>
              <Link to={"/settings/links"}>
                <li
                  className={
                    location.pathname.includes("/settings") ? "active-menu" : ""
                  }
                >
                  <div className="icon-wrap">
                    <BsCardChecklist />
                  </div>
                  <p>Whitelist</p>
                </li>
              </Link>
              <Link to={"/report-leak"}>
                <li
                  className={
                    location.pathname.includes("/report-leak")
                      ? "active-menu"
                      : ""
                  }
                >
                  <div className="icon-wrap">
                    <VscReport />
                  </div>
                  <p>Report A Leak</p>
                </li>
              </Link>

              {/* separator */}
              <span className="seperator-element"></span>

              <Link to={"/billing"}>
                <li
                  className={
                    location.pathname.includes("/billing") ? "active-menu" : ""
                  }
                >
                  <div className="icon-wrap">
                    <FaMoneyCheck />
                  </div>
                  <p>Billing</p>
                </li>
              </Link>

              <Link to={"/account"}>
                <li
                  className={
                    location.pathname === "/account" ||
                    location.pathname === "/account/update"
                      ? "active-menu"
                      : ""
                  }
                >
                  <div className="icon-wrap">
                    <AiOutlineUser />
                  </div>
                  <p>Account Settings</p>
                </li>
              </Link>

              {/* logout */}
              <Link to={"/logout"} className="logout">
                <li>
                  <FiExternalLink />
                  <p>Logout</p>
                </li>
              </Link>
            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default Sidebar;
