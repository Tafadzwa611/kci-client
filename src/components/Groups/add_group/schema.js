import * as yup from 'yup';

export const createGroupSchema = yup.object().shape({
  name: yup.string().required('Required').max(50),
  group_type_id: yup.number().integer().required('Required'),
  address: yup.string().required('Required'),
  group_phone_number: yup.object().shape({
    countryCode: yup.string().required(),
    phoneNumber: yup.string().required('Required'),
  }),
});
