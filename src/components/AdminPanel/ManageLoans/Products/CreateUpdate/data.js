export const scheduleStrategies = {
  'Days': ['Everyday'],
  'Weeks': ['Every Mon', 'Every Tue', 'Every Wed', 'Every Thu', 'Every Fri', 'Every Sat', 'Every Sun', 'Every Seven Days'],
  '2 Weeks': ['Same Day', 'Biweek Interval'],
  'Months': ['Same Day', 'First Day Of Next Month', 'Last Day Of Next Month', 'Monthly Interval'],
  '2 Months': ['Same Day', 'Bimonth Interval'],
  '3 Months': ['Same Day', 'Quarter Interval'],
  '4 Months': ['Same Day', 'Quadrimester Interval'],
  '6 Months': ['Same Day', 'Semi-annual Interval'],
  'Years': ['Same Day', 'Year Interval'],
  '': []
};

export const initialFeeValues = {
  fee_name: '',
  fee_type: '',
  fee_payment: '',
  value: '',
  is_mandatory: false,
};

export const initialFormValues = {
  custom_field_set_id: '',
  required_on: '',
  ask_in_clients_portal: false
};

export const initialPenaltyValues = {
  charge_type: '',
  days: '',
  penalty_rate: ''
};