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
      console.log(response);
      const data = response.data;

      if (data.status == "success") {
        setUserData(data);
        const encryptedEmail = cryptoJs.AES.encrypt(
          formData.email,
          import.meta.env.VITE_EMAIL_SECRET
        ).toString();

        navigate(`/verify-email/${encodeURIComponent(encryptedEmail)}`);
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
    setIsLoading(true)
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, formData);
      console.log(response);

      const data = await response.data;
      if (data.status == "success") {
        setUserData(data);
        navigate("/");
        window.location.reload()
        alert(data.message);
      }
    } catch (error) {
      console.log(error.response.data.message);
      alert(error.response.data.message);
    } finally {
      setIsLoading(false)
      console.log("done!");
    }
  };

  // LOGOUT
  const logout = async () => {
    console.log('loging out...')
    try {
      const response = await axios.post(`${apiUrl}/auth/logout`, {token}, {headers: {Authorization: `Bearer ${token}`}})
      const data = await response.data;
      if (data.status == "success") {
        localStorage.clear('user');
        localStorage.clear('token');
        navigate("/");
        window.location.reload()
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
    setIsLoading(true)
    try {
      const response = await axios.post(`${apiUrl}/auth/forgot-password`, formData);
      const data = response.data
      if(data.status == 'success'){

      }
      
    } catch (error) {
      console.log(error)
      alert(error.response.data.message)
      
    }finally{
      console.log('done')
      setIsLoading(false)
    }
  }

  // RESET PASSWORD
  const resetPassword = async (email) => {
    setIsLoading(true)
    try {
      const response = await axios.post(`${apiUrl}/auth/change-password`, email);
      const data = await response.data
      if (data.status == "success") {
       
        alert(data.message);
      }

    } catch (error) {
      console.log(error.response.data.message)
      alert(error.response.data.message)
    } finally {
      setIsLoading(false)
      console.log('done!');
    }
  }

  const value = {
    user,
    isLoading,
    signUp,
    signIn,
    logout,
    forgotPassword,
    resetPassword,
    token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
