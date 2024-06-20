import React from 'react';
import image from "../../assets/logoA. removebg-preview (1).png"
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom/dist';
import { useAuthContext } from '../../contexts/AuthContext';
import { useState } from 'react';
import { assets } from '../../assets/assets';


const SignUp = () => {

  const {signUp, user} = useAuthContext()

  const [formData, setFormData] = useState({
    email: 'baba@dev.com',
    fullName: 'peter babs'
  });

  const handleSignUp = () => {
    signUp(formData)
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-2">
      <div className="w-full max-w-md">
        <form className=" shadow-2xl rounded px-8  pb-8 mb-4 mt-10">

          <NavLink className="flex justify-center items-center" to="/">
            <div className="w-32 h-32 flex justify-center items-center">
              <img src={assets.NoByllLogoTransparent} alt="description" className="w-20 h-20 mb-8" />
            </div>
          </NavLink>

          <h2 className="mb-6 mt-0 text-2xl font-bold text-center ">Sign Up</h2>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="fullname">
              Fullname*
            </label>
            <input
              className="appearance-none border border-gray-600 text-sm rounded w-full py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-green-600"
              id="fullname"
              type="fullname"
              placeholder="Peterson Babs"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="username">
              Username*
            </label>
            <input
              className="appearance-none text-sm border border-gray-600 rounded w-full py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-green-600"
              id="username"
              type="username"
              placeholder="PetersonBabs"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="email">
              Email*
            </label>
            <input
              className="appearance-none border border-gray-600 rounded w-full py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-green-600"
              id="email"
              type="email"
              placeholder="m@example.com"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="phone">
              Phone*
            </label>
            <input
              className="appearance-none text-sm border border-gray-600 rounded w-full py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-green-600"
              id="phone"
              type="phone"
              placeholder="08012345678"
            />
          </div>
          <div className="mb-4">
            <label className="hidden text-sm font-bold mb-2" htmlFor="referral">
              Referral username [optional]
            </label>
            <input
              className="hidden appearance-none text-sm border border-gray-600 rounded w-full py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-green-600"
              id="referral"
              type="referral"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-bold mb-2" htmlFor="password">
              Password*
            </label>
            <input
              className="appearance-none text-sm border border-gray-600 rounded w-full py-3 px-4 leading-tight focus:outline-none focus:border-green-600"
              id="password"
              type="password"
              placeholder="*********"
            />
            <p className="block text-gray-800 text-xs font-bold mt-1">min_lenght-8 mix characters.</p>
          </div>
          <div className="mb-5">
            <label className="block text-sm font-bold mb-2" htmlFor="confirmPassword">
              Confirm Password*
            </label>
            <input
              className="appearance-none text-sm border border-gray-600 rounded w-full py-3 px-4  leading-tight focus:outline-none focus:border-green-600"
              id="confirmPassword"
              type="confirmPassword"
              placeholder="******************"
            />
            <p className="block text-gray-800 text-xs font-bold mt-1">min_lenght-8 mix characters.</p>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleSignUp}
            >
              Create an account
            </button>
          </div>
        </form>
        <p className="text-center text-xs mb-10">
          Already have an account? <Link to="/signin" className="text-blue-500 hover:text-blue-300">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
