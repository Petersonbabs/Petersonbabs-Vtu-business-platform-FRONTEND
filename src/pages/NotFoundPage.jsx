import { NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Helmet>
        <title>404 Not Found - NoByll</title>
      </Helmet>
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md text-center">
        <h1 className="text-4xl font-bold text-gray-800">404</h1>
        <h2 className="text-2xl font-semibold text-gray-600 mt-2">Page Not Found</h2>
        <p className="my-8 text-gray-500">The page you are looking for does not exist.</p>
        <NavLink
          to="/"
          className="mt-12 px-4 py-2 font-semibold text-white bg-green-500 rounded-md hover:bg-green-600"
        >
          Go to Homepage
        </NavLink>
      </div>
    </div>
  );
};

export default NotFoundPage;
