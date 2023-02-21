import React, { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";

// contexts
import UserContext from "../../contexts/UserContext";

// icons
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineArrowDown,
} from "react-icons/ai";
import { IoFilter } from "react-icons/io5";
import { BsPlusLg } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";

// helpers
import postReq from "../../helpers/postReq";
import notif from "../../helpers/notif";

// react query
import { useQuery } from "react-query";

// import loading
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Table = ({ conf }) => {
  // contexts
  const { login, changeLogin } = useContext(UserContext);

  const [pageNumber, setPageNumber] = useState("0");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [removing, setRemoving] = useState(false);
  const location = useLocation();

  // get table data
  const handleTableData = async () => {
    // send req
    return await postReq(
      {
        uid: login?.id,
        page: pageNumber,
        perPage: conf.perPage,
        searchKeyword,
        target: conf.target,
      },
      "/api/pagination"
    );
  };

  const {
    data: tableData,
    isLoading: tableLoading,
    status,
    refetch: getPaginate,
    error,
  } = useQuery(
    [location.pathname, pageNumber, searchKeyword, conf.refresh, login],
    handleTableData,
    {
      refetchOnWindowFocus: false,
      enabled: true,
    }
  );

  //  handle next and prev
  const handleNext = () => {
    // check if page available
    if (
      Number(pageNumber) + 1 ===
      Math.ceil(tableData.payload.totalItemsLength / Number(conf.perPage))
    ) {
      // notif page end
      return;
    }

    // move page to next
    setPageNumber(String(Number(pageNumber) + 1));
  };

  const handlePrev = () => {
    // check if page available
    if (Number(pageNumber) === 0) {
      // notif page end
      return;
    }

    // move page to next
    setPageNumber(String(Number(pageNumber) - 1));
  };

  // handle search
  const handleSearch = (e) => {
    e.preventDefault();

    if (!searchKeyword) {
      return;
    }

    setPageNumber("0");
    getPaginate();
  };

  // remove items
  const handleRemove = async (e, target) => {
    const targetId = e.target.getAttribute("id");

    if (!targetId) {
      return notif("error removing item, retry later");
    }

    setRemoving(true);

    const reqData = {
      id: targetId.trim(),
      target: target.trim(),
    };

    // sending request
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
        `${process.env.REACT_APP_DOMAIN}/api/remove-table-item`,
        {
          mode: "cors",
          method: "POST",
          headers: headers,
          body: JSON.stringify(reqData),
          credentials: "include",
        }
      );

      const serverMessage = await response.json();

      if (serverMessage.code === "500") {
        console.log(serverMessage.message);
      }

      // set data
      if (serverMessage.code === "ok") {
        setRemoving(false);

        // show success message
        notif("removed successfully");

        // refresh table
        getPaginate();
      }
    } catch (err) {
      console.log(err);
      setRemoving(false);
    }
  };

  // add new link
  const [linkValue, setLinkValue] = useState("");
  const [addLinkLoading, setAddLinkloading] = useState(false);
  const addNewLink = async (e) => {
    e.preventDefault();

    setAddLinkloading(true);

    // send uploaded url to backend
    const backendData = {
      uid: login.id,
      url: linkValue,
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
        `${process.env.REACT_APP_DOMAIN}/api/linktoskip`,
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

      // stop uploading state
      setAddLinkloading(false);
      // empty input
      setLinkValue("");
      // refresh table
      getPaginate();
    } catch (err) {
      notif("server error try again later");
      console.log(err);
      // stop uploading state
      setAddLinkloading(false);
    }
  };

  // add new domain
  const [domainValue, setDomainValue] = useState("");
  const [addDomainLoading, setAddDomainloading] = useState(false);
  const addNewDomain = async (e) => {
    e.preventDefault();

    setAddDomainloading(true);

    // send uploaded url to backend
    const backendData = {
      uid: login.id,
      url: domainValue,
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
        `${process.env.REACT_APP_DOMAIN}/api/domaintoskip`,
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

      // stop uploading state
      setAddDomainloading(false);
      // empty input
      setDomainValue("");
      // refresh table
      getPaginate();
    } catch (err) {
      notif("server error try again later");
      console.log(err);
      // stop uploading state
      setAddDomainloading(false);
    }
  };

  // report a new leak
  const [reporLeakData, setReporLeakData] = useState({
    website: "",
    date: "",
    desc: "",
  });
  const [reportLeakLoading, setReportLeakLoading] = useState(false);
  const updateData = (e, type) => {
    if (type === "website") {
      setReporLeakData({ ...reporLeakData, website: e.target.value });
    }
    if (type === "date") {
      setReporLeakData({ ...reporLeakData, date: e.target.value });
    }
    if (type === "desc") {
      setReporLeakData({ ...reporLeakData, desc: e.target.value });
    }
  };
  const addNewLeak = async (e) => {
    e.preventDefault();

    setReportLeakLoading(true);

    // send uploaded url to backend
    const backendData = {
      uid: login.id,
      ...reporLeakData,
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
        `${process.env.REACT_APP_DOMAIN}/api/report-leak`,
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

      // stop uploading state
      setReportLeakLoading(false);
      // empty input
      setReporLeakData({
        website: "",
        date: "",
        desc: "",
      });
      // refresh table
      getPaginate();
    } catch (err) {
      notif("server error try again later");
      console.log(err);
      // stop uploading state
      setReportLeakLoading(false);
    }
  };

  // add new domain
  const [usernameValue, setUsernameValue] = useState("");
  const [usernameValueLoading, setUsernameValueLoading] = useState(false);
  const addNewUsername = async (e) => {
    e.preventDefault();

    setUsernameValueLoading(true);

    // send uploaded url to backend
    const backendData = {
      uid: login.id,
      username: usernameValue,
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
        `${process.env.REACT_APP_DOMAIN}/api/newusername`,
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

      // stop uploading state
      setUsernameValueLoading(false);
      // empty input
      setUsernameValue("");
      // refresh table
      getPaginate();
    } catch (err) {
      notif("server error try again later");
      console.log(err);
      // stop uploading state
      setUsernameValueLoading(false);
    }
  };

  return (
    <div className="overflow-x-auto table-container">
      {/* header */}
      <div
        className={
          conf && conf.target !== "searches"
            ? "table-header expand-search"
            : "table-header"
        }
      >
        {/* header buttons */}
        <div className="actions">
          {location.pathname === "/report-leak" && (
            <label htmlFor="newleakmodal" className="btn btn-primary">
              <BsPlusLg /> <p>Report a new leak</p>
            </label>
          )}
          {location.pathname === "/settings/domains" && (
            <label htmlFor="whitlistdomain" className="btn btn-primary">
              <BsPlusLg /> <p>Add new</p>
            </label>
          )}
          {location.pathname === "/settings/links" && (
            <label htmlFor="whitlistlink" className="btn btn-primary">
              <BsPlusLg /> <p>Add new</p>
            </label>
          )}
          {location.pathname === "/usernames" && (
            <label htmlFor="usernamelink" className="btn btn-primary">
              <BsPlusLg /> <p>Add new</p>
            </label>
          )}

          {tableData && tableData.code === "ok" && (
            <p>{tableData.payload.totalItemsLength} items</p>
          )}
        </div>

        {/* domains */}
        <div className="search">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search in table"
              className="input input-bordered w-full"
              value={searchKeyword}
              onChange={(e) => {
                setPageNumber("0");
                setSearchKeyword(e.target.value);
              }}
            />
            <button className="btn btn-primary">
              <FiSearch />
            </button>
          </form>
        </div>
      </div>

      {/* table */}
      <table className="table table-zebra w-full">
        {/* thead*/}

        {conf && conf.target === "history" ? (
          <thead>
            <tr>
              <th>plan</th>
              <th>Status</th>
              <th>Type</th>
              <th>Start Date</th>
              <th>End Date</th>
            </tr>
          </thead>
        ) : (
          <thead>
            <tr>
              <th>Items</th>
              <th></th>
            </tr>
          </thead>
        )}

        <tbody>
          {/* loading */}
          {tableLoading &&
            new Array(Number(conf.perPage)).fill("").map((elm, idx) => {
              return (
                <tr key={idx}>
                  <SkeletonTheme baseColor="#8b8b8b35" highlightColor="#f9fafb">
                    <td>
                      <Skeleton count={1} />
                    </td>
                    <td>
                      <Skeleton count={1} />
                    </td>
                    <td>
                      <Skeleton count={1} />
                    </td>
                    <td>
                      <Skeleton count={1} />
                    </td>
                    <td>
                      <Skeleton count={1} />
                    </td>
                    <td>
                      <Skeleton count={1} />
                    </td>
                  </SkeletonTheme>
                </tr>
              );
            })}

          {/* error on nothing found */}
          {error && (
            <>
              <div className="nodata">
                <img src="/img/nodata.png" alt="no data found" />
                <h3>No record found yet</h3>
              </div>
            </>
          )}
          {tableData?.payload === "nothing" && (
            <>
              <div className="nodata">
                <img src="/img/nodata.png" alt="no data found" />
                <h3>No record found yet</h3>
              </div>
            </>
          )}

          {/* actual data */}
          {/* domains*/}
          {tableData &&
            conf.target === "domains" &&
            tableData.code === "ok" &&
            tableData.payload.list.map((elm, idx) => {
              return (
                <tr key={idx}>
                  <td>
                    {elm.domains.substr(0, 27)}
                    {elm.domains.length >= 27 && "..."}
                  </td>
                  <td>
                    {removing ? (
                      <button
                        id={elm._id}
                        className="btn btn-primary btn-sm small-remove"
                        disabled
                      >
                        Remove
                      </button>
                    ) : (
                      <button
                        id={elm._id}
                        onClick={(e) => handleRemove(e, "domains")}
                        className="btn btn-primary btn-sm small-remove"
                      >
                        Remove
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}

          {/* urls */}
          {tableData &&
            conf.target === "urls" &&
            tableData.code === "ok" &&
            tableData.payload.list.map((elm, idx) => {
              return (
                <tr key={idx}>
                  <td>
                    {elm.url.substr(0, 27)}
                    {elm.url.length >= 27 && "..."}
                  </td>
                  <td>
                    {removing ? (
                      <button
                        id={elm._id}
                        className="btn btn-primary btn-sm small-remove"
                        disabled
                      >
                        Remove
                      </button>
                    ) : (
                      <button
                        id={elm._id}
                        onClick={(e) => handleRemove(e, "urls")}
                        className="btn btn-primary btn-sm small-remove"
                      >
                        Remove
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}

          {/* report leak */}
          {tableData &&
            conf.target === "report" &&
            tableData.code === "ok" &&
            tableData.payload.list.map((elm, idx) => {
              return (
                <tr key={idx}>
                  <td>
                    {elm.website.substr(0, 27)}
                    {elm.website.length >= 27 && "..."}
                    <span>
                      {elm.desc.substr(0, 27)}
                      {elm.desc.length >= 27 && "..."}
                    </span>
                  </td>
                  <td>
                    {removing ? (
                      <button
                        id={elm._id}
                        className="btn btn-primary btn-sm small-remove"
                        disabled
                      >
                        Remove
                      </button>
                    ) : (
                      <button
                        id={elm._id}
                        onClick={(e) => handleRemove(e, "report")}
                        className="btn btn-primary btn-sm small-remove"
                      >
                        Remove
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}

          {/* history leak */}
          {tableData &&
            conf.target === "history" &&
            tableData.code === "ok" &&
            tableData.payload.list.map((elm, idx) => {
              return (
                <tr key={idx}>
                  <td>
                    {elm.plan?.substr(0, 12)}
                    {elm.plan?.length >= 12 && "..."}
                  </td>
                  <td>
                    {elm.status.substr(0, 12)}
                    {elm.status.length >= 12 && "..."}
                  </td>
                  <td>
                    {elm.recuringType.substr(0, 12)}
                    {elm.recuringType.length >= 12 && "..."}
                  </td>
                  <td>
                    {elm.start.substr(0, 12)}
                    {elm.start.length >= 12 && "..."}
                  </td>
                  <td>
                    {elm.end.substr(0, 12)}
                    {elm.end.length >= 12 && "..."}
                  </td>
                </tr>
              );
            })}

          {/* usernames */}
          {tableData &&
            conf.target === "usernames" &&
            tableData.code === "ok" &&
            tableData.payload.list.map((elm, idx) => {
              return (
                <tr key={idx}>
                  <td>{elm.username.substr(0, 27)}</td>
                  <td>
                    {removing ? (
                      <button
                        id={elm._id}
                        className="btn btn-primary btn-sm small-remove"
                        disabled
                      >
                        Remove
                      </button>
                    ) : (
                      <button
                        id={elm._id}
                        onClick={(e) => handleRemove(e, "usernames")}
                        className="btn btn-primary btn-sm small-remove"
                      >
                        Remove
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      {/* footer */}
      <div className="table-footer">
        {tableData && tableData.code === "ok" && (
          <div className="elms">
            <button className="btn" onClick={handlePrev}>
              Previous
            </button>
            <p>
              Page {Number(pageNumber) + 1} of{" "}
              {Math.ceil(
                tableData.payload.totalItemsLength / Number(conf.perPage)
              )}
            </p>

            <button className="btn" onClick={handleNext}>
              Next
            </button>
          </div>
        )}
      </div>

      {/* popups */}
      <div className="popups">
        {/*add new leak */}
        <input type="checkbox" id="newleakmodal" className="modal-toggle" />
        <label htmlFor="newleakmodal" className="modal cursor-pointer">
          <label className="modal-box relative" htmlFor="">
            <h3 className="text-lg font-bold">Report a new leak</h3>
            <form className="popup-form" onSubmit={addNewLeak}>
              <label htmlFor="website">Website</label>
              <div className="inputs">
                <input
                  id="website"
                  type="text"
                  placeholder="Website where the leak wher found"
                  className="input input-bordered w-full"
                  value={reporLeakData.website}
                  onChange={(e) => updateData(e, "website")}
                />
              </div>
              <label htmlFor="date">Date</label>
              <div className="inputs">
                <input
                  id="date"
                  type="text"
                  placeholder="When did you find the leak?"
                  className="input input-bordered w-full"
                  value={reporLeakData.date}
                  onChange={(e) => updateData(e, "date")}
                />
              </div>
              <label htmlFor="desc">Description (optional) </label>
              <div className="inputs">
                <textarea
                  id="desc"
                  type="text"
                  placeholder="Any note?"
                  className="textarea textarea-bordered w-full"
                  value={reporLeakData.desc}
                  onChange={(e) => updateData(e, "desc")}
                />
              </div>
              {reportLeakLoading ? (
                <button className="btn btn-primary w-full mt-3 loading">
                  Sending...
                </button>
              ) : (
                <button className="btn btn-primary w-full mt-3">Send</button>
              )}
            </form>
          </label>
        </label>
        {/*whitelist domain */}
        <input type="checkbox" id="whitlistdomain" className="modal-toggle" />
        <label htmlFor="whitlistdomain" className="modal cursor-pointer">
          <label className="modal-box relative" htmlFor="">
            <h3 className="text-lg font-bold">add new</h3>
            <form className="popup-form" onSubmit={addNewDomain}>
              <label htmlFor="website">Domain Name</label>
              <div className="inputs">
                <input
                  id="website"
                  type="text"
                  placeholder="google.com"
                  className="input input-bordered w-full"
                  value={domainValue}
                  onChange={(e) => setDomainValue(e.target.value)}
                />
              </div>
              {addDomainLoading ? (
                <button className="btn btn-primary w-full mt-3 loading">
                  Adding...
                </button>
              ) : (
                <button className="btn btn-primary w-full mt-3">add</button>
              )}
            </form>
          </label>
        </label>
        {/*whitelist link */}
        <input type="checkbox" id="whitlistlink" className="modal-toggle" />
        <label htmlFor="whitlistlink" className="modal cursor-pointer">
          <label className="modal-box relative" htmlFor="">
            <h3 className="text-lg font-bold">add new</h3>
            <form className="popup-form" onSubmit={addNewLink}>
              <label htmlFor="website">Link URL</label>
              <div className="inputs">
                <input
                  id="website"
                  type="text"
                  placeholder="https://pornhub.com/example"
                  className="input input-bordered w-full"
                  required
                  value={linkValue}
                  onChange={(e) => setLinkValue(e.target.value)}
                />
              </div>
              {addLinkLoading ? (
                <button className="btn btn-primary w-full mt-3 loading">
                  Adding...
                </button>
              ) : (
                <button className="btn btn-primary w-full mt-3">add</button>
              )}
            </form>
          </label>
        </label>
        {/*usernames link */}
        <input type="checkbox" id="usernamelink" className="modal-toggle" />
        <label htmlFor="usernamelink" className="modal cursor-pointer">
          <label className="modal-box relative" htmlFor="">
            <h3 className="text-lg font-bold">add new</h3>
            <form className="popup-form" onSubmit={addNewUsername}>
              <label htmlFor="website">Your username</label>
              <div className="inputs">
                <input
                  id="website"
                  type="text"
                  placeholder="myusername"
                  className="input input-bordered w-full"
                  required
                  value={usernameValue}
                  onChange={(e) => setUsernameValue(e.target.value)}
                />
              </div>
              {usernameValueLoading ? (
                <button className="btn btn-primary w-full mt-3 loading">
                  Adding...
                </button>
              ) : (
                <button className="btn btn-primary w-full mt-3">add</button>
              )}
            </form>
          </label>
        </label>
      </div>
    </div>
  );
};

export default Table;
