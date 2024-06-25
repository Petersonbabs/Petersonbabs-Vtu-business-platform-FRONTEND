import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./AuthContext";
import CryptoJS from "crypto-js";

const EmailContext = createContext();

export const useEmailContext = () => {
  return useContext(EmailContext);
};

const EmailProvider = ({ children }) => {
  const [linkValidity, setLinkValidity] = useState(Boolean);
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const { user, token } = useAuthContext();

  const apiUrl = import.meta.env.VITE_apiUrl;
  const [isLoading, setIsLoading] = useState(false);

  // VERIFY EMAIL
  const verifyEmail = async (emailToken) => {
    setIsLoading(true);

    try {
      const response = await axios(`${apiUrl}/auth/verify/${emailToken}`, {
        headers: { authorization: `Bearer ${token}` },
      });
      console.count(response);
      const data = await response.data;

      if (data.status == "success") {
        setMessage(data.message);
        setLinkValidity(true)
      }
    } catch (error) {
      console.log(error);
      setMessage(error.response.data.message);
      if (error.response.data.status == "invalid link") {
        setLinkValidity(false)
      }
    } finally {
      setIsLoading(false);
      console.log("done!");
    }
  };

  // REQUEST VERIFICATION
  const requestVerification = async (email) => {
    console.log("requesting...");
    
    try {
      const response = await axios.post(`${apiUrl}/auth/verify`, {email}, {
        headers: { authorization: `Bearer ${token}` },
      });
      const data = await response.data;
      
      if (data.status == "success") {
        setMessage(data.message);
        const encryptedEmail = CryptoJS.AES.encrypt(
          email,
          import.meta.env.VITE_EMAIL_SECRET
        ).toString();

        navigate(`/verify-email/${encodeURIComponent(encryptedEmail)}`);
        
      }
    } catch (error) {
      console.log(error.response.data.message);
      setMessage(error.response.data.message);
    } finally {
      console.log("done!");
    }
  };

  const value = {
    isLoading,
    message,
    linkValidity,
    verifyEmail,
    requestVerification,
  };

  return (
    <EmailContext.Provider value={value}>{children}</EmailContext.Provider>
  );
};

export default EmailProvider;
