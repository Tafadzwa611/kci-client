import * as yup from 'yup';

export const addTypeSchema = yup.object().shape({
  name: yup.string().required('Required').max(50)
});

export const editTypeSchema = yup.object().shape({
  name: yup.string().required('Required').max(50)
});