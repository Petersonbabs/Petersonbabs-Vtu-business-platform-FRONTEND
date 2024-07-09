// import { WifiIconiIcon } from '@heroicons/react/24/outline'
import {
  PhoneIcon,
  PowerIcon,
  TvIcon,
  WifiIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { Link } from "react-router-dom";

const Shortcuts = ({ gridCol }) => {
  return (
    <div className={`grid grid-cols-${gridCol} md:grid-cols-4 gap-4 md:items-center md:justify-evenly`}>
      {/* data */}
      <Link
        to="/buy-data"
        className="flex flex-col border   p-2 rounded shadow items-center hover:bg-gray-200"
      >
        <div className="p-2 ">
          <WifiIcon className="size-4 md:size-8  stroke-green-500  " />
        </div>
        <span>Data</span>
      </Link>

      {/* Airtime */}
      <Link to={'/buy-airtime'} className="flex flex-col border   p-2 rounded shadow items-center hover:bg-gray-200">
        <div className="p-2 ">
          <PhoneIcon className="size-4 md:size-8 stroke-green-500   " />
        </div>
        <span>Airtime</span>
      </Link>

      {/* Electriciy */}
      <Link className="flex flex-col border p-2 rounded shadow items-center hover:bg-gray-200">
        <div className="p-2 ">
          <PowerIcon className="size-4 md:size-8 stroke-green-500   " />
        </div>
        <span>Electricity</span>
      </Link>

      {/* Cables */}
      <Link className="flex flex-col border p-2 rounded shadow items-center hover:bg-gray-200">
        <div className="p-2">
          <TvIcon className="size-4 md:size-8  stroke-green-500 " />
        </div>
        <span>Cables</span>
      </Link>
    </div>
  );
};

export default Shortcuts;
