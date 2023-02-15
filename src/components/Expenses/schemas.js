import * as yup from 'yup';

export const addExpenseTypeSchema = yup.object().shape({
  name: yup.string().required('Required').max(300)
});
