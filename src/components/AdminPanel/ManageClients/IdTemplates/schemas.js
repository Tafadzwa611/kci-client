import * as yup from 'yup';

export const createTemplateSchema = yup.object().shape({
  id_type: yup.string().required('Required'),
  issuer: yup.string().required('Required'),
  template: yup.string().matches(/^[@#$\s\-]+$/, {message: 'You can only use @, #, $, - and an empty space.'}).required('Required')
});

export const editTemplateSchema = yup.object().shape({
  id_type: yup.string().required('Required'),
  issuer: yup.string().required('Required'),
  is_active: yup.bool().required('Required')
});