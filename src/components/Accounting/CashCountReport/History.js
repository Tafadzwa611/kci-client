import React from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';


function History() {
  const params = useParams();
  const [reports, setReports] = React.useState([]);

  const accountId = params.accountId;

  React.useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `/acc-api/cash_count_report/?account_id=${accountId}`
      );
      setReports(response.data);
    }
    fetch();
  }, []);

  return (
    <div style={{ padding: '0', border: 'none' }}>
      <div style={{ width: '100%', overflowX: 'auto' }}>
        <div className='table__height'>
          <table className='table' id='requests'>
            <thead>
              <tr className='journal-details header' style={{ position: 'sticky', top: '0' }}>
                <th style={{ textAlign: 'start' }}>Branch</th>
                <th style={{ textAlign: 'start' }}>Cashbook</th>
                <th style={{ textAlign: 'start' }}>Currency</th>
                <th style={{ textAlign: 'start' }}>System_Balance</th>
                <th style={{ textAlign: 'start' }}>Manual_Balance</th>
                <th style={{ textAlign: 'start' }}>Reason</th>
              </tr>
            </thead>
            <tbody>
              {reports.map(report => {
                return (
                  <tr key={report.id}>
                    <td style={{ verticalAlign: 'middle' }}>
                      {report.branch_name}
                    </td>
                    <td style={{ verticalAlign: 'middle' }}>
                      {report.account_name}- {report.currency}
                    </td>
                    <td style={{ verticalAlign: 'middle' }}>
                      {report.currency}
                    </td>
                    <td style={{ verticalAlign: 'middle' }}>
                      {report.system_balance}
                    </td>
                    <td style={{ verticalAlign: 'middle' }}>
                      {report.counted_total}
                    </td>
                    <td style={{ verticalAlign: 'middle' }}>
                      {report.variance_explanation}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default History