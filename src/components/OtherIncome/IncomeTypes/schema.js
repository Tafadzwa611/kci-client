import * as yup from 'yup';

export const addSchema = yup.object().shape({
  name: yup.string().required('Required'),
  is_active: yup.boolean(),
  date_of_account: yup.string().required('Required'),
  currency_id: yup.number().integer().required('Required'),
});