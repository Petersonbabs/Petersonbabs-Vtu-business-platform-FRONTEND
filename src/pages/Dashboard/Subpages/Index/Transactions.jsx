import { ChevronRightIcon } from "@heroicons/react/24/outline";
import React from "react";
import { Link } from "react-router-dom";
import { wallet } from "../../wallet";
import { assets } from "../../../../assets/assets";

const Transactions = () => {
  const transactions = wallet.transactions.slice(0, 4);

  return (
    <div className="p-4 space-y-4">
      {/* header */}
      <div className="flex items-center justify-between">
        <p className="">Transactions</p>
        <Link className="flex items-center justify-between gap-2 text-green-400">
          View all <ChevronRightIcon className="size-4" />
        </Link>
      </div>

      {/* body */}
      <div className="border border-gray-200 space-y-2 rounded p-2">
        {wallet.transactions ? (
          transactions.map((transaction, index) => {
            const { amount, user, customerId, product, type, date, time, status } =
              transaction;
            return (
              <Link className="flex items-center justify-between bg-gray-100 hover:bg-gray-300 p-2 rounded shadow">
                <div className="flex items-center gap-4">
                  <div className="rounded-full">
                    <img
                      src={assets.mtnLogo}
                      alt="provider's logo"
                      width={30}
                      height={30}
                      className="rounded-full"
                    />
                  </div>

                  <div>
                    <h3 className={`text-${status == 'success' ? 'green' : status == 'pending' ? 'amber' : 'red'}-500  text-lg`}>{customerId}</h3>
                    <p className="text-sm text-gray-400">
                      {date} | {time}
                    </p>
                  </div>
                </div>

                <div>
                  <p>{product}</p>
                  <p className="text-gray-500">{type == 'credit' ? '+' : '-'}{amount}</p>
                </div>
              </Link>
            );
          })
        ) : (
          <>
            <div className="flex items-center justify-center min-h-44 border border-gray-400 rounded">
              <p className="text-xl text-gray-500">No transactions... </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Transactions;
