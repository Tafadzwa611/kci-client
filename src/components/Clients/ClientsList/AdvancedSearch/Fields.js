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

const branches = [];

const ownershipTypes = [
  {name: 'OWNER', label: 'OWNER'},
  {name: 'RENTING', label: 'RENTING'},
  {name: 'OTHER', label: 'OTHER'},
];

const fields = [
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
  {name: 'account_number', label: 'Bank Account Number', datatype: 'text'},
  {name: 'bank_name', label: 'Bank Name', datatype: 'text'},
  {name: 'bank_branch', label: 'Bank Branch', datatype: 'text'},
];

export default fields;