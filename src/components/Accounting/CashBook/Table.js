import React from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const SECTION_CONFIG = [
  { key: 'upfront_fees', label: 'ESTABLISHMENT FEE RECEIVED' },
  { key: 'payments', label: 'RECEIPT' },
  { key: 'transfers', label: 'TRANSFER' },
  { key: 'expenses', label: 'EXPENSE' },
  { key: 'disbursements', label: 'LOAN DISBURSED' },
  { key: 'manual_entries', label: 'MANUAL ENTRIES' },
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

const buildDisplayRows = (statement) => {
  const rows = [];
  let runningBalance = toNumber(statement.balance_bd || statement.opening_balance);

  rows.push({
    kind: 'opening',
    cells: ['Opening Balance', '', '', '', '', toNumber(statement.opening_balance).toFixed(2), runningBalance.toFixed(2)],
  });

  SECTION_CONFIG.forEach(({ key, label }) => {
    const entries = sortByValueDate(statement[key] || []);
    if (!entries.length) return;

    rows.push({ kind: 'category', cells: [label, '', '', '', '', '', ''] });
    let sectionNet = 0;

    entries.forEach((txn) => {
      const signedAmount = txn.type === 'payment' ? -toNumber(txn.amount) : toNumber(txn.amount);
      runningBalance += signedAmount;
      sectionNet += signedAmount;

      rows.push({
        kind: 'data',
        cells: [
          txn.client_name || txn.description || '-',
          txn.value_date || '-',
          txn.account_id || '-',
          txn.reference || '-',
          txn.description || txn.type || '-',
          formatAmount(txn.amount, txn.type),
          '',
        ],
      });
    });

    rows.push({
      kind: 'subtotal',
      cells: [`Sub Total - ${label}`, '', '', '', '', Math.abs(sectionNet).toFixed(2), ''],
    });
  });

  rows.push({
    kind: 'grand-total',
    cells: [
      'Report Totals',
      '',
      '',
      '',
      '',
      `${toNumber(statement.total_receipts || 0).toFixed(2)} / ${toNumber(statement.total_payments || 0).toFixed(2)}`,
      toNumber(statement.balance_cd).toFixed(2),
    ],
  });

  return rows;
};

function Table({ statement }) {
  const generatedAt = new Date().toLocaleString();
  const fromDate = statement.report_start_date;
  const toDate = statement.report_close_date;
  const rows = buildDisplayRows(statement);

  const exportPDF = () => {
    const doc = new jsPDF({ orientation: 'landscape' });

    doc.setFontSize(12);
    doc.text(`Cashbook (${statement.currency || ''} ${statement.account_name || statement.account_id || '-'})`, 14, 14);
    doc.setFontSize(9);
    doc.text(`From: ${fromDate || '-'}   To: ${toDate || '-'}`, 14, 20);
    doc.text(`Generated: ${generatedAt}`, 220, 20);

    autoTable(doc, {
      startY: 26,
      head: [['Description', 'Date', 'LoanCode', 'Ref No', 'Type', 'Amount', 'Cumulative Balance']],
      body: rows.map((row) => row.cells),
      styles: { fontSize: 8, cellPadding: 1.5 },
      headStyles: { fillColor: [184, 184, 184], textColor: [0, 0, 0] },
      didParseCell: (data) => {
        const rowType = rows[data.row.index]?.kind;
        if (rowType === 'category') {
          data.cell.styles.fontStyle = 'bold';
          data.cell.styles.fillColor = [225, 225, 225];
        }
        if (rowType === 'subtotal' || rowType === 'grand-total' || rowType === 'opening') {
          data.cell.styles.fontStyle = 'bold';
        }
      },
    });

    doc.save(`cashbook-${statement.account_id || 'report'}.pdf`);
  };

  return (
    <div style={{ width: '100%', overflowX: 'auto' }}>
      <div className='cashbook-report__paper'>
        <div className='cashbook-report__head'>
          <p className='cashbook-report__title' style={{fontSize:'0.75rem', fontWeight:'0.75rem'}}>Cashbook (Account {statement.currency} {statement.account_name})</p>
          <div>{generatedAt}</div>
        </div>

        <div className='cashbook-report__meta' style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'1rem 0'}}>
          <div>
            <strong>From:</strong> {fromDate}
            <strong style={{ marginLeft: '1.2rem' }}>To:</strong> {toDate}
          </div>
          <div>
            <button
              type='button'
              className='btn btn-default'
              onClick={exportPDF}
              style={{ marginLeft: '1.2rem' }}
            >
              Export PDF
            </button>
          </div>
        </div>

        <table className='table table-condensed cashbook-report__table'>
          <thead>
            <tr className='journal-details header'>
              <th>Description</th>
              <th>Date</th>
              <th>LoanCode</th>
              <th>Ref_No</th>
              <th>Type</th>
              <th className='text-right'>Amount</th>
              <th className='text-right'>Cumulative_Balance</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row, index) => (
              <tr key={`${row.kind}-${index}`}>
                <td>{row.cells[0]}</td>
                <td>{row.cells[1]}</td>
                <td>{row.cells[2]}</td>
                <td>{row.cells[3]}</td>
                <td>{row.cells[4]}</td>
                <td className='text-right'>{row.cells[5]}</td>
                <td className='text-right'>{row.cells[6]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
