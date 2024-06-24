import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";

const ProtectedRoutes = () => {
  const { token } = useAuthContext();
  console.log(token);
  const navigate = useNavigate();

  const isAuthenticated = () => {
    if (!token) {
      return false;
    }
    return true;
  };
  
  useEffect(() => {
    console.log('verifyn..')
    if (!isAuthenticated()) {
      navigate("/signin");
      alert('Please login')
    }
  });

  return <Outlet />;
};

export default ProtectedRoutes;
