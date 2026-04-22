import React from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const toNumber = value => {
  const normalized = Number(value);
  return Number.isNaN(normalized) ? 0 : normalized;
};

const formatMoney = value => toNumber(value).toLocaleString(undefined, {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function Summary({ report }) {
  const totalsByType = report.total_expenses_by_type || [];
  const groupedExpenses = report.grouped_expenses || [];

  return (
    <>
      <div className='search_background' style={{ padding: '20px' }}>
        <div style={{ display: 'grid', marginTop: '0.5rem', gridTemplateColumns: '1fr', columnGap: '10px' }}>
          <div>
            <ul style={{ display: 'flex', flexDirection: 'column', rowGap: '10px' }}>
              <li style={{ marginBottom: '0.5rem' }}><b>Expenses Summary</b></li>
              <li>Branch: {report.branch_name || 'N/A'}</li>
              <li>Total Expenses: {formatMoney(report.total_expenses)}</li>
              <li>Grand Total: {formatMoney(report.grand_total)}</li>
              <li>Total Count: {report.count || 0}</li>
            </ul>
          </div>
        </div>
      </div>

      <div className='table-container font-12' style={{ border: 'none', padding: '0', marginTop: '1.5rem' }}>
        <h6 style={{ marginBottom: '0.75rem' }}>Total Expenses By Type</h6>
        <div className='table-responsive' style={{ maxHeight: '500px' }}>
          <div style={{ display: 'flex', columnGap: '10px', alignItems: 'center' }}>
            <div style={{ marginTop: '6px' }}>Page {report.number || 1} of {report.num_of_pages || 1}</div>
            <ReactHTMLTableToExcel
              id='expenses-summary-xls-button'
              className='btn btn-default'
              table='expenses-summary'
              filename='expenses-summary'
              sheet='tablexls'
              buttonText='Download as XLS'
            />
          </div>
          <table className='table' id='expenses-summary'>
            <thead>
              <tr>
                <th className='reports-table-border-left reports-table-border-right'>Expense Type</th>
                <th className='reports-table-border-left reports-table-border-right'>Total Expenses</th>
              </tr>
            </thead>
            <tbody>
              {totalsByType.length ? totalsByType.map((row, idx) => (
                <tr key={`${row.expense_type}-${idx}`}>
                  <td className='reports-table-border-left reports-table-border-right'>{row.expense_type}</td>
                  <td className='reports-table-border-left reports-table-border-right'>{formatMoney(row.total_expenses)}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={2} className='reports-table-border-left reports-table-border-right'>No totals available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className='table-container font-12' style={{ border: 'none', padding: '0', marginTop: '1.5rem' }}>
        <h6 style={{ marginBottom: '0.75rem' }}>Branch Totals</h6>
        <div className='table-responsive' style={{ maxHeight: '500px' }}>
          <table className='table'>
            <thead>
              <tr>
                <th className='reports-table-border-left reports-table-border-right'>Branch</th>
                <th className='reports-table-border-left reports-table-border-right'>Total</th>
              </tr>
            </thead>
            <tbody>
              {groupedExpenses.length ? groupedExpenses.map((group, idx) => (
                <tr key={`${group.branch_name}-${idx}`}>
                  <td className='reports-table-border-left reports-table-border-right'>{group.branch_name}</td>
                  <td className='reports-table-border-left reports-table-border-right'>{formatMoney(group.branch_total)}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={2} className='reports-table-border-left reports-table-border-right'>No branch totals available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Summary;
