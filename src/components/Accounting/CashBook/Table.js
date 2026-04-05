import React from 'react';

const SECTION_CONFIG = [
  { key: 'upfront_fees', label: 'ESTABLISHMENT FEE RECEIVED' },
  { key: 'payments', label: 'RECEIPT' },
  { key: 'transfers', label: 'TRANSFER' },
  { key: 'expenses', label: 'EXPENSE' },
  { key: 'disbursements', label: 'LOAN DISBURSED' },
];

const toNumber = (value) => Number(value || 0);

const parseDDMMYYYY = (value) => {
  if (!value || typeof value !== 'string') return new Date(0);
  const [day, month, year] = value.split('/').map(Number);
  return new Date(year, (month || 1) - 1, day || 1);
};

const formatAmount = (value, type) => {
  const amount = toNumber(value).toFixed(2);
  return type === 'payment' ? `(${amount})` : amount;
};

const sortByValueDate = (rows = []) =>
  rows.slice().sort((a, b) => parseDDMMYYYY(a.value_date) - parseDDMMYYYY(b.value_date));

function Table({ statement }) {
  let runningBalance = toNumber(statement.balance_bd || statement.opening_balance);
  const generatedAt = new Date().toLocaleString();
  const fromDate = statement.report_start_date || '-';
  const toDate = statement.report_close_date || '-';

  return (
    <div style={{ width: '100%', overflowX: 'auto' }}>
      <div className='cashbook-report__paper'>
        <div className='cashbook-report__head'>
          <h4 className='cashbook-report__title'>Cashbook (Account {statement.account_id || '-'})</h4>
          <div>{generatedAt}</div>
        </div>

        <div className='cashbook-report__meta'>
          <strong>From:</strong> {fromDate}
          <strong style={{ marginLeft: '1.2rem' }}>To:</strong> {toDate}
        </div>

        <table className='table table-condensed cashbook-report__table'>
          <thead>
            <tr>
              <th>Description</th>
              <th>LoanCode</th>
              <th>Ref No</th>
              <th>Type</th>
              <th className='text-right'>Amount</th>
              <th className='text-right'>Cumulative Balance</th>
            </tr>
          </thead>

          <tbody>
            <tr className='cashbook-report__date-row'>
              <td colSpan='6'>Opening Balance</td>
            </tr>
            <tr>
              <td>Opening Balance</td>
              <td></td>
              <td></td>
              <td></td>
              <td className='text-right'>{toNumber(statement.opening_balance).toFixed(2)}</td>
              <td className='text-right'>{runningBalance.toFixed(2)}</td>
            </tr>

            {SECTION_CONFIG.map(({ key, label }) => {
              const rows = sortByValueDate(statement[key] || []);
              if (!rows.length) return null;

              let sectionNet = 0;

              return (
                <React.Fragment key={key}>
                  <tr className='cashbook-report__category-row'>
                    <td colSpan='6'>{label}</td>
                  </tr>

                  {rows.map((txn) => {
                    const signedAmount = txn.type === 'payment' ? -toNumber(txn.amount) : toNumber(txn.amount);
                    runningBalance += signedAmount;
                    sectionNet += signedAmount;

                    return (
                      <tr key={`${key}-${txn.id}`}>
                        <td>{txn.client_name || txn.description || '-'}</td>
                        <td>{txn.account_id || '-'}</td>
                        <td>{txn.reference || '-'}</td>
                        <td>{txn.description || txn.type || '-'}</td>
                        <td className='text-right'>{formatAmount(txn.amount, txn.type)}</td>
                        <td className='text-right'>{runningBalance.toFixed(2)}</td>
                      </tr>
                    );
                  })}

                  <tr className='cashbook-report__subtotal-row'>
                    <td colSpan='4'>Sub Total - {label}</td>
                    <td className='text-right'>{Math.abs(sectionNet).toFixed(2)}</td>
                    <td className='text-right'>{runningBalance.toFixed(2)}</td>
                  </tr>
                </React.Fragment>
              );
            })}

            <tr className='cashbook-report__subtotal-row'>
              <td colSpan='4'>Report Totals</td>
              <td className='text-right'>
                {toNumber(statement.total_receipts || 0).toFixed(2)} / {toNumber(statement.total_payments || 0).toFixed(2)}
              </td>
              <td className='text-right'>{toNumber(statement.balance_cd || runningBalance).toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
