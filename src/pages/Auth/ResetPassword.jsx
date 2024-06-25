import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { NavLink, useParams } from "react-router-dom";
import { assets } from "../../assets/assets";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useAuthContext } from "../../contexts/AuthContext";

const ResetPassword = () => {
  const { linkValidity, invalidateLink, resetPassword, isLoading } =
    useAuthContext();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { passwordToken } = useParams();
  const btnRef = useRef();

  useEffect(() => {
    invalidateLink(passwordToken);
  }, []);

  useEffect(() => {
    if (btnRef.current) {
      btnRef.current.disabled = isLoading;
      btnRef.current.style.background = isLoading ? "var(--disabled)" : "green";
    }
  }, [isLoading]);

  if (!linkValidity) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          <div className="text-center">
            <img
              src={assets.NoByllLogoTransparent}
              alt="Logo"
              className="w-20 h-20 mx-auto"
            />
            <h2 className="mt-4 text-2xl font-bold text-gray-800">
              Invalid Link
            </h2>
            <p className="mt-2 text-gray-600">
              The reset password link you clicked has expired or has already
              been used.
            </p>
          </div>
          <div className="mt-6 text-center">
            <NavLink
              to="/forgot-password"
              className="px-4 py-2 font-semibold text-white bg-green-500 rounded-md hover:bg-green-600"
            >
              Request a New Link
            </NavLink>
            <NavLink
              to="/signin"
              className="ml-4 px-4 py-2 font-semibold text-white bg-gray-500 rounded-md hover:bg-gray-600"
            >
              Sign In
            </NavLink>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    resetPassword(newPassword, confirmPassword, passwordToken);
    document.getElementById("newPassword").value = "";
    document.getElementById("confirmPassword").value = "";
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <NavLink className="flex justify-center items-center" to="/">
          <img
            src={assets.NoByllLogoTransparent}
            alt="NoByll Logo"
            className="w-20 h-20 w-fit"
          />
        </NavLink>

        <h2 className="text-2xl font-bold text-center">Reset Password</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-group relative">
            <label className="block mb-2 text-sm">New Password:</label>
            <input
              type={showPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              id="newPassword"
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
              id="confirmPassword"
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
            ref={btnRef}
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
