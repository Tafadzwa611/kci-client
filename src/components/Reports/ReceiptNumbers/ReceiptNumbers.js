import React from 'react';
import ReceiptNumbersReport from './ReceiptNumbersReport';

const RECEIPT_REPORT_CONFIG = {
  typeId: 1,
  title: 'Receipt',
  endpoint: '/reportsapi/receipt_numbers/',
  usedForOptions: ['Payment', 'Orphaned', 'Unused'],
  exportTableId: 'receipts',
  exportFilename: 'Receipts',
  exportButtonId: 'receipt-table-xls-button',
};

function ReceiptNumbers() {
  return <ReceiptNumbersReport reportConfig={RECEIPT_REPORT_CONFIG} />;
}

export default ReceiptNumbers;
