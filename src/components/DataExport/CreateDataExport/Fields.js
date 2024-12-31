const genderTypes = [
  {name: 'FEMALE', label: 'Female'},
  {name: 'MALE', label: 'Male'},
];

const statusTypes = [
  {name: 'Pending Approval', label: 'Pending Approval'},
  {name: 'Inactive', label: 'Inactive'},
  {name: 'Active', label: 'Active'},
  {name: 'Rejected', label: 'Rejected'},
  {name: 'Blacklisted', label: 'Blacklisted'},
  {name: 'Left', label: 'Left'},
];

const ownershipTypes = [
  {name: 'OWNER', label: 'OWNER'},
  {name: 'RENTING', label: 'RENTING'},
  {name: 'OTHER', label: 'OTHER'},
];

const clientFields = [
  {name: 'date_of_birth', label: 'Date Of Birth', datatype: 'date'},
  {name: 'registration_date', label: 'Client Registration Date', datatype: 'date'},
  {name: 'gender', label: 'Gender', values: genderTypes, datatype: 'select'},
  {name: 'status', label: 'Status', values: statusTypes, datatype: 'select'},
  {name: 'fullname', label: 'Full Name', datatype: 'text'},
  {name: 'first_name', label: 'First Name', datatype: 'text'},
  {name: 'last_name', label: 'Last Name', datatype: 'text'},
  {name: 'client_id', label: 'Client Id', datatype: 'text'},
  {name: 'client_type__name', label: 'Client Type', datatype: 'text'},
  {name: 'email', label: 'Email', datatype: 'text'},
  {name: 'phone_number', label: 'Phone Number', datatype: 'text'},
  {name: 'phone_number_secondary', label: 'Phone Number Secondary', datatype: 'text'},
  {name: 'whatsapp_number', label: 'Whatsapp Number', datatype: 'text'},
  {name: 'home_phone', label: 'Home Phone', datatype: 'text'},
  {name: 'addresses__address', label: 'Client Address', datatype: 'text'},
  {name: 'addresses__ownership', label: 'Address Ownership', values: ownershipTypes, datatype: 'select'},
  {name: 'addresses__city', label: 'City', datatype: 'text'},
  {name: 'addresses__country', label: 'Country', datatype: 'text'},
  {name: 'noks__first_name', label: 'Next Of Kin First Name', datatype: 'text'},
  {name: 'noks__last_name', label: 'Next Of Kin Last Name', datatype: 'text'},
  {name: 'noks__phone_number', label: 'Next Of Kin Phone Number', datatype: 'text'},
  {name: 'noks__address', label: 'Next Of Kin Address', datatype: 'text'},
  {name: 'noks__city', label: 'Next Of Kin City', datatype: 'text'},
  {name: 'noks__country', label: 'Next Of Kin Country', datatype: 'text'},
  {name: 'noks__gender', label: 'Next Of Kin Gender', values: genderTypes, datatype: 'select'},
];

const groupFields = [
  {name: 'group_date', label: 'Group Date', datatype: 'date'},
  {name: 'registration_date', label: 'Registration Date', datatype: 'date'},
  {name: 'status', label: 'Status', values: statusTypes, datatype: 'select'},
  {name: 'group_name', label: 'Group Name', datatype: 'text'},
  {name: 'address', label: 'Address', datatype: 'text'},
  {name: 'group_id', label: 'Group ID', datatype: 'text'},
  {name: 'group_phone_number', label: 'Group Phone Number', datatype: 'text'},
  {name: 'group_type__name', label: 'Group Type Name', datatype: 'text'},
];

const loanFields = [
  {name: 'client__name', label: 'Client Name', datatype: 'text'},
  {name: 'client__gender', label: 'Client Gender', datatype: 'text'},
  {name: 'group__group_name', label: 'Group Name', datatype: 'text'},
  {name: 'loan_id', label: 'Loan ID', datatype: 'text'},
  {name: 'loan_added_on', label: 'Disbursement Date', datatype: 'date'},
  {name: 'approval_date', label: 'Approval Date', datatype: 'date'},
  {name: 'application_date', label: 'Application Date', datatype: 'date'},
];

const installmentStatusOpts = [
  {name: 'Pending', label: 'Pending'},
  {name: 'Paid', label: 'Paid'},
  {name: 'Overdue', label: 'Overdue'},
];

const installmentFields = [
  {name: 'period', label: 'Installment Number', datatype: 'number'},
  {name: 'payment_date', label: 'Installment Date', datatype: 'date'},
  {name: 'principal', label: 'Total Installment Principal', datatype: 'number'},
  {name: 'interest', label: 'Total Installment Interest', datatype: 'number'},
  {name: 'fees', label: 'Total Installment Fees', datatype: 'number'},
  {name: 'penalty', label: 'Total Installment Penalty', datatype: 'number'},
  {name: 'installment', label: 'Total Installment Installment', datatype: 'number'},
  {name: 'principal_due', label: 'Principal Balance', datatype: 'number'},
  {name: 'interest_due', label: 'Interest Balance', datatype: 'number'},
  {name: 'fees_due', label: 'Fees Balance', datatype: 'number'},
  {name: 'penalty_due', label: 'Penalty Balance', datatype: 'number'},
  {name: 'principal_on_settlement', label: 'Principal After Write-Off', datatype: 'number'},
  {name: 'interest_on_settlement', label: 'Interest After Write-Off/Early Settlement', datatype: 'number'},
  {name: 'penalty_on_settlement', label: 'Penalty After Write-Off/Early Settlement', datatype: 'number'},
  {name: 'fees_on_settlement', label: 'Fees After Write-Off/Early Settlement', datatype: 'number'},
  {name: 'status', label: 'Status', values: installmentStatusOpts, datatype: 'select'}
];


const txnTypeOpts = [
  {name: 'Disbursement', label: 'Disbursement'},
  {name: 'Fee Applied', label: 'Fee Applied'},
  {name: 'Interest Applied', label: 'Interest Applied'},
  {name: 'Penalty Applied', label: 'Penalty Applied'},
  {name: 'Penalty Reversed', label: 'Penalty Reversed'},
  {name: 'Repayment', label: 'Repayment'},
  {name: 'Refund', label: 'Refund'},
  {name: 'Repayment Reversed', label: 'Repayment Reversed'},
  {name: 'Interest Waived', label: 'Interest Waived'},
  {name: 'Penalty Waived', label: 'Penalty Waived'},
  {name: 'Fees Waived', label: 'Fees Waived'}
];

const entryTypeOpts = [
  {name: 'Dr', label: 'Debit'},
  {name: 'Cr', label: 'Credit'}
];

const txnFields = [
  {name: 'value_date', label: 'Value Date', datatype: 'date'},
  {name: 'txn_type', label: 'Transaction Name', values: txnTypeOpts, datatype: 'select'},
  {name: 'entry_type', label: 'Entry Type Dr/Cr', values: entryTypeOpts, datatype: 'select'},
  {name: 'amount', label: 'Amount', datatype: 'number'},
  {name: 'balance', label: 'Loan Balance', datatype: 'number'},
];

const ownershipOpts = [
  {name: 'OWNER', label: 'OWNER'},
  {name: 'RENTING', label: 'RENTING'}
];

const genderOpts = [
  {name: 'MALE', label: 'MALE'},
  {name: 'FEMALE', label: 'FEMALE'}
];

const nokFields = [
  {name: 'client__name', label: 'Client Name', datatype: 'text'},
  {name: 'first_name', label: 'First Name', datatype: 'text'},
  {name: 'last_name', label: 'Last Name', datatype: 'text'},
  {name: 'relationship', label: 'Relationship', datatype: 'text'},
  {name: 'phone_number', label: 'Phone Number', datatype: 'text'},
  {name: 'address', label: 'Address', datatype: 'text'},
  {name: 'city', label: 'City', datatype: 'text'},
  {name: 'country', label: 'Country', datatype: 'text'},
  {name: 'ownership', label: 'Ownership', values: ownershipOpts, datatype: 'select'},
  {name: 'gender', label: 'Gender', values: genderOpts, datatype: 'select'},
];

const addressFields = [
  {name: 'client__name', label: 'Client Name', datatype: 'text'},
  {name: 'address', label: 'Address', datatype: 'text'},
  {name: 'city', label: 'City', datatype: 'text'},
  {name: 'country', label: 'Country', datatype: 'text'},
  {name: 'ownership', label: 'Ownership', values: ownershipOpts, datatype: 'select'},
];

const groupMemberFields = [
  {name: 'group__group_name', label: 'Group Name', datatype: 'text'},
  {name: 'group__group_date', label: 'Group Date', datatype: 'date'},
  {name: 'group__registration_date', label: 'Group Registration Date', datatype: 'date'},
  {name: 'role__name', label: 'Group Role', datatype: 'text'},
  {name: 'group__status', label: 'Group Status', values: statusTypes, datatype: 'select'},
];

const collateralFields = [
  {name: 'collateral_type__name', label: 'Collateral Type Name', datatype: 'text'},
  {name: 'product_name', label: 'Collateral Name', datatype: 'text'},
  {name: 'value', label: 'Collateral Value', datatype: 'number'},
  {name: 'register_date', label: 'Registration Date', datatype: 'date'},
];

const journalStatusOpts = [
  {name: 'Pending', label: 'Pending'},
  {name: 'Approved', label: 'Approved'},
  {name: 'Rejected', label: 'Rejected'},
];

const balanceStatusOpts = [
  {name: 'Updated', label: 'Updated'},
  {name: 'Not Updated', label: 'Not Updated'},
];

const journalFields = [
  {name: 'amount_debited', label: 'Amount', datatype: 'number'},
  {name: 'status', label: 'Status', values: journalStatusOpts, datatype: 'select'},
  {name: 'balance_status', label: 'Balance Status', values: balanceStatusOpts, datatype: 'select'},
  {name: 'date_created', label: 'Value Date', datatype: 'date'},
  {name: 'auto_now_date_added', label: 'Date Entered', datatype: 'date'},
  {name: 'transaction_id', label: 'Transaction ID', datatype: 'text'},
  {name: 'client_name', label: 'Client Name', datatype: 'text'},
  {name: 'client_id', label: 'Client Number', datatype: 'text'},
];

const paymentFields = [
  {name: 'amount_paid', label: 'Amount Paid', datatype: 'number'},
  {name: 'principal_amount_paid', label: 'Principal Amount Paid', datatype: 'number'},
  {name: 'interest_amount_paid', label: 'Interest Amount Paid', datatype: 'number'},
  {name: 'fees', label: 'Fees Amount Paid', datatype: 'number'},
  {name: 'penalty', label: 'Penalty Amount Paid', datatype: 'number'},
  {name: 'money_to_be_refunded', label: 'Money To Be Refunded', datatype: 'number'},
  {name: 'date_paid', label: 'Date Entered', datatype: 'date'},
  {name: 'date_created', label: 'Payment Date', datatype: 'date'},
  {name: 'receipt_number', label: 'Receipt Number', datatype: 'text'},
  {name: 'notes', label: 'Notes', datatype: 'text'},
];

const getFields = base_entity => {
  return {
    CLIENT: clientFields,
    GROUP: groupFields,
    LOAN: loanFields,
    INSTALLMENT: installmentFields,
    TXN: txnFields,
    NOK: nokFields,
    ADDRESS: addressFields,
    MEMBER: groupMemberFields,
    COLLATERAL: collateralFields,
    JOURNAL: journalFields,
    PAYMENT: paymentFields,
  }[base_entity]
}

export {getFields};