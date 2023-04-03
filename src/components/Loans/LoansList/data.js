export const statusClasses = {
  'Fully Paid': 'badge badge-success',
  'Early Settlement': 'badge badge-success',
  'Restructured': 'badge badge-dark',
  'Processing': 'badge badge-info-lighter',
  'Arrears': 'badge badge-danger',
  'Approved': 'badge badge-info-light',
  'Open': 'badge badge-info',
  'Over Paid': 'badge badge-warning',
  'Defaulted': 'badge badge-danger',
  'Rejected': 'badge badge-danger',
  'Written-Off': 'badge badge-dark',
}

const maybePluralize = (count, noun, suffix = 's') => `${count} ${noun}${count !== 1 ? suffix : ''}`;

export const getDuration = (repayment_cycle, number_of_repayments) => {
  if (repayment_cycle == 'Monthly') {
    return maybePluralize(number_of_repayments, 'Month')
  } else if (repayment_cycle == 'Daily') {
    return maybePluralize(number_of_repayments, 'Day')
  } else if (repayment_cycle == 'Weekly') {
    return maybePluralize(number_of_repayments, 'Week')
  } else if (repayment_cycle == 'Biweekly') {
    return maybePluralize(2 * number_of_repayments, 'Week')
  } else if (repayment_cycle == 'Bimonthly') {
    return maybePluralize(2 * number_of_repayments, 'Month')
  } else if (repayment_cycle == 'Quartely') {
    return maybePluralize(3 * number_of_repayments, 'Month')
  } else if (repayment_cycle == 'Every 4 Months') {
    return maybePluralize(4 * number_of_repayments, 'Month')
  } else if (repayment_cycle == 'Semi-annually') {
    return maybePluralize(6 * number_of_repayments, 'Month')
  } else if (repayment_cycle == 'Yearly') {
    return maybePluralize(number_of_repayments, 'Year')
  }
}

export const statusValues = [
  'Processing',
  'Open',
  'Arrears',
  'Fully Paid',
  'Over Paid',
  'Rejected',
  'Written-Off',
  'Restructured',
  'Early Settlement'
];