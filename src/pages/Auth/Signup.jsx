import React, { useEffect, useRef, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { assets } from "../../assets/assets";
import "../../styles/variables.css";

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const SignUp = () => {
  const { signUp, isLoading } = useAuthContext();
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const btnRef = useRef();

  useEffect(() => {
    if (btnRef.current) {
      btnRef.current.disabled = isLoading;
      btnRef.current.style.background = isLoading ? "var(--disabled)" : "green";
    }
  }, [isLoading]);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    userName: "",
    password: "",
    phoneNumber: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signUp(formData);
  };

  const togglePasword = () => {
    setShowPassword(!showPassword);
  };
  const togglePasword2 = () =>{
    setShowPassword2(!showPassword2)
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-2">
      <div className="w-full max-w-md">
        <form
          className="shadow-2xl rounded px-8 pb-8 mb-4 mt-10"
          onSubmit={handleSubmit}
        >
          <NavLink className="flex justify-center items-center" to="/">
            <div className="w-32 h-32 flex justify-center items-center">
              <img
                src={assets.NoByllLogoTransparent}
                alt="description"
                className="w-20 h-20 mb-8"
              />
            </div>
          </NavLink>

          <h2 className="mb-6 mt-0 text-2xl font-bold text-center">Sign Up</h2>

          {/* USERNAME */}
          <div className="mb-4">
            <label className=" block text-sm font-bold mb-2">Username</label>
            <input
              className="appearance-none text-sm border border-gray-600 rounded w-full py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-green-600"
              id="userName"
              type="text"
              placeholder="PetersonBabs"
              value={formData.userName}
              onChange={handleChange}
            />
          </div>
          {/* EMND OF USERNAME */}

          {/* EMAIL */}
          <div className="mb-4">
            <label className=" block text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="appearance-none border border-gray-600 rounded w-full py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-green-600"
              id="email"
              type="email"
              placeholder="m@example.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          {/* END OF EMAIL */}

          {/* PASSWORD */}
          <div className="mb-5">
            <label className=" block text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <div className="flex items-center border border-gray-600 px-4 rounded">
              <input
                className="appearance-none text-sm  border-gray-600 rounded w-full py-3  leading-tight focus:outline-none focus:border-green-600"
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
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
          </div>
          {/* END OF PASSWORD  */}

          {/* CONFIRM PASSWORD */}
          <div className="mb-5">
            <label className=" block text-sm font-bold mb-2" htmlFor="email">
              Confirm password
            </label>
            <div className="flex items-center border border-gray-600 rounded px-4 ">
              <input
                className="appearance-none text-sm  border-gray-600 rounded w-full py-3  leading-tight focus:outline-none focus:border-green-600"
                id="confirmPassword"
                type={showPassword2 ? "text" : "password"}
                placeholder="********"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {showPassword2 ? (
                <EyeIcon
                  className="size-6 cursor-pointer hover:stroke-green-500 "
                  onClick={togglePasword2}
                />
              ) : (
                <EyeSlashIcon
                  className="size-6 cursor-pointer hover:stroke-green-500"
                  onClick={togglePasword2}
                />
              )}
            </div>
          </div>
          {/* END OF CONFIRM PASSWORD  */}

          <div className="flex items-center justify-between">
            <button
              className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              ref={btnRef}
            >
              Create account
            </button>
          </div>
        </form>
        <p className="text-center text-xs mb-10">
          Already have an account?{" "}
          <Link to="/signin" className="text-blue-500 hover:text-blue-300">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
