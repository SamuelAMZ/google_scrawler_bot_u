// built in hooks
import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";

// react query
import { useQuery } from "react-query";
// third party dependencie
import ReCAPTCHA from "react-google-recaptcha";
// custom  hook
import notif from "../../helpers/notif";

const Login = () => {
  // initialise native hooks
  const navigate = useNavigate();
  const recaptchaRef = useRef();

  // login to site
  const [formInputs, setFormInputs] = useState({
    emailOrUsername: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  // captcha
  const [captchaState, setCaptachaState] = useState(false);
  const handleCaptcha = (e) => {
    if (e) {
      setCaptachaState(e);
    } else {
      setCaptachaState(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (
      formInputs.emailOrUsername !== "" &&
      formInputs.password !== "" &&
      !captchaState
    ) {
      return notif("Verify your fields and captcha");
    }

    setIsLoading(true);

    let data;

    // if user use email to login
    if (isAnEmail(formInputs.emailOrUsername)) {
      data = {
        emailOrUsername: formInputs.emailOrUsername.toLowerCase().trim(),
        password: formInputs.password.trim(),
        captcha: captchaState,
      };
    }

    // if user use username to login
    if (isAUsername(formInputs.emailOrUsername)) {
      data = {
        emailOrUsername: formInputs.emailOrUsername.trim(),
        password: formInputs.password.trim(),
        captcha: captchaState,
      };
    }

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
        `${process.env.REACT_APP_DOMAIN}/api/login`,
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

      // reset captcha if error
      await recaptchaRef.current.reset();
      setCaptachaState(false);

      if (serverMessage.code === "ok") {
        navigate("/home");
      }
    } catch (err) {
      notif("server error try again later");
      console.log(err);
      // reset captcha
      await recaptchaRef.current.reset();
      setCaptachaState(false);
      // stop loading
      setIsLoading(false);
    }
  };

  // check for email or username use for login
  // email
  const isAnEmail = (input) => {
    const inputSplited = input.split("");
    const emailSymbolFound = [];

    inputSplited.forEach((elm) => {
      if (elm === "@") {
        emailSymbolFound.push(1);
      }
    });

    if (emailSymbolFound.length > 0) {
      return true;
    } else {
      return false;
    }
  };
  // username
  const isAUsername = (input) => {
    const inputSplited = input.split("");
    const emailSymbolFound = [];

    inputSplited.forEach((elm) => {
      if (elm === "@") {
        emailSymbolFound.push(1);
      }
    });

    if (emailSymbolFound.length > 0) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <div className="login-f">
      <div className="login-container">
        <div className="heading">
          {/* logo */}
          <a
            href="https://takedownly.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="./img/logo.png" alt="" />
          </a>

          {/* login text */}
          <h2>Log in to the dashboard</h2>
        </div>

        {/* form */}
        <form onSubmit={handleLogin}>
          <label htmlFor="email">Email Or Username</label>
          <div className="inputs">
            <input
              id="email"
              type="text"
              placeholder="Email"
              className="input input-bordered input-primary w-full"
              value={formInputs.email}
              onChange={(e) =>
                setFormInputs({
                  emailOrUsername: e.target.value,
                  password: formInputs.password,
                })
              }
            />
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              className="input input-bordered input-primary w-full"
              value={formInputs.password}
              onChange={(e) =>
                setFormInputs({
                  emailOrUsername: formInputs.emailOrUsername,
                  password: e.target.value,
                })
              }
            />
            {/* recaptcha */}
            <label>Verify ReCaptcha</label>
            <ReCAPTCHA
              ref={recaptchaRef}
              className="thecaptcha"
              sitekey="6Lfm8XAkAAAAADhzzcEi2dYIG1SzARNBFIF0xsp5"
              onChange={handleCaptcha}
            />
          </div>

          {isLoading && (
            <button className="btn btn-primary loading">loading...</button>
          )}
          {!isLoading && <button className="btn btn-primary">Login</button>}
        </form>

        {/* other links */}
        <div className="other-links">
          <div className="quick">
            <Link to={"/register"}>New Account?</Link>
            <Link to={"/forgot-password"}>Forgot Password?</Link>
          </div>
          <a
            href="https://takedownly.comprivacy-and-cookie-policy"
            target="_blank"
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
