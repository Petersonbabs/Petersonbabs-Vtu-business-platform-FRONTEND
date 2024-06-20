import React, { useEffect, useRef, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { assets } from "../../assets/assets";

const SignUp = () => {
  const { signUp, isLoading } = useAuthContext();
  const [showPassword, setShowPassword] = useState(false);
  const btnRef = useRef();

  useEffect(() => {
    if (btnRef.current) {
      btnRef.current.disabled = isLoading;
      btnRef.current.style.background = isLoading ? "gray" : "green";
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
    console.log(showPassword);
  };

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

          {/* FULLNAME */}
          <div className="mb-4 hidden">
            <label
              className="hidden block text-sm font-bold mb-2"
              htmlFor="fullName"
            >
              Fullname*
            </label>
            <input
              className="appearance-none border border-gray-600 text-sm rounded w-full py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-green-600"
              id="fullName"
              type="text"
              placeholder="Peterson Babs"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>
          {/* END OF FULLNAME */}

          {/* USERNAME */}
          <div className="mb-4">
          <label
              className=" block text-sm font-bold mb-2"
            >
              Username
            </label>
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
            <label
              className=" block text-sm font-bold mb-2"
              htmlFor="email"
            >
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

          {/* PHONE NUMBER */}
          <div className="mb-4 hidden">
            <label
              className="block text-sm font-bold mb-2"
              htmlFor="phoneNumber"
            >
              Phone*
            </label>
            <input
              className="appearance-none text-sm border border-gray-600 rounded-10 w-full py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-green-600"
              id="phoneNumber"
              type="text"
              placeholder="08012345678"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>
          {/* END OF PHONE NUMBER */}

          {/* PASSWORD */}
          <div className="mb-6">
          <label
              className=" block text-sm font-bold mb-2"
              htmlFor="email"
            >
              Password
            </label>
            <input
              className="appearance-none text-sm border border-gray-600 rounded w-full py-3 px-4 leading-tight focus:outline-none focus:border-green-600"
              id="password"
              type="password"
              placeholder="*********"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          {/* END OF PASSWORD */}

          {/* CONFIRM PASSWORD */}
          <div className="mb-5">
          <label
              className=" block text-sm font-bold mb-2"
              htmlFor="email"
            >
              Confirm password
            </label>
            <input
              className="appearance-none text-sm border border-gray-600 rounded w-full py-3 px-4 leading-tight focus:outline-none focus:border-green-600"
              id="confirmPassword"
              type="password"
              placeholder="********"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
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
