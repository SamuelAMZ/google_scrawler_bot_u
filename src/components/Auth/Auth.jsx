import React, { useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// hooks
import notif from "../../helpers/notif";

// context
import UserContext from "../../contexts/UserContext";
import LoadingUserDataContect from "../../contexts/LoadingUserDataContext";

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, changeLogin } = useContext(UserContext);
  const { loading, changeLoading } = useContext(LoadingUserDataContect);

  // check if user is login or not function
  const checkLoginUser = async () => {
    // start loading
    changeLoading(true);

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
        `${process.env.REACT_APP_DOMAIN}/api/is-login`,
        {
          mode: "cors",
          method: "GET",
          headers: headers,
          credentials: "include",
        }
      );

      const serverMessage = await response.json();

      // if token not valid
      if (serverMessage.status === "false") {
        return { message: serverMessage.message, user: null };
      }
      if (serverMessage.status === "true") {
        return { message: serverMessage.message, user: serverMessage.user };
      }
    } catch (error) {
      notif("server error 'code: 001'");
      console.log(error);
    }
  };

  // check isLogin
  useEffect(() => {
    const check = async () => {
      const userData = await checkLoginUser();
      return userData;
    };

    check()
      .then((data) => {
        if (
          data.user === null &&
          location.pathname !== "/register" &&
          location.pathname !== "/forgot-password"
        ) {
          changeLogin(null);
          // stop loading
          changeLoading(false);

          notif("Need to login");
          // redirection to login page
          navigate("/");
        }
        if (data.user !== null) {
          // redirect to home if already login and still on the login page
          if (location.pathname === "/") {
            notif("Already login");
            navigate("/home");

            // stop loading
            changeLoading(false);
          } else {
            // set data globaly
            changeLogin(data.user);
            // stop loading
            changeLoading(false);
          }
        }
      })
      .catch((err) => {
        console.log(err);
        notif("server error 'code 002'");
      });
  }, []);

  return <></>;
};

export default Auth;
