import * as yup from 'yup';

const minAmount = 0;
const minMsg = 'Minimum allowed value is 0.'
const minInt = 1;
const minIntMsg = 'Minimum allowed value is 1.';

export const feeSchema = yup.object().shape({
  loanfee_id: yup.number().integer().required('Required'),
  value: yup.number().min(minAmount, minMsg).required('Required'),
});

export const createLoanProductSchema = yup.object().shape({
  name: yup.string().required('Required'),
  loan_product_id: yup.string(),
  description: yup.string(),
  product_type: yup.string().oneOf(['Fixed Term Loan', 'Interest-Free Loan'], 'Invalid').required('Required'),
  is_active: yup.boolean(),
  currency_id: yup.number().integer().required('Required'),
  minimum_principal_amount: yup.number().min(minAmount, minMsg).required('Required'),
  maximum_principal_amount: yup.number().min(minAmount, minMsg).required('Required'),
  interest_method: yup.string().oneOf(['Flat Rate', 'Reducing Balance - Equal Installments', 'Reducing Balance - Equal Principal'], 'Invalid').required('Required'),
  interest_interval: yup.string().oneOf(['/Day', '/Week', '/Month', '/Year'], 'Invalid').required('Required'),
  minimum_interest_rate: yup.number().min(minAmount, minMsg).required('Required'),
  maximum_interest_rate: yup.number().min(minAmount, minMsg).required('Required'),
  schedule_strategy: yup.string().oneOf([
    'Same Day',
    'Everyday',
    'Every Seven Days',
    'Every Mon',
    'Every Tue',
    'Every Wed',
    'Every Thu',
    'Every Fri',
    'Every Sat',
    'Every Sun',
    'Biweek Interval',
    'First Day Of Next Month',
    'Last Day Of Next Month',
    'Monthly Interval',
    'Bimonth Interval',
    'Quarter Interval',
    'Quadrimester Interval',
    'Semi-annual Interval',
    'Year Interval'
  ], 'Invalid').required('Required'),
  action_on_holiday: yup.string().oneOf(['NXT', 'PREV', 'EXT'], 'Invalid'),
  loan_duration_time_unit: yup.string().oneOf(['Days', 'Weeks', '2 Weeks', 'Months', '2 Months', '3 Months', '4 Months', '6 Months', 'Years'], 'Invalid').required('Required'),
  minimum_loan_duration: yup.number().min(minInt, minIntMsg).integer().required('Required'),
  maximum_loan_duration: yup.number().min(minInt, minIntMsg).integer().required('Required'),
  number_of_decimal_places: yup.string().oneOf(['0.01', '0.1', '1'], 'Invalid').required('Required'),
  rounding_scheme: yup.string().oneOf(['ROUND_HALF_UP', 'ROUND_UP', 'ROUND_DOWN'], 'Invalid').required('Required'),
  allow_early_settlement_on_penalties: yup.boolean(),
  repayment_order: yup.object(),
  client_type: yup.string().oneOf(['Clients', 'Groups', 'Groups (solidarity)'], 'Invalid').required('Required'),
  allowed_branches: yup.array().of(yup.number().integer()),
  fees: yup.array().of(feeSchema),
  action_on_loan_default: yup.string().oneOf(['Do Nothing', 'Add Penalty', 'Add Interest'], 'Invalid').required('Required'),
  apply_late_repayment_penalty_on: yup
    .string()
    .oneOf([
      'Principal',
      'Principal + Interest',
      'Org Principal',
      'Interest',
      'Org Interest',
      'Principal + Penalty',
      'Principal + Interest + Fees + Penalty'
    ], 'Invalid')
    .when(
      'action_on_loan_default', {
        is: 'Add Penalty',
        then: yup.string().required('Required')
    }),
  penalty_charged_per: yup
    .string()
    .oneOf(['/Day', '/Week', '/Month', '/Year'], 'Invalid')
    .when(
    'action_on_loan_default', {
      is: 'Add Penalty',
      then: yup.string().required('Required')
    }),
  late_repayment_penalty_percentage: yup
    .number()
    .min(minAmount, minMsg)
    .when(
    'action_on_loan_default', {
      is: 'Add Penalty',
      then: yup.number().required('Required')
    }),
  grace_period: yup
    .number()
    .min(0, 'Minimum allowed value is 0.')
    .integer()
    .when(
    'action_on_loan_default', {
      is: 'Add Penalty',
      then: yup.number().required('Required')
    }),
});

export const editLoanProductSchema = createLoanProductSchema.shape({
  loan_product_id: yup.string().required('Required'),
});