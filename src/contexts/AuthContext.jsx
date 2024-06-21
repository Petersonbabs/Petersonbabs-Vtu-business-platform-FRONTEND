import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import cryptoJs from "crypto-js";


const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};



const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const setUserData = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setToken(data.token);
    setUser(data.user);
  };

  const apiUrl = import.meta.env.VITE_apiUrl;

  // REGISTER USER
  const signUp = async (formData) => {
    setIsLoading(true);

    try {
      const response = await axios.post(`${apiUrl}/auth/signup`, formData);
      console.log(response)
      const data = response.data;

      if (data.status == "success") {
        setUserData(data);
        const encryptedEmail = cryptoJs.AES.encrypt(
          formData.email,
          import.meta.env.VITE_EMAIL_SECRET
        ).toString();
        
        navigate(`/verify-email/${encodeURIComponent(encryptedEmail)}`);
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    } finally {
      console.log("done!");
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isLoading,
    signUp,
    token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
