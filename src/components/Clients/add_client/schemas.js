import * as yup from 'yup';

export const createClientSchema = yup.object().shape({
  client_type: yup.string().oneOf(['individual', 'corporate'], 'Invalid option').required('Required'),
  first_name: yup.string().required('Required'),
  last_name: yup.string().required('Required'),
  client_type_id: yup.number('Must be a number').positive('Must be a positive number').integer('Must be an integer.').min(1, 'Should be greater than 1.'),
  gender: yup.string().oneOf(['MALE', 'FEMALE'], 'Invalid option').required('Required'),
  date_of_birth: yup.date().max(new Date(), 'Date cannot be later than today.').required('Required'),
  registration_date: yup.date().max(new Date(), 'Date cannot be later than today.').required('Required'),
});