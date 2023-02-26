// built in hooks
import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";

// react query
import { useQuery } from "react-query";
// third party dependencie
import ReCAPTCHA from "react-google-recaptcha";
// custom  hook
import postReq from "../../helpers/postReq";
import notif from "../../helpers/notif";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const recaptchaRef = useRef();

  // login to site
  const [formInputs, setFormInputs] = useState({
    emailOrUsername: "",
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

    // check if an element from form is empty
    if (!formInputs.emailOrUsername || !captchaState) {
      console.log("error");
      notif("verify inputs and captcha");
      return;
    }

    setIsLoading(true);

    let data = { ...formInputs, captcha: captchaState };

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
        `${process.env.REACT_APP_DOMAIN}/api/new-hash`,
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

      // reset captcha
      await recaptchaRef.current.reset();
      setCaptachaState(false);

      if (serverMessage.code === "ok") {
        navigate("/reset-pass-success");
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
          <h2>Request Password Reset</h2>
        </div>

        {/* form */}
        <form onSubmit={handleLogin}>
          <div className="inputs">
            <label htmlFor="email">Email Or Username</label>
            <input
              id="email"
              type="text"
              placeholder="Email or Username"
              className="input input-bordered input-primary w-full"
              value={formInputs.emailOrUsername}
              onChange={(e) =>
                setFormInputs({
                  emailOrUsername: e.target.value,
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
          {!isLoading && (
            <button className="btn btn-primary">Reset Password</button>
          )}
        </form>

        {/* other links */}
        <div className="other-links">
          <div className="quick">
            <Link to={"/register"}>New Account?</Link>
            <Link to={"/"}>Login?</Link>
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

export default ForgotPassword;
