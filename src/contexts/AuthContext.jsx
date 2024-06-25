import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import cryptoJs from "crypto-js";

// FORGOT PASSWORD
// const forgotPassword = async () => {
//   setIsLoading(true)
//   try {
//     const response = await axios();
//     const data = response.data
//     if(data.status == 'success'){

//     }

//   } catch (error) {
//     console.log(error.response.data.message)
//     alert(error.response.data.message)

//   }finally{
//     console.log('done')
//     setIsLoading(false)
//   }
// }

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('')
  const navigate = useNavigate();
  const [linkValidity, setLinkValidity] = useState();

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
      const data = response.data;

      if (data.status == "success") {

        setUserData(data);
        const encryptedEmail = cryptoJs.AES.encrypt(
          formData.email,
          import.meta.env.VITE_EMAIL_SECRET
        ).toString();

        navigate(`/verify-email/${encodeURIComponent(encryptedEmail)}`);
        window.location.reload();
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    } finally {
      console.log("done!");
      setIsLoading(false);
    }
  };

  // SIGN IN
  const signIn = async (formData) => {
    console.log("login in...");
    setIsLoading(true);
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, formData);
      console.log(response);

      const data = await response.data;
      if (data.status == "success") {
        setUserData(data);
        navigate("/");
        window.location.reload();
        alert(data.message);
      }
    } catch (error) {
      console.log(error.response.data.message);
      alert(error.response.data.message);
    } finally {
      setIsLoading(false);
      console.log("done!");
    }
  };

  // LOGOUT
  const logout = async () => {
    console.log("loging out...");
    try {
      const response = await axios.post(
        `${apiUrl}/auth/logout`,
        { token },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await response.data;
      if (data.status == "success") {
        localStorage.clear("user");
        localStorage.clear("token");
        navigate("/");
        window.location.reload();
        alert(data.message);
      }
    } catch (error) {
      console.log(error.response.data.message);
      alert(error.response.data.message);
    } finally {
      console.log("done!");
    }
  };

  // FORGOT PASSWORD
  const forgotPassword = async (formData) => {
    setIsLoading(true);
    console.log('loading...');
    try {
      const response = await axios.post(
        `${apiUrl}/auth/forgot-password`,
        formData
      );
      const data = response.data;
      if (data.status == "success") {
        setMessage(data.message)
      }
    } catch (error) {
      console.log(error);
      setMessage(error.response.data.message)
    } finally {
      console.log("done");
      setIsLoading(false);
    }
  };

  // INVALIDATE PASSWORD LINK ONCE CLICKED
  const invalidateLink = async (passwordToken) => {
    
    try {
      const response = await axios.post(`${apiUrl}/auth/check-link`, {
        passwordToken,
      });
      const data = await response.data;
      
      if (data.status == "success") {
        setLinkValidity(true)
        
      }
    } catch (error) {
      console.log(error.response.data.message);
      if (error.response.data.status == "invalid link") {
        setLinkValidity(false)
      }
    } finally {
      console.log("done");
    }
  };

  // RESET PASSWORD
  const resetPassword = async (newPassword, confirmPassword, passwordToken) => {
    setIsLoading(true);
    console.log('loading.');
    try {
      const response = await axios.patch(
        `${apiUrl}/auth/reset-password`,
        {newPassword, confirmPassword, passwordToken}
      );
      console.log(response);
      const data = await response.data;
      if (data.status == "success") {
        alert(data.message);
        navigate('/signin')
        window.location.reload()
      }
    } catch (error) {
      console.log(error.response.data.message);
      alert(error.response.data.message);
    } finally {
      setIsLoading(false);
      console.log(isLoading);
      console.log("done!");
    }
  };

  const value = {
    user,
    isLoading,
    signUp,
    signIn,
    logout,
    forgotPassword,
    invalidateLink,
    linkValidity,
    resetPassword,
    token,
    message,
    setMessage
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
