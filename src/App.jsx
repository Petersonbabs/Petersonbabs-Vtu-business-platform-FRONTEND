import React from "react";
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


function App() {
  // const { user } = useAuthContext();
  const user = {name: 'ghj'}

  return (
    <AuthProvider>
      <BrowserRouter>
        {!user ? (
          <Routes>
            <Route path="*" element={<RoutesLink />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/createPin" element={<CreatePin />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        )}
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
