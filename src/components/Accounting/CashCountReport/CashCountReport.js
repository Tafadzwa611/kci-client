import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


function CashCountReport() {
  const [reports, setReports] = React.useState([]);

  React.useEffect(() => {
    const fetch = async () => {
      const user = await axios.get('/usersapi/logged_in_user/');
      const server_date = user.data.server_date;
      const response = await axios.get(
        `/acc-api/cash_count_report/?min_date=${server_date}&max_date=${server_date}`
      );
      setReports(response.data);
    }
    fetch();
  }, []);

  return (
    <div>
      <button type='button' className='btn btn-success'>
        <Link to='/accounting/viewaccounting/record_cash_count'>
          Balance Cashbook
        </Link>
      </button>
      <div style={{ paddingTop: '2rem' }}></div>
      <Table reports={reports} />
    </div>
  )
}


const Table = ({reports}) => {
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
                <th style={{ textAlign: 'start' }}>Action</th>
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
                    <td style={{ verticalAlign: 'middle' }}>
                      <>
                        <Link to={`/accounting/viewaccounting/record_cash_count/${report.account_id}?date=${report.count_date}&currencyId=${report.currency_id}`}>
                          <button
                            id={report.id}
                            style={{
                              background: '#1bbf5f',
                              color: '#fff',
                              border: 'none',
                              borderRadius: '.15rem',
                              cursor: 'pointer',
                              padding: '.2rem .25rem',
                              fontSize: '0.75rem',
                              marginLeft: '5px',
                            }}
                          >
                            Edit
                          </button>
                        </Link>
                        <Link to={`/accounting/viewaccounting/balanced_cashbook/${report.account_id}`}>
                          <button
                            id={report.id}
                            style={{
                              background: '#1bbf5f',
                              color: '#fff',
                              border: 'none',
                              borderRadius: '.15rem',
                              cursor: 'pointer',
                              padding: '.2rem .25rem',
                              fontSize: '0.75rem',
                              marginLeft: '5px',
                            }}
                          >
                            History
                          </button>
                        </Link>
                        {/* <Link to={`/accounting/viewaccounting/balanced_cashbook/${report.account_id}`}>
                          <button
                            id={report.id}
                            style={{
                              background: '#1bbf5f',
                              color: '#fff',
                              border: 'none',
                              borderRadius: '.15rem',
                              cursor: 'pointer',
                              padding: '.2rem .25rem',
                              fontSize: '0.75rem',
                              marginLeft: '5px',
                            }}
                          >
                            Denominations
                          </button>
                        </Link> */}
                      </>
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

export default CashCountReport;