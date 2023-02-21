import React from "react";

// components
import Header from "../../components/Header/Header";
import Table from "../../components/Table/Table";

const ReportLeak = () => {
  const tableConf = { perPage: "7", target: "report" };

  return (
    <div>
      <Header page={"Report a Leak"} />

      {/* page */}
      <div className="centerer">
        {/* table */}
        <Table conf={tableConf} />
      </div>
    </div>
  );
};

export default ReportLeak;
