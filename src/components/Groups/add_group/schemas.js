import * as yup from 'yup';

export const addGroupSchema = yup.object().shape({
  group_name: yup.string().required('Required').max(50)
});
