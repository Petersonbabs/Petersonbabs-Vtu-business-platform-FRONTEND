import { useNavigate, useParams } from "react-router-dom";
import { useEmailContext } from "../../contexts/EmailContext";
import { useEffect } from "react";
import { useAuthContext } from "../../contexts/AuthContext";

const Verify = () => {
  const { verifyEmail, requestVerification, isLoading, message, action } = useEmailContext();
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
    requestVerification(user);
  };

  if (isLoading) {
    return <h1 className="font-lg text-center my-32">Loading</h1>;
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-green-100">
      <h1 className="text-4xl font-bold mb-6 px-4 text-center">{message}</h1>
      <button
        onClick={
          action == "Request verification"
            ? handleRequestVerification
            : action == "Go to dashboard"
            ? goToDashboard
            : ""
        }
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        {action}
      </button>
    </div>
  );
};

export default Verify;
