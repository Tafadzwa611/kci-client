import React from 'react';
import ReceiptNumbersReport from './ReceiptNumbersReport';

const VOUCHER_REPORT_CONFIG = {
  typeId: 2,
  title: 'Voucher',
  endpoint: '/reportsapi/voucher_numbers/',
  usedForOptions: ['Expense', 'Orphaned', 'Unused'],
  exportTableId: 'vouchers',
  exportFilename: 'Vouchers',
  exportButtonId: 'voucher-table-xls-button',
};

function VoucherNumbers() {
  return <ReceiptNumbersReport reportConfig={VOUCHER_REPORT_CONFIG} />;
}

export default VoucherNumbers;
