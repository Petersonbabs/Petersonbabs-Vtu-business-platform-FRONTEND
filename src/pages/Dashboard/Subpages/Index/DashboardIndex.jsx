import { Helmet } from "react-helmet";
import Summary from "./Summary";
import Shortcuts from "./Shortcuts";
import Transactions from "./Transactions";

const DashboardIndex = () => {
  return (
    <div className="space-y-4">
        <Helmet>
        <title>NoByll - Dashboard</title>
      </Helmet>

      <Summary />
      <Shortcuts gridCol={4}/>
      <Transactions />
    </div>
  );
};

export default DashboardIndex;
