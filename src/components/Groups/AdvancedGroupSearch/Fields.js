const statusTypes = [
    {name: 'Pending Approval', label: 'Pending Approval'},
    {name: 'Inactive', label: 'Inactive'},
    {name: 'Active', label: 'Active'},
    {name: 'Rejected', label: 'Rejected'},
    {name: 'Blacklisted', label: 'Blacklisted'},
    {name: 'Left', label: 'Left'},
];
  
const branches = [];
  
const fields = [
    {name: 'group_date', label: 'Group Date', datatype: 'date'},
    {name: 'registration_date', label: 'Group Registration Date', datatype: 'date'},
    {name: 'status', label: 'Status', values: statusTypes, datatype: 'select'},
    {name: 'group_name', label: 'Group Name', datatype: 'text'},
    {name: 'address', label: 'Address', datatype: 'text'},
    {name: 'group_phone_number', label: 'Group Phone Number', datatype: 'text'},
    {name: 'group_account_number', label: 'Group Account Number', datatype: 'text'},
    {name: 'group_id', label: 'Group ID', datatype: 'text'},
    {name: 'group_type__name', label: 'Group Type', datatype: 'text'},
];
  
  export default fields;