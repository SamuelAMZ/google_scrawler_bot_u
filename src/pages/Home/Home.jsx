import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

// components
import Auth from "../../components/Auth/Auth";
import Header from "../../components/Header/Header";

// contexts
import UserContext from "../../contexts/UserContext";
import LoadingUserDataContect from "../../contexts/LoadingUserDataContext";

// icons
import { AiFillCheckCircle } from "react-icons/ai";
import { GrUpdate } from "react-icons/gr";
import { IoMdStats } from "react-icons/io";
import { TbReport } from "react-icons/tb";
import { BsEnvelope, BsChatLeftDots, BsCardChecklist } from "react-icons/bs";
import { RiImageAddLine } from "react-icons/ri";
import { FiUserPlus } from "react-icons/fi";

// import loading
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Home = () => {
  const tableConf = { perPage: "7", target: "searches" };
  const { login, changeLogin } = useContext(UserContext);
  const { loading, changeLoading } = useContext(LoadingUserDataContect);

  return (
    <>
      <Auth />

      <Header page={"Home"} />
      {/* home */}

      <div className="centerer home-page">
        {loading && (
          <SkeletonTheme baseColor="#8b8b8b35" highlightColor="#f9fafb">
            <Skeleton height={20} count={1} />
          </SkeletonTheme>
        )}

        {!loading && (
          <h1>
            Welcome to your dashboard <span>{login?.name}</span>
          </h1>
        )}

        <div className="home-container">
          {/* top desc */}
          <div className="first-section">
            {/* overview */}
            <div className="section-jd">
              <h2>Overview</h2>

              <div className="stats-container-jd overview-jd">
                <Link to="/billing">
                  <div className="stat-jd">
                    <div
                      className="overlay-jd"
                      style={{ backgroundImage: 'url("/img/bgc.png")' }}
                    ></div>
                    <IoMdStats />
                    <div className="text-jd">
                      <p>Current plan</p>
                      {/* if is loqding just sghow the loader */}
                      {loading && (
                        <SkeletonTheme
                          baseColor="#8b8b8b35"
                          highlightColor="#f9fafb"
                        >
                          <Skeleton height={20} count={1} />
                        </SkeletonTheme>
                      )}

                      {!loading && (
                        <p className="desc first-descs">{login?.planType}</p>
                      )}
                    </div>
                  </div>
                </Link>
                <Link to="/billing">
                  <div className="stat-jd">
                    <GrUpdate />
                    <div>
                      <p>Next Renewal Date</p>
                      {/* if is loqding just sghow the loader */}
                      {loading && (
                        <SkeletonTheme
                          baseColor="#8b8b8b35"
                          highlightColor="#f9fafb"
                        >
                          <Skeleton height={20} count={1} />
                        </SkeletonTheme>
                      )}

                      {!loading && (
                        <p className="desc first-descs">{login?.nextDue}</p>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            {/* quick links */}
            <div className="section-jd">
              <h2>Quick links</h2>

              <div className="stats-container-jd quick-jd">
                <Link to="/legal-documents">
                  <div className="stat-jd">
                    <RiImageAddLine />
                    <div>
                      <p>Legal documents</p>
                      <p className="desc">
                        Upload Your Legal Documents For Verification
                      </p>
                    </div>
                  </div>
                </Link>
                <Link to="/settings/links">
                  <div className="stat-jd">
                    <BsCardChecklist />
                    <div>
                      <p>Whitelist</p>
                      <p className="desc">
                        Add Domains And URLs You Don’t Want Us To Remove
                      </p>
                    </div>
                  </div>
                </Link>
                <Link to="/report-leak">
                  <div className="stat-jd">
                    <TbReport />
                    <div>
                      <p>Report a leak</p>
                      <p className="desc">
                        Did you find a leak somewhere? Report it to us!
                      </p>
                    </div>
                  </div>
                </Link>
                <Link to="/usernames">
                  <div className="stat-jd">
                    <FiUserPlus />
                    <div>
                      <p>Usernames</p>
                      <p className="desc">
                        Update Your List Of Protected Usernames
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            {/* support */}
            <div className="section-jd">
              <h2>Support</h2>

              <div className="stats-container-jd">
                <a href="mailto:support@takedownly.com">
                  <div className="stat-jd">
                    <BsEnvelope />
                    <div>
                      <p>Email Us</p>
                      <p className="desc">support@takedownly.com</p>
                    </div>
                  </div>
                </a>
                <div
                  className="stat-jd chat-block"
                  onClick={() => global.$crisp.push(["do", "chat:open"])}
                >
                  <BsChatLeftDots />
                  <div>
                    <p>Chat</p>
                    <p className="desc">Start a live chat with us now</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* side note */}
          <div className="account-details second-section">
            {/* {login && ( */}
            <ul className="section-features">
              {loading && (
                <SkeletonTheme baseColor="#8b8b8b35" highlightColor="#f9fafb">
                  <Skeleton height={20} count={1} />
                </SkeletonTheme>
              )}

              {!loading && <h3>{login?.planType} Plan Features</h3>}

              {loading && (
                <SkeletonTheme baseColor="#8b8b8b35" highlightColor="#f9fafb">
                  <Skeleton height={20} count={1} />
                  <Skeleton height={20} count={1} />
                  <Skeleton height={20} count={1} />
                </SkeletonTheme>
              )}

              {!loading &&
                login?.planFeatures.map((elm, idx) => {
                  return (
                    <li>
                      <AiFillCheckCircle /> <p>{elm}</p>
                    </li>
                  );
                })}
            </ul>
            <Link to="/billing">
              <button className="btn btn-primary w-full">Upgrade</button>
            </Link>
            {/* )} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
