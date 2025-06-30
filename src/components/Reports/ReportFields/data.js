const REPORT_FIELDS = {
    CLIENTS_REPORT: {
        fullname: 'Fullname',
        client_id: 'Client Number',
        phone_number: 'Phone Number',
        gender: 'Gender',
        status: 'Status',
        loan_count: 'Loan Count',
        sum_principal: 'Principal',
        sum_principal_due: 'Total Principal Due',
        sum_principal_paid: 'Principal Paid',
        sum_interest: 'Interest',
        sum_interest_paid: 'Interest Paid',
        sum_interest_amount_due: 'Total Interest Due',
        sum_fees: 'Fees',
        sum_fees_due: 'Total Fees Due',
        sum_fees_paid: 'Fees Paid',
        sum_penalty: 'Penalty',
        sum_penalty_due: 'Total Penalty Due',
        sum_penalty_paid: 'Penalty Paid',
        total_amount: 'Total Amount',
        total_due: 'Total Due',
        total_paid: 'Total Paid'
    }
}

const getSwappedColumn = (reportType) => {
    const swappedColumns = Object.fromEntries(
        Object.entries(REPORT_FIELDS[reportType]).map(([key, value]) => [value, key])
    );
    return swappedColumns;
};

export { REPORT_FIELDS, getSwappedColumn };