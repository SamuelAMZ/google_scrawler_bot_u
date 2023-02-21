import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
// css tailwind
import "./styles/tailwind.css";
// css components
import "./styles/index.min.css";
// react query
import { QueryClient, QueryClientProvider } from "react-query";
// auths
import Auth from "./components/Auth/Auth";
// components
import Sidebar from "./components/Sidebar/Sidebar";
// pages
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import NotFound from "./pages/404/NotFound";
import Home from "./pages/Home/Home";
import Billing from "./pages/Billing/Billing";
import LegalDoc from "./pages/LegalDoc/LegalDoc";
import Account from "./pages/Account/Account";
import Settings from "./pages/Settings/Settings";
import ReportLeak from "./pages/ReportLeak/ReportLeak";
import Usernames from "./pages/Usernames/Usernames";
import Logout from "./pages/Logout/Logout";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import Success from "./pages/ResetPassword/Success";

// subpages
import Domains from "./pages/Settings/Domains/Domains";
import Links from "./pages/Settings/Links/Links";
import PaymentHistory from "./pages/Billing/PaymentHistory/PaymentHistory";

// contexts
import { UserProvider } from "./contexts/UserContext";
import { LoadingUserDataProvider } from "./contexts/LoadingUserDataContext";
import { MenuOpenProvider } from "./contexts/MenuOpen";

// live chat widget
import { Crisp } from "crisp-sdk-web";

const App = () => {
  // react query
  const client = new QueryClient();

  // load crisp chat widget
  useEffect(() => {
    Crisp.configure("3f85b7f8-2a37-4a0e-ab6d-556042a375f1");
  }, []);

  return (
    <>
      <QueryClientProvider client={client}>
        <>
          {/* auth */}
          {/* <Auth /> */}

          {/* component code */}
          <div className="site-container">
            <div className="notif"></div>

            <UserProvider>
              <LoadingUserDataProvider>
                <MenuOpenProvider>
                  {/* sidebar */}
                  <Sidebar />

                  {/* main */}
                  <div className="main">
                    <Routes>
                      {/* auth pages */}
                      <Route path="/" exact element={<Login />} />
                      <Route path="/register" exact element={<Register />} />
                      <Route
                        path="/forgot-password"
                        exact
                        element={<ForgotPassword />}
                      />

                      {/* dashboad pages */}
                      <Route path="/home" element={<Home />} />
                      <Route path="/billing" element={<Billing />}>
                        <Route
                          path="/billing/payment-history"
                          element={<PaymentHistory />}
                        />
                      </Route>
                      <Route path="/legal-documents" element={<LegalDoc />} />
                      <Route path="/report-leak" element={<ReportLeak />} />
                      <Route path="/usernames" element={<Usernames />} />
                      <Route path="/settings" element={<Settings />}>
                        <Route path="/settings/domains" element={<Domains />} />
                        <Route path="/settings/links" element={<Links />} />
                      </Route>
                      <Route path="/account" element={<Account />}></Route>
                      <Route path="/logout" element={<Logout />} />
                      <Route
                        path="/reset-pass/:uid/:hash"
                        element={<ResetPassword />}
                      />
                      <Route path="/reset-pass-success" element={<Success />} />

                      {/* 404 */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </div>
                </MenuOpenProvider>
              </LoadingUserDataProvider>
            </UserProvider>
          </div>
        </>
      </QueryClientProvider>
    </>
  );
};

export default App;
