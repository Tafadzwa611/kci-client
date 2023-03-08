import * as yup from 'yup';

export const addRoleSchema = yup.object().shape({
  role: yup.string().required('Required').max(300)
});
