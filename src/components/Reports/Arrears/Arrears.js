import React from "react";
import Filter from "./Filter";
import Table from "./Table";

function Arrears() {
  const [params, setParams] = React.useState(null);
  const [report, setReport] = React.useState(null);

  return (
    <div>
      <Filter setReport={setReport} setParams={setParams}/>
      {report && (
        <Table report={report} setReport={setReport} params={params}/>
      )}
    </div>
  )
}

export default Arrears;