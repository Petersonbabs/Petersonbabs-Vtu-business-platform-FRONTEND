import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./AuthContext";


const EmailContext = createContext();

export const useEmailContext = () => {
  return useContext(EmailContext);
};

const EmailProvider = ({ children }) => {

  const navigate = useNavigate()

  const [message, setMessage] = useState('');
  const [action, setAction] = useState('');
  const {user, token} = useAuthContext()
  

  const apiUrl = import.meta.env.VITE_apiUrl;
  const [isLoading, setIsLoading] = useState(false)

  // VERIFY EMAIL
  const verifyEmail = async (token) => {
    setIsLoading(true)
    
    try {
      const response = await axios(`${apiUrl}/auth/verify/${token}`, {headers : {authorization: `Bearers  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBldGVyLmJhYnMuZGV2QGdtYWlsLmNvbSIsImlkIjoiNjY3NzNhZjk4ZDQzMzAyZTg2ZGIzODI4IiwiaWF0IjoxNzE5MDg5OTIyLCJleHAiOjE3MTkwOTcxMjJ9.n_RCgJxj5g4_ozcnbYXVlKd9tff3fGEKiGw3poB-_vU
      `}});
      console.count(response)
      const data = await response.data;
      
      if (data.status == "success") {
        setMessage(data.message);
        setAction(data.action)
      }
    } catch (error) {
      console.log(error)
      setMessage(error.response.data.message);
      setAction(error.response.data.action);
    } finally {
      setIsLoading(false)
      console.log("done!");
    }
  };

  // REQUEST VERIFICATION
  const requestVerification = async (email) => {
    console.log('requesting...');
    try {
      const response = await axios.post(`${apiUrl}/auth/verify`, email, {headers : {authorization: `Bearer ${token}`}})
      const data = await response.data
      if (data.status == "success") {
        setMessage(data.message);
        setAction(data.action)
        navigate('/verify-email')
      }

    } catch (error) {
      console.log(error.response.data.message);
      setMessage(error.response.data.message);
      setAction(error.response.data.action);
    }
    finally {
      console.log('done!');
    }
  }

  const value = {
    isLoading,
    message,
    action,
    verifyEmail,
    requestVerification
  };

  return (
    <EmailContext.Provider value={value}>{children}</EmailContext.Provider>
  );
};

export default EmailProvider;
