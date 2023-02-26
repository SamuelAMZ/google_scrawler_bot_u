// built in hooks
import { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";

// react query
import { useQuery } from "react-query";
// third party dependencie
import ReCAPTCHA from "react-google-recaptcha";
// custom  hook
import postReq from "../../helpers/postReq";
import notif from "../../helpers/notif";

const ResetPassword = () => {
  const params = useParams();
  // login to site
  const [formInputs, setFormInputs] = useState({
    password: "",
  });

  // useQuery from React query
  const handlePostrequest = async () => {
    // sending data for validation and login to backend
    const inputData = { ...formInputs, uid: params.uid, uHash: params.hash };

    // post request
    return await postReq(inputData, "/api/reset-password");
  };

  const {
    data,
    isLoading,
    refetch: sendPost,
  } = useQuery(["reset-pass-jd"], handlePostrequest, {
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const handleLogin = (e) => {
    e.preventDefault();

    // check if an element from form is empty
    if (!formInputs.password) {
      console.log("error");
      notif("verify inputs");
      return;
    }

    // send req
    sendPost();
  };

  // after check credentials
  const navigate = useNavigate();
  useEffect(() => {
    // redirect to 2fa hash page
    if (data && data.code === "ok") {
      navigate(`/`);
    }
    if (data && data.code === "bad") {
      notif(data.message);
    }
  }, [data]);

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
          <h2>Reset Password</h2>
        </div>

        {/* form */}
        <form onSubmit={handleLogin}>
          <div className="inputs">
            <label htmlFor="email">New Password</label>
            <input
              id="email"
              type="text"
              placeholder="********"
              className="input input-bordered input-primary w-full"
              value={formInputs.password}
              onChange={(e) =>
                setFormInputs({
                  password: e.target.value,
                })
              }
            />
            <label htmlFor="email">Repeat Password</label>
            <input
              id="email"
              type="text"
              placeholder="********"
              className="input input-bordered input-primary w-full"
            />
          </div>

          {isLoading && (
            <button className="btn btn-primary loading">loading...</button>
          )}
          {!isLoading && (
            <button className="btn btn-primary">Reset Password</button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
