import React from "react";

// componnets
import Table from "../../../components/Table/Table";

const PaymentHistory = () => {
  const tableConf = { perPage: "7", target: "history" };
  return (
    <div className="payment-history">
      {/* table */}
      <Table conf={tableConf} />
    </div>
  );
};

export default PaymentHistory;
