import React, { useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useAuthContext } from "../../contexts/AuthContext";
import { Helmet } from "react-helmet";

const ForgotPassword = () => {
  const { forgotPassword, message, setMessage  } = useAuthContext();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const emailRef = useRef()

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    forgotPassword(formData);
    email.value = ''
    setMessage('')
  };

  

  const handleGoBack = () => {
    navigate(-1); // Navigate to the previous page
  };


  return (
    <div className="min-h-screen flex items-center justify-center px-2 md:px-0">
        <Helmet>
            <title>NoByll - Forgot Password</title>
        </Helmet>
      <div className="max-w-md w-full space-y-8">
        <div>
          <NavLink className="flex justify-center items-center" to="/">
            <img
              src={assets.NoByllLogoTransparent}
              alt="NoByll Logo"
              className="w-32 h-32"
            />
          </NavLink>
          <h2 className=" text-center text-3xl font-extrabold text-white">
            Forgot your password?
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Enter your email below to receive your password reset instructions.
          </p>
        </div>
        <p className="text-gray-700 px-2 font-sm text-center">{message}</p>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* <input type="hidden" name="remember" value="true" /> */}
          <div className="rounded-md shadow-sm">
            <div>
              <input
                id="email"
                name="email"
                type="email"
                ref={emailRef}
                onChange={handleChange}
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Send password reset email
            </button>
          </div>
        </form>
        <div className="text-sm">
          <button
            onClick={handleGoBack}
            className="font-medium text-green-500 hover:text-green-400 flex items-center gap-1 w-fit"
          >
            <ChevronLeftIcon className="size-4" />
            <span>Back </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
