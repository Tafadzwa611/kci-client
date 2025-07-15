const REPORT_FIELDS = {
    CLIENTS_REPORT: {
        fullname: 'Fullname',
        client_id: 'Client_Number',
        phone_number: 'Phone_Number',
        gender: 'Gender',
        status: 'Status',
        loan_count: 'Loan_Count',
        sum_principal: 'Principal',
        sum_principal_due: 'Total_Principal_Due',
        sum_principal_paid: 'Principal_Paid',
        sum_interest: 'Interest',
        sum_interest_paid: 'Interest_Paid',
        sum_interest_amount_due: 'Total_Interest_Due',
        sum_fees: 'Fees',
        sum_fees_due: 'Total_Fees_Due',
        sum_fees_paid: 'Fees_Paid',
        sum_penalty: 'Penalty',
        sum_penalty_due: 'Total_Penalty_Due',
        sum_penalty_paid: 'Penalty_Paid',
        total_amount: 'Total_Amount',
        total_due: 'Total_Due',
        total_paid: 'Total_Paid'
    }
}

const getSwappedColumn = (reportType) => {
    const swappedColumns = Object.fromEntries(
        Object.entries(REPORT_FIELDS[reportType]).map(([key, value]) => [value, key])
    );
    return swappedColumns;
};

export { REPORT_FIELDS, getSwappedColumn };