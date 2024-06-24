import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useParams } from "react-router-dom";
import { assets } from "../../assets/assets";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { passwordToken } = useParams();
  const apiUrl = import.meta.env.VITE_apiUrl;
  useEffect(()=>{
    invalidateLink()
  }, [])

  const invalidateLink = async () => {
    try {
        const response = await axios.post(`${apiUrl}/invalidate-link`, {passwordToken})
        const data = await response.data
        if(data.status == 'success'){
            console.log('token invalidated.');
        }
    } catch (error) {
        console.log(error)
    }
  };

  const handleSubmit = async (e) => {
    alert("submiting...");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-3 bg-white rounded-lg shadow-md">
        <NavLink className="flex justify-center items-center" to="/">
          <img
            src={assets.NoByllLogoTransparent}
            alt="NoByll Logo"
            className="w-24 h-24"
          />
        </NavLink>

        <h2 className="text-2xl font-bold text-center">Reset Password</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-group relative">
            <label className="block mb-2 text-sm">New Password:</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-opacity-50 focus:ring-green-400"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-10 cursor-pointer"
            >
              {showPassword ? (
                <EyeIcon className="size-4" />
              ) : (
                <EyeSlashIcon className="size-4" />
              )}
            </span>
          </div>
          <div className="form-group relative">
            <label className="block mb-2 text-sm">Confirm New Password:</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-opacity-50 focus:ring-green-400"
            />
            <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-10 cursor-pointer"
            >
              {showConfirmPassword ? (
                <EyeIcon className="size-4" />
              ) : (
                <EyeSlashIcon className="size-4" />
              )}
            </span>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-green-400"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
