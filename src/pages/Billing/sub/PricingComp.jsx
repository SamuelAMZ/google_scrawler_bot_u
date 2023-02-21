// react
import { useState, useContext } from "react";

// icons
import {
  AiFillCheckCircle,
  AiTwotoneStar,
  AiOutlineInfoCircle,
} from "react-icons/ai";

// helpers
import notif from "../../../helpers/notif";

// contexts
import UserContext from "../../../contexts/UserContext";
import LoadingUserDataContect from "../../../contexts/LoadingUserDataContext";

const Pricing = () => {
  const { login, changeLogin } = useContext(UserContext);
  const { loading, changeLoading } = useContext(LoadingUserDataContect);

  const [mode, setMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // handle checkouts
  const handleCheckout = async (type) => {
    const data = {
      uid: login.id,
      ...type,
    };

    try {
      let headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Accept", "application/json");
      headers.append("GET", "POST", "OPTIONS");
      headers.append(
        "Access-Control-Allow-Origin",
        `${process.env.REACT_APP_DOMAIN}`
      );
      headers.append("Access-Control-Allow-Credentials", "true");

      const response = await fetch(
        `${process.env.REACT_APP_DOMAIN}/api/checkout`,
        {
          mode: "cors",
          method: "POST",
          headers: headers,
          body: JSON.stringify(data),
          credentials: "include",
        }
      );

      const serverMessage = await response.json();
      notif(serverMessage.message);
      setIsLoading(false);

      if (serverMessage.code === "ok") {
        window.location.replace(serverMessage.payload);
      }
    } catch (err) {
      notif("server error try again later");
      console.log(err);

      // stop loading
      setIsLoading(false);
    }
  };

  return (
    <div
      id="pricing"
      className="pricing-wraper md:max-w-7xl xl:max-w-screen-xl mx-auto px-5 py-5"
    >
      <div className="pricing-box">
        <div className="pricing-box-price">
          {/* pricing prices head */}
          <div className="pricing-box-price-head">
            <p>Monthly</p>
            <input
              type="checkbox"
              className="toggle toggle-primary"
              value={mode}
              onChange={(e) => setMode(e.target.checked)}
            />
            <p>Quarterly</p>
            <span className="hidden md:block">22% OFF</span>
          </div>

          {/* pricing body */}
          <div className="pricing-body">
            {/* beginner */}
            <div className="pricing-elm">
              <div className="pricing-elm-head">
                <h3>Beginner</h3>
                {mode ? (
                  <h4>
                    $200 <span>Per quarter</span>
                  </h4>
                ) : (
                  <h4>
                    $60 <span>Per month</span>
                  </h4>
                )}
              </div>
              <div className="pricing-elm-body">
                <div className="elm-notice">
                  <span>Features</span>
                </div>
                <ul className="elm-features">
                  <li>
                    <AiFillCheckCircle />{" "}
                    <p>Unlimited Google Search Delisting</p>{" "}
                  </li>
                  <li>
                    <AiFillCheckCircle /> <p>Weekly Email Reports</p>{" "}
                  </li>
                  <li>
                    <AiFillCheckCircle /> <p>1 User Name</p>{" "}
                  </li>
                  <li>
                    <AiFillCheckCircle /> <p>Anonymity</p>{" "}
                  </li>
                </ul>
                {loading && (
                  <button className="btn btn-primary loading">Choose</button>
                )}
                {/* quaterly btn */}
                {!loading && mode && (
                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      handleCheckout({
                        price: "price_1Mdtv7JDj7UFNjnGu3aPU1lP",
                        plan: "beginner",
                        recuringType: "quaterly",
                        features:
                          "Unlimited Google Search Delisting,Weekly Email Reports,1 User Name,Anonymity",
                      })
                    }
                  >
                    Choose
                  </button>
                )}
                {/* monthly btn */}
                {!loading && !mode && (
                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      handleCheckout({
                        price: "price_1Mdtv7JDj7UFNjnGW8MiIPVe",
                        plan: "beginner",
                        recuringType: "monthly",
                        features:
                          "Unlimited Google Search Delisting,Weekly Email Reports,1 User Name,Anonymity",
                      })
                    }
                  >
                    Choose
                  </button>
                )}
              </div>
            </div>

            {/* basic */}
            <div className="pricing-elm">
              {/* most popular widget */}
              <div className="most-popular">
                <AiTwotoneStar />
                <span>Most Popular</span>
              </div>
              <div className="pricing-elm-head">
                <h3>Basic</h3>
                {mode ? (
                  <h4>
                    $400 <span>Per quarter</span>
                  </h4>
                ) : (
                  <h4>
                    $150 <span>Per month</span>
                  </h4>
                )}
              </div>
              <div className="pricing-elm-body">
                <div className="elm-notice">
                  <span>Features</span>
                  <p>All the benefits of Beginner, and:</p>
                </div>
                <ul className="elm-features">
                  <li>
                    <AiFillCheckCircle />{" "}
                    <p>
                      Lawyer drafted DMCA Takedowns sent directly to pirates
                    </p>{" "}
                  </li>
                  <li>
                    <AiFillCheckCircle />{" "}
                    <p>
                      Lawyer drafted Cease and Desists sent directly to pirates
                    </p>{" "}
                  </li>
                  <li>
                    <AiFillCheckCircle /> <p>24/7 Web Crawler</p>{" "}
                  </li>
                  <li>
                    <AiFillCheckCircle /> <p>Daily Email Reports</p>{" "}
                  </li>
                  <li>
                    <AiFillCheckCircle /> <p>5 User Names</p>{" "}
                  </li>
                </ul>
                {loading && (
                  <button className="btn btn-primary loading">Choose</button>
                )}
                {/* quaterly btn */}
                {!loading && mode && (
                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      handleCheckout({
                        price: "price_1MdyjIJDj7UFNjnGtYFXZ2Ce",
                        plan: "start",
                        recuringType: "quaterly",
                        features:
                          "Lawyer Drafted DMCA Takedowns Sent Directly To Pirates,Lawyer Drafted Cease And Desists Sent Directly To Pirates,24/7 Web Crawler,Daily Email Reports,5 User Names",
                      })
                    }
                  >
                    Choose
                  </button>
                )}
                {/* monthly btn */}
                {!loading && !mode && (
                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      handleCheckout({
                        price: "price_1MdyjIJDj7UFNjnGQsPhDXYi",
                        plan: "start",
                        recuringType: "monthly",
                        features:
                          "Lawyer Drafted DMCA Takedowns Sent Directly To Pirates,Lawyer Drafted Cease And Desists Sent Directly To Pirates,24/7 Web Crawler,Daily Email Reports,5 User Names",
                      })
                    }
                  >
                    Choose
                  </button>
                )}
              </div>
            </div>

            {/* pro */}
            <div className="pricing-elm pro">
              <div className="pricing-elm-head">
                <h3>Pro</h3>
                {mode ? (
                  <h4>
                    $800 <span>Per quarter</span>
                  </h4>
                ) : (
                  <h4>
                    $300 <span>Per month</span>
                  </h4>
                )}
              </div>
              <div className="pricing-elm-body">
                <div className="elm-notice">
                  <span>Features</span>
                  <p className="p-pro">All the greatness of Basic, and:</p>
                </div>
                <ul className="elm-features pro-elm">
                  <li>
                    <AiFillCheckCircle />{" "}
                    <p>
                      We optimally post compelling content teasers across Reddit
                      and Twitter
                    </p>{" "}
                  </li>
                  <li>
                    <AiFillCheckCircle />{" "}
                    <p>
                      Interact and respond to your fans in your style across all
                      platforms
                    </p>{" "}
                  </li>
                  <li>
                    <AiFillCheckCircle />{" "}
                    <p>Organically drive traffic to your paid websites</p>{" "}
                  </li>
                </ul>
                {loading && (
                  <button className="btn btn-primary loading">Choose</button>
                )}
                {/* quaterly btn */}
                {!loading && mode && (
                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      handleCheckout({
                        price: "price_1Mdym9JDj7UFNjnGPMvioQxP",
                        plan: "pro",
                        recuringType: "quaterly",
                        features:
                          "All the greatness of Basic, and,We Optimally Post Compelling Content Teasers Across Reddit And Twitter,Interact And Respond To Your Fans In Your Style Across All Platforms,Organically Drive Traffic To Your Paid Websites",
                      })
                    }
                  >
                    Choose
                  </button>
                )}
                {/* monthly btn */}
                {!loading && !mode && (
                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      handleCheckout({
                        price: "price_1Mdym9JDj7UFNjnGA0bNCSAo",
                        plan: "pro",
                        recuringType: "monthly",
                        features:
                          "All the greatness of Basic and,We Optimally Post Compelling Content Teasers Across Reddit And Twitter,Interact And Respond To Your Fans In Your Style Across All Platforms,Organically Drive Traffic To Your Paid Websites",
                      })
                    }
                  >
                    Choose
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* pricing footer */}
        <div className="pricing-footer">
          <AiOutlineInfoCircle />
          <h3>30-day money-back guarantee - Cancel anytime .</h3>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
