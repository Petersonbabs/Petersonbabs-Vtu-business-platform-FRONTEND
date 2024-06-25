import { Helmet } from "react-helmet";

const DashboardIndex = () => {
  return (
    <div>
      <Helmet>
        <title>NoByll - Dashboard</title>
      </Helmet>
      <h1 className="font-xl" style={{ fontSize: "3.5rem" }}>
        Dashboard
      </h1>
    </div>
  );
};

export default DashboardIndex;
