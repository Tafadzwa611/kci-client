import * as yup from 'yup';

export const addBranchSchema = yup.object().shape({
  name: yup.string().required('Required').max(300),
  branch_code: yup.string().required('Required').max(5)
});
