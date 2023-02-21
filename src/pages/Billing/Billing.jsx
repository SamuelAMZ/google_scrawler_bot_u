import React, { useContext } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";

// components
import Header from "../../components/Header/Header";
import Pricing from "./sub/PricingComp";

// contexts
import UserContext from "../../contexts/UserContext";
import LoadingUserDataContect from "../../contexts/LoadingUserDataContext";

// icons
import { GrUpdate } from "react-icons/gr";
import { IoMdStats } from "react-icons/io";
import { FaMoneyCheck } from "react-icons/fa";
import { HiOutlineReceiptRefund } from "react-icons/hi";

// import loading
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Billing = () => {
  const { login, changeLogin } = useContext(UserContext);
  const { loading, changeLoading } = useContext(LoadingUserDataContect);
  const location = useLocation();

  return (
    <>
      <Header page={"Billing"} />

      <div className="centerer">
        {/* memu */}
        <div className="tabs menu-tab-parent">
          <Link to={"/billing"}>
            <a
              className={
                location.pathname === "/billing"
                  ? "tab tab-bordered tab-active"
                  : "tab tab-bordered "
              }
            >
              Plans Details
            </a>
          </Link>

          <Link
            to={"/billing/payment-history"}
            className={
              location.pathname === "/billing/payment-history"
                ? "tab tab-bordered tab-active"
                : "tab tab-bordered "
            }
          >
            {" "}
            Payment History
          </Link>
        </div>

        {/* plan description */}
        {location.pathname === "/billing" && (
          <div className="billings">
            {/* current plan and next due */}
            <div className="billing-elm">
              <h3>Actual Plan Details</h3>
              <div className="quick-links-dashboard">
                <div className="link-jd top">
                  <IoMdStats />
                  <div>
                    <p>Current Plan</p>
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

                <div className="link-jd top">
                  <GrUpdate />
                  <div>
                    <p>Next Due</p>
                    {loading && (
                      <SkeletonTheme
                        baseColor="#8b8b8b35"
                        highlightColor="#f9fafb"
                      >
                        <Skeleton height={20} count={1} />
                      </SkeletonTheme>
                    )}

                    {!loading && <p className="desc">{login?.nextDue}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* actions: update payment method, request refund */}
            <div className="billing-elm">
              <h3>Billing Actions</h3>
              <div className="quick-links-dashboard">
                <a href="https://billing.stripe.com/p/login/aEUg2GaHyctId9ucMM">
                  <div className="link-jd">
                    <FaMoneyCheck />
                    <div>
                      <p>Update payment method</p>
                      <p className="desc">
                        Update your credit card details, or add new
                      </p>
                    </div>
                  </div>
                </a>

                <div className="link-jd">
                  <HiOutlineReceiptRefund />
                  <div>
                    <p>Request refund</p>
                    <p className="desc">Request us a refund</p>
                  </div>
                </div>
              </div>
            </div>

            {/* pricing plans */}
            <div className="billing-elm">
              <h3>Upgrade Plan</h3>
              <Pricing />
            </div>
          </div>
        )}

        {/* outlet */}
        <Outlet />
      </div>
    </>
  );
};

export default Billing;
