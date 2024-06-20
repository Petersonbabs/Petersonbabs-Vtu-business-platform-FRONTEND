import axios from "axios";
import { createContext, useContext, useState } from "react";
import { assets } from "../assets/assets"; 

const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const apiUrl = import.meta.env.VITE_apiUrl
  

  // REGISTER USER
  const signUp = async (formData) => {
    setIsLoading(true);
    
    try {
      const response = await axios.post(`${apiUrl}/auth/`, formData )
      const data = response.data()
      if (data.status == "Success") {
        setSuccessMessage(data.message)

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user))

        setTimeout(() => {
            navigate("/dashboard")
            window.location.reload();
        }, [2000])
    }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    signUp
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
