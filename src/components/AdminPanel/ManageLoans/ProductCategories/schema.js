import * as yup from 'yup';

export const addSchema = yup.object().shape({
  name: yup.string().required('Required'),
  is_active: yup.boolean().required('Required'),
});