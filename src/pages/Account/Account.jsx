import React, { useContext, useEffect } from "react";

import { Outlet, Link, useLocation } from "react-router-dom";

// componenets
import Header from "../../components/Header/Header";
import Auth from "../../components/Auth/Auth";

// contexts
import UserContext from "../../contexts/UserContext";
import LoadingUserDataContect from "../../contexts/LoadingUserDataContext";

// icons
import { BsLock, BsCardChecklist } from "react-icons/bs";
import { HiOutlineLogout } from "react-icons/hi";
import { FaMoneyCheck } from "react-icons/fa";
import { RiImageAddLine } from "react-icons/ri";
import { FiUserPlus } from "react-icons/fi";

// import loading
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Account = () => {
  const location = useLocation();
  const { login, changeLogin } = useContext(UserContext);
  const { loading, changeLoading } = useContext(LoadingUserDataContect);

  return (
    <>
      <Auth />
      <Header page={"Account"} />
      <div className="centerer account-container">
        {/* memu */}
        <div className="tabs menu-tab-parent">
          <Link to={"/account"}>
            <a
              className={
                location.pathname === "/account"
                  ? "tab tab-bordered tab-active"
                  : "tab tab-bordered "
              }
            >
              Your account
            </a>
          </Link>
          {/* <Link to={"/account/update"}>
            <a
              className={
                location.pathname === "/account/update"
                  ? "tab tab-bordered tab-active"
                  : "tab tab-bordered "
              }
            >
              Update Account
            </a>
          </Link> */}

          <a
            href="/forgot-password"
            className={
              location.pathname === "/account/new-account"
                ? "tab tab-bordered tab-active"
                : "tab tab-bordered "
            }
          >
            Reset Password
          </a>
        </div>

        {/* your account  */}
        {location.pathname === "/account" && (
          <div className="account">
            {/* <div className="your-account"> */}
            {/* change name */}
            {/* <div className="change change-name">
                <label htmlFor="keyword">Change Name</label>
                <form>
                  <input
                    id="keyword"
                    type="text"
                    placeholder="name"
                    className="input input-bordered w-full"
                  />
                  <button className="btn btn-primary">Update</button>
                </form>
              </div> */}

            {/* change email */}
            {/* <div className="change change-email">
                <label htmlFor="email">Change email</label>
                <form>
                  <input
                    id="email"
                    type="text"
                    placeholder="email"
                    className="input input-bordered w-full"
                  />
                  <button className="btn btn-primary">Update</button>
                </form>
              </div> */}
            {/* </div> */}

            {/* quick account links */}
            <div className="quick-links-dashboard">
              <Link to={"/forgot-password"}>
                <div className="link-jd">
                  <BsLock />
                  <div>
                    <p>Password Reset</p>
                    <p className="desc">Change Your Password</p>
                  </div>
                </div>
              </Link>
              <Link to={"/logout"}>
                <div className="link-jd">
                  <HiOutlineLogout />
                  <div>
                    <p>Logout</p>
                    <p className="desc">Logout to close your current session</p>
                  </div>
                </div>
              </Link>
              <Link to={"/usernames"}>
                <div className="link-jd">
                  <FiUserPlus />
                  <div>
                    <p>Usernames</p>
                    <p className="desc">
                      Update Your List Of Protected Usernames
                    </p>
                  </div>
                </div>
              </Link>
              <Link to={"/billing"}>
                <div className="link-jd">
                  <FaMoneyCheck />
                  <div>
                    <p>Upgrade Plan</p>
                    <p className="desc">
                      Upgrade Your Plan To Get More Protection
                    </p>
                  </div>
                </div>
              </Link>
              <Link to={"/legal-documents"}>
                <div className="link-jd">
                  <RiImageAddLine />
                  <div>
                    <p>Legal Documents</p>
                    <p className="desc">
                      Upload your legal documents for verification
                    </p>
                  </div>
                </div>
              </Link>
              <Link to={"/settings/links"}>
                <div className="link-jd">
                  <BsCardChecklist />
                  <div>
                    <p>Whitelist</p>
                    <p className="desc">Update your whitelist</p>
                  </div>
                </div>
              </Link>
            </div>

            <div className="account-details">
              {/* {login && ( */}
              <ul>
                <h3>Account overview</h3>
                {loading && (
                  <SkeletonTheme baseColor="#8b8b8b35" highlightColor="#f9fafb">
                    <Skeleton height={20} count={1} />
                    <Skeleton height={20} count={1} />
                    <Skeleton height={20} count={1} />
                    <Skeleton height={20} count={1} />
                    <Skeleton height={20} count={1} />
                    <Skeleton height={20} count={1} />
                  </SkeletonTheme>
                )}
                {!loading && (
                  <>
                    <li>
                      <span>Name:</span> {login.name}
                    </li>
                    <li>
                      <span>Email:</span> {login.email}
                    </li>
                    <li>
                      <span>Curren Plan:</span> {login.planType}
                    </li>
                    <li>
                      <span>Username: </span>
                      {login.usernamesArray.map((elm, idx) => {
                        return elm + ",";
                      })}
                    </li>
                    <li>
                      <span>Legal Docs Status:</span> {login.legalStatus}
                    </li>
                    <li>
                      <span>Registration Date:</span> {login.date.split("T")[0]}
                    </li>
                  </>
                )}
              </ul>
              {/* )} */}
            </div>
          </div>
        )}

        {/* outlet */}
        {location.pathname !== "/account" && <Outlet />}
      </div>
    </>
  );
};

export default Account;
