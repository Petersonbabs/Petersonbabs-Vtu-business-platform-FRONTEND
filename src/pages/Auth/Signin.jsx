import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useAuthContext } from "../../contexts/AuthContext";
import "../../styles/variables.css";
import {
  ChevronLeftIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import { Helmet } from "react-helmet";

const Signin = () => {
  const { signIn, isLoading } = useAuthContext();
  const [showPassword, setShowPassword] = useState(false);
  const btnRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (btnRef.current) {
      btnRef.current.disabled = isLoading;
      btnRef.current.style.background = isLoading ? "var(--disabled)" : "green";
    }
  }, [isLoading]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const togglePasword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn(formData);
  };

  return (
    <div className="min-h-screen  flex flex-col justify-center items-center px-2">
      <Helmet>
        <title>NoByll - Signin</title>
      </Helmet>
      <div className="w-full max-w-md">
        <form
          className="shadow-lg rounded px-8  pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <NavLink className="flex justify-center items-center" to="/">
            <img
              src={assets.NoByllLogoTransparent}
              alt="NoByll Logo"
              className="w-20 h-20 mb-8"
            />
          </NavLink>
          <h2 className="mb-4 text-3xl font-bold text-center ">Login</h2>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              onChange={handleChange}
              className="appearance-none  border border-gray-600 rounded w-full py-3 px-4 leading-tight focus:outline-none focus:border-green-600"
              id="email"
              type="email"
              placeholder="m@example.com"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <div className="flex items-center border border-gray-600 px-4 rounded">
              <input
                onChange={handleChange}
                className="appearance-none w-full py-3 leading-tight focus:outline-none focus:border-green-600"
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="*******"
              />

              {showPassword ? (
                <EyeIcon
                  className="size-6 cursor-pointer hover:stroke-green-500"
                  onClick={togglePasword}
                />
              ) : (
                <EyeSlashIcon
                  className="size-6 cursor-pointer hover:stroke-green-500"
                  onClick={togglePasword}
                />
              )}
            </div>

            <Link to={"/forgot-password"}>
              <p className="text-xs italic mt-3">
                Forgot your password?
                <span className="text-green-400"> Reset here.</span>
              </p>
            </Link>
          </div>
          <div className="flex items-center justify-between mb-6">
            <button
              ref={btnRef}
              className="w-full bg--500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center justify-center"
              type="submit"
            >
              <span>Login</span>
            </button>
          </div>
        </form>

        <div className="text-sm mb-8">
          <button
            onClick={handleGoBack}
            className="font-medium text-green-500 hover:text-green-400 flex items-center gap-1 w-fit"
          >
            <ChevronLeftIcon className="size-4" />
            <span>Back </span>
          </button>
        </div>

        <p className="text-center text-xs">
          <span>Don’t have an account?</span>{" "}
          <Link to="/signup" className="text-blue-500 hover:text-blue-300">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
