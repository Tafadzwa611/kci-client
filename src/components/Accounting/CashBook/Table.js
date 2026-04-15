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

const formatSubtotal = (value) => {
  const amount = Math.abs(toNumber(value)).toFixed(2);
  return toNumber(value) < 0 ? `(${amount})` : amount;
};

const buildDateGroups = (statement) => {
  const grouped = {};

  SECTION_CONFIG.forEach(({ key }) => {
    sortByValueDate(statement[key] || []).forEach((txn) => {
      const date = txn.value_date || '-';
      if (!grouped[date]) grouped[date] = {};
      if (!grouped[date][key]) grouped[date][key] = [];
      grouped[date][key].push(txn);
    });
  });

  return Object.entries(grouped).sort(
    ([dateA], [dateB]) => parseDDMMYYYY(dateA) - parseDDMMYYYY(dateB)
  );
};

const buildDisplayRows = (statement) => {
  const rows = [];
  let runningBalance = toNumber(statement.balance_bd || statement.opening_balance);

  rows.push({
    kind: 'opening',
    cells: ['Opening Balance', '', '', '', '', toNumber(statement.opening_balance).toFixed(2), runningBalance.toFixed(2)],
  });

  buildDateGroups(statement).forEach(([date, sections]) => {
    rows.push({ kind: 'date', cells: [date, '', '', '', '', '', ''] });
    let dateNet = 0;

    SECTION_CONFIG.forEach(({ key, label }) => {
      const entries = sections[key] || [];
      if (!entries.length) return;

      rows.push({ kind: 'category', cells: [label, '', '', '', '', '', ''] });
      let sectionNet = 0;

      entries.forEach((txn) => {
        const signedAmount = txn.type === 'payment' ? -toNumber(txn.amount) : toNumber(txn.amount);
        runningBalance += signedAmount;
        dateNet += signedAmount;
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
            runningBalance.toFixed(2),
          ],
        });
      });

      rows.push({
        kind: 'section-subtotal',
        cells: [`Sub Total - ${label}`, '', '', '', '', formatSubtotal(sectionNet), runningBalance.toFixed(2)],
      });
    });

    rows.push({
      kind: 'date-subtotal',
      cells: [`Sub Total - ${date}`, '', '', '', '', formatSubtotal(dateNet), runningBalance.toFixed(2)],
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
      toNumber(statement.balance_cd || runningBalance).toFixed(2),
    ],
  });

  return rows;
};

const rowStyle = (kind) => {
  if (kind === 'date') return { background: '#b0b0b0', fontWeight: 700 };
  if (kind === 'category') return { fontWeight: 700 };
  if (kind === 'section-subtotal' || kind === 'date-subtotal' || kind === 'grand-total') return { fontWeight: 700, borderTop: '2px solid #444' };
  if (kind === 'opening') return { fontWeight: 700, background: '#fff' };
  return { background: '#fff' };
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
        const kind = rows[data.row.index]?.kind;
        if (kind === 'date' || kind === 'category') {
          data.cell.styles.fontStyle = 'bold';
          data.cell.styles.fillColor = [225, 225, 225];
        }
        if (kind === 'section-subtotal' || kind === 'date-subtotal' || kind === 'grand-total' || kind === 'opening') {
          data.cell.styles.fontStyle = 'bold';
        }
      },
    });

    doc.save(`cashbook-${statement.account_id || 'report'}.pdf`);
  };

  return (
    <div style={{ width: '100%', overflowX: 'auto' }}>
      <div style={{ background: '#fff', padding: '1.25rem', minWidth: '980px', border: '1px solid #ddd' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
          <h4 style={{ margin: 0, fontWeight: 700 }}>Cashbook (Account {statement.currency} {statement.account_name})</h4>
          <div>{generatedAt}</div>
        </div>

        <div style={{ marginBottom: '0.8rem' }}>
          <strong>From:</strong> {fromDate}
          <strong style={{ marginLeft: '1.2rem' }}>To:</strong> {toDate}
          <button
            type='button'
            className='btn btn-default'
            onClick={exportPDF}
            style={{ marginLeft: '1.2rem' }}
          >
            Export PDF
          </button>
        </div>

        <table className='table table-condensed' style={{ width: '100%', background: '#fff' }}>
          <thead>
            <tr>
              <th style={{ background: '#b8b8b8', borderColor: '#9c9c9c', color: '#111' }}>Description</th>
              <th style={{ background: '#b8b8b8', borderColor: '#9c9c9c', color: '#111' }}>Date</th>
              <th style={{ background: '#b8b8b8', borderColor: '#9c9c9c', color: '#111' }}>LoanCode</th>
              <th style={{ background: '#b8b8b8', borderColor: '#9c9c9c', color: '#111' }}>Ref No</th>
              <th style={{ background: '#b8b8b8', borderColor: '#9c9c9c', color: '#111' }}>Type</th>
              <th className='text-right' style={{ background: '#b8b8b8', borderColor: '#9c9c9c', color: '#111' }}>Amount</th>
              <th className='text-right' style={{ background: '#b8b8b8', borderColor: '#9c9c9c', color: '#111' }}>Cumulative Balance</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row, index) => (
              <tr key={`${row.kind}-${index}`} style={rowStyle(row.kind)}>
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
