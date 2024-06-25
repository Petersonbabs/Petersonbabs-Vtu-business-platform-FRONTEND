import React from "react";
import "./style.css";
import cryptoJs from "crypto-js";
import { useAuthContext } from "../../contexts/AuthContext";
import { useParams } from "react-router-dom";
import { useEmailContext } from "../../contexts/EmailContext";
import { Helmet } from "react-helmet";

const VerifyEmail = () => {
  const { email } = useParams("email");
  const { user, token } = useAuthContext();
  const { message, action } = useEmailContext();

  const decryptedBytes = cryptoJs.AES.decrypt(
    email,
    import.meta.env.VITE_EMAIL_SECRET
  );

  const decryptedEmail = decryptedBytes.toString(cryptoJs.enc.Utf8);

  const handleOpenEmail = () => {
    window.location.href = `mailto:${decryptedEmail}`;
  };

  

  
  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-2">
      <Helmet>
        <title>NoByll - Verify Email</title>
      </Helmet>
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">One last thing...</h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-32 stroke-green-500 m-auto animate-scale"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
          />
        </svg>

        <p className="text-lg mb-6">
          Please click the link sent to your email to verify your account.
        </p>
        <button
          onClick={handleOpenEmail}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Open Email
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;
