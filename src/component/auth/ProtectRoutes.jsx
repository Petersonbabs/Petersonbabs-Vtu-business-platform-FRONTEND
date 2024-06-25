import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import axios from "axios";

const ProtectedRoutes = () => {
  const { token } = useAuthContext();

  const navigate = useNavigate();
  
  useEffect(() => {
    if (!token) {
      navigate("/signin");
      alert("please sign in");
    } else if (token) {
      verifyToken();
    }
  }, []);
  const apiUrl = import.meta.env.VITE_apiUrl;

  const verifyToken = async () => {
    try {
      const response = await axios.post(`${apiUrl}/auth/verify-token`, {
        token,
      });
    } catch (error) {
      if (error) {
        navigate("/signin");
      }
      console.log(error);
    }
  };

  return <Outlet />;
};

export default ProtectedRoutes;
