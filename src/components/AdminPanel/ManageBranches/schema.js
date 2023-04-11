import * as yup from 'yup';

export const addSchema = yup.object().shape({
  name: yup.string().required('Required').max(300),
  geographical_location: yup.string(),
  branch_code: yup.string().required('Required').max(5),
  date_of_opening: yup.date().required('Required'),
});
