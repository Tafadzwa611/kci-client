import * as yup from 'yup';

export const createGroupSchema = yup.object().shape({
  name: yup.string().required('Required').max(50)
});
