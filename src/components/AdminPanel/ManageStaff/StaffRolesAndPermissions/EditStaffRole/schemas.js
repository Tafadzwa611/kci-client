import * as yup from 'yup';

export const editStaffRoleSchema = yup.object().shape({
  role: yup.string().required('Required').max(300)
});