import * as yup from 'yup';

export const addOtherIncomeTypeSchema = yup.object().shape({
  name: yup.string().required('Required').max(300)
});
