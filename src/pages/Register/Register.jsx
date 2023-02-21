// built in hooks
import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";

// third party dependencie
import ReCAPTCHA from "react-google-recaptcha";
// custom  hook
import notif from "../../helpers/notif";

const Ragister = () => {
  // initialise native hooks
  const navigate = useNavigate();
  const recaptchaRef = useRef();

  // Ragister to site
  const [formInputs, setFormInputs] = useState({
    name: "",
    username: "",
    email: "",
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

    // check if an element from form is empty
    if (
      !formInputs.name ||
      !formInputs.email ||
      !formInputs.password ||
      !formInputs.username ||
      !captchaState
    ) {
      console.log("error");
      notif("verify inputs and captcha");
      return;
    }

    // verify if username don't have spaces and special caracters
    let format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (format.test(formInputs.username)) {
      return notif("verify username no space, no special characters");
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
        `${process.env.REACT_APP_DOMAIN}/api/register`,
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

  return (
    <div className="login-f">
      <div className="login-container">
        <div className="heading">
          {/* logo */}
          <a
            href="https://takedownly.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="./img/logo.png" alt="" />
          </a>

          {/* register text */}
          <h2>Register to the site</h2>
        </div>

        {/* form */}
        <form onSubmit={handleLogin}>
          <div className="inputs">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              placeholder="Username"
              className="input input-bordered input-primary w-full"
              value={formInputs.username}
              onChange={(e) =>
                setFormInputs({
                  name: formInputs.name,
                  username: e.target.value,
                  email: formInputs.email,
                  password: formInputs.password,
                })
              }
            />
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Name"
              className="input input-bordered input-primary w-full"
              value={formInputs.name}
              onChange={(e) =>
                setFormInputs({
                  name: e.target.value,
                  username: formInputs.username,
                  email: formInputs.email,
                  password: formInputs.password,
                })
              }
            />
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              placeholder="Email"
              className="input input-bordered input-primary w-full"
              value={formInputs.email}
              onChange={(e) =>
                setFormInputs({
                  name: formInputs.name,
                  username: formInputs.username,
                  email: e.target.value,
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
                  name: formInputs.name,
                  username: formInputs.username,
                  email: formInputs.email,
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
          {!isLoading && <button className="btn btn-primary">Register</button>}
        </form>

        {/* other links */}
        <div className="other-links">
          <div className="quick">
            <Link to={"/"}>Login?</Link>
            <a
              className="privacy"
              href="https://takedownly.netlify.app/privacy-and-cookie-policy"
              target="_blank"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ragister;
