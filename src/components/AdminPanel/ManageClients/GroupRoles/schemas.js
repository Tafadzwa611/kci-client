import * as yup from 'yup';

export const addRoleSchema = yup.object().shape({
  name: yup.string().required('Required').max(50)
});

export const editRoleSchema = yup.object().shape({
  name: yup.string().required('Required').max(50)
});