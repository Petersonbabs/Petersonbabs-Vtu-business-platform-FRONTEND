import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useEmailContext } from "../../contexts/EmailContext";
import { useEffect } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { Helmet } from "react-helmet";
import { assets } from "../../assets/assets";
import Loader from "../../component/common/Loader";

const Verify = () => {
  const { verifyEmail, requestVerification, isLoading, linkValidity, message } =
    useEmailContext();
  const { user } = useAuthContext();
  const { token } = useParams();

  const navigate = useNavigate();

  const goToDashboard = () => {
    navigate("/");
  };
  

  useEffect(() => {
    verifyEmail(token);
  }, []);

  const handleRequestVerification = () => {
    requestVerification(user.email);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (linkValidity === false) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Helmet>
          <title>NoByll - Verify Account</title>
        </Helmet>
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          <div className="text-center">
            <img
              src={assets.NoByllLogoTransparent}
              alt="Logo"
              className="w-20 h-20 mx-auto"
            />
            <h2 className="mt-4 text-2xl font-bold text-gray-800">
              Verification Status
            </h2>
            <p className="mt-2 text-gray-600">{message}</p>
          </div>
          <div className="mt-6 text-center">
            <button
              onClick={handleRequestVerification}
              className="px-4 py-2 font-semibold text-white bg-green-500 rounded-md hover:bg-green-600"
            >
              Request new link
            </button>
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

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Helmet>
        <title>NoByll - Verify Account</title>
      </Helmet>
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <img
            src={assets.NoByllLogoTransparent}
            alt="Logo"
            className="w-20 h-20 mx-auto"
          />
          <h2 className="mt-4 text-2xl font-bold text-gray-800">
            {/* Invalid Link */}
          </h2>
          <p className="mt-2 text-gray-600">{message}</p>
        </div>
        <div className="mt-6 text-center">
          <button
            onClick={goToDashboard}
            className="px-4 py-2 font-semibold text-white bg-green-500 rounded-md hover:bg-green-600"
          >
           Go to dashboard
          </button>
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
};

export default Verify;
