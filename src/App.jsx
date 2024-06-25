import React, { useContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Homepage from "./pages/Homepage";
import NotFoundPage from "./pages/NotFoundPage";
import Signin from "./pages/Auth/Signin";
import Signup from "./pages/Auth/Signup";
import ForgotPassword from "./pages/Auth/ForgotPassword ";
import CreatePin from "./pages/Auth/CreatePin";
import RoutesLink from "./pages/Dashboard/RoutesLink";
import AuthProvider, { useAuthContext } from "./contexts/AuthContext";
import MessagesModal, { openModal } from "./component/common/MessagesModal";
import PopupProvider from "./contexts/Popup";
import VerifyEmail from "./pages/Auth/VerifyEmail";
import EmailProvider from "./contexts/EmailContext";
import Verify from "./pages/Auth/Verify";
import ProtectedRoutes from "./component/auth/ProtectRoutes";
import ServicesIndex from "./pages/Dashboard/Subpages/Services/ServicesIndex";
import WalletIndex from "./pages/Dashboard/Subpages/Wallet/WalletIndex";
import UserIndex from "./pages/Dashboard/Subpages/User/UserIndex";
import BuyData from "./pages/Dashboard/Subpages/Services/BuyData";
import BuyAirtime from "./pages/Dashboard/Subpages/Services/BuyAirtime";
import ResetPassword from "./pages/Auth/ResetPassword";

// localStorage.clear();

function App() {
  // const {  } = useContext(AuthContext);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <BrowserRouter>
      <AuthProvider>
        <EmailProvider>
          <PopupProvider>
            {user ? (
              <>
              
                <MessagesModal />

                <Routes>
                  <Route path="*" element={<RoutesLink />} />
                  {/* AUTH */}
                  <Route
                    path="/verify-email/:email"
                    element={<VerifyEmail />}
                  />
                  <Route path="/verify/:token" element={<Verify />} />
                  
                  <Route path="/create-pin" element={<CreatePin />} />
                </Routes>
              </>
            ) : (
              <>
                <MessagesModal />

                {/* <button onClick={openModal}>call</button> */}
                <Routes>
                  <Route path="/" element={<Homepage />} />
                  <Route path="/signin" element={<Signin />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/forgot-Password" element={<ForgotPassword />} />
                  <Route path="/reset-password/:passwordToken" element={<ResetPassword />}/>
                  <Route path="*" element={<NotFoundPage />} />

                  {/* protect these routes from guest user */}
                  <Route element={<ProtectedRoutes />}>
                    <Route
                      path="/verify-email/:email"
                      element={<VerifyEmail />}
                    />
                    <Route path="/verify/:token" element={<Verify />} />
                    <Route path="/reset-password/:passwordToken" element={<ResetPassword />}/>

                    <Route path="*" element={<RoutesLink />} />
                    
                    <Route path="/create-Pin" element={<CreatePin />} />

                    <Route path="/services" element={<ServicesIndex />} />
                    <Route path="/wallet" element={<WalletIndex />} />
                    <Route path="/user" element={<UserIndex />} />

                    {/* SERVICES ROUTES */}
                    <Route path="/buy-data" element={<BuyData />} />
                    <Route path="/buy-airtime" element={<BuyAirtime />} />
                  </Route>
                </Routes>
              </>
            )}
          </PopupProvider>
        </EmailProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
