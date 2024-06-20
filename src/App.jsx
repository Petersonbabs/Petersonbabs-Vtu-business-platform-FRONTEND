import React, { useEffect } from "react";
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

function App() {
  // const { user } = useAuthContext();
  const user = { name: "ghj" };

  return (
    <BrowserRouter>
      <AuthProvider>
        <PopupProvider>
          {!user ? (
            <>
              <MessagesModal />
              <Routes>
                <Route path="*" element={<RoutesLink />} />
              </Routes>
            </>
          ) : (
            <>
              {/* <MessagesModal content={'ellother hth heve hehhejdjdhh dhhd dhhd hjhd '}  /> */}

              {/* <button onClick={openModal}>call</button> */}
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgotPassword" element={<ForgotPassword />} />
                <Route path="/createPin" element={<CreatePin />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </>
          )}
        </PopupProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
