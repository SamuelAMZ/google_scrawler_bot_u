import React, { useState, useContext } from "react";

// hook
import notif from "../../helpers/notif";

// contexts
import UserContext from "../../contexts/UserContext";
import LoadingUserDataContect from "../../contexts/LoadingUserDataContext";

// components
import Header from "../../components/Header/Header";

// icons
import { RiImageAddLine } from "react-icons/ri";
import { BsPatchCheckFill } from "react-icons/bs";

// import loading
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LegalDoc = () => {
  // contexts
  const { login, changeLogin } = useContext(UserContext);
  const { loading, changeLoading } = useContext(LoadingUserDataContect);

  // states
  const [uploading, setUploading] = useState(false);

  // upload images
  const uploadImages = async (e) => {
    e.preventDefault();

    // start uploading state
    setUploading(true);

    const url = "https://api.cloudinary.com/v1_1/ddjkkh3wy/image/upload";

    const files = document.querySelector("[type=file]").files;

    // restrict files size
    let MAXFILESIZE = 5;
    let found = [];
    Array.from(files).forEach((elm) => {
      if (elm.size / 1024 / 1000 > MAXFILESIZE) {
        found.push(1);
      }
    });
    if (found.length >= 1) {
      notif(`files must be less than ${MAXFILESIZE}MB`);
      return;
    }

    const formData = new FormData();

    try {
      for (let i = 0; i < files.length; i++) {
        let file = files[i];
        formData.append("file", file);
        formData.append("upload_preset", "j802g3wt");

        const send = await fetch(url, {
          method: "POST",
          body: formData,
        });
        const data = await send.json();

        console.log(data);

        // send uploaded url to backend
        const backendData = {
          uid: login.id,
          url: data.secure_url,
        };

        // send request
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
            `${process.env.REACT_APP_DOMAIN}/api/uploadid`,
            {
              mode: "cors",
              method: "POST",
              headers: headers,
              body: JSON.stringify(backendData),
              credentials: "include",
            }
          );

          const serverMessage = await response.json();
          notif(serverMessage.message);
          // updae user
          changeLogin({ ...login, legalStatus: "verifying..." });
          // stop uploading state
          setUploading(false);
        } catch (err) {
          notif("server error try again later");
          console.log(err);
          // stop uploading state
          setUploading(false);
        }
      }
    } catch (error) {
      console.log(error);
      // stop uploading state
      setUploading(false);
    }

    //
  };

  return (
    <div className="legal-wraper ">
      <Header page={"Legal Documents"} />

      {/* page */}
      <div className="centerer">
        {/* note */}
        <div className="upload-widget">
          <p className="heading">Identity verification</p>
          <p className="head">
            Please upload a clear selfie holding your ID next to your face. It
            must clearly show your face and ID. Facebook, Instagram, and Twitter
            require proof of identification in order to remove impersonating
            content. We do not share this information anywhere else and the
            files are hosted in a secure database.
          </p>

          <div className="quick-links-dashboard">
            <div className="link-jd">
              <RiImageAddLine />
              <div>
                <p>ID and Facial photo verification</p>
                <p className="desc">
                  Upload a selfie holding your ID next to your face
                </p>
                <form encType="multipart/form-data">
                  <input
                    id="imageupload"
                    type="file"
                    name="files[]"
                    onChange={uploadImages}
                  />
                  {/* if is loqding just sghow the loader */}
                  {loading && (
                    <SkeletonTheme
                      baseColor="#8b8b8b35"
                      highlightColor="#f9fafb"
                    >
                      <Skeleton height={20} count={1} />
                    </SkeletonTheme>
                  )}

                  {/* uplod not started */}
                  {!loading &&
                    login &&
                    !uploading &&
                    login.legalStatus === "false" && (
                      <label className="unpload-text" htmlFor="imageupload">
                        Upload Now
                      </label>
                    )}

                  {/* uploding */}
                  {uploading && (
                    <label className="unpload-text">Uploading...</label>
                  )}

                  {/* finish uploading */}
                  {!loading &&
                    login &&
                    (login.legalStatus === "true" ||
                      login.legalStatus === "verifying...") && (
                      <label className="unpload-text green">Uploaded</label>
                    )}
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="status-widget">
          <p className="heading">Status</p>
          <p className="head">Your document verification status</p>
          <ul>
            {loading && (
              <SkeletonTheme baseColor="#8b8b8b35" highlightColor="#f9fafb">
                <Skeleton height={20} count={1} />
              </SkeletonTheme>
            )}
            {login?.legalStatus === "true" && (
              <li className="done">
                <BsPatchCheckFill />
                <div>
                  <p>ID & Face verification</p>
                  <p>Done!</p>
                </div>
              </li>
            )}
            {login?.legalStatus === "verifying..." && (
              <li className="done">
                <BsPatchCheckFill />
                <div>
                  <p>ID & Face verification</p>
                  <p>
                    Verifying your upload, will notify you if everything is
                    OK...
                  </p>
                </div>
              </li>
            )}
            {login?.legalStatus === "false" && (
              <li className="notdone">
                <BsPatchCheckFill />
                <div>
                  <p>ID & Face verification</p>
                  <p>Not Started!</p>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LegalDoc;
