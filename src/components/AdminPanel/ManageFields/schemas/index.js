import * as yup from 'yup';
import { dataTypes } from '../data';

export const createFieldSetSchema = yup.object().shape({
  name: yup.string().required('Required'),
  entity_type: yup.string().oneOf(['CLIENT'], 'Invalid').required('Required'),
  field_set_type: yup.string().oneOf(['SINGLE', 'MULTIPLE'], 'Invalid').required('Required')
});

export const updateFieldSetSchema = yup.object().shape({
  name: yup.string().required('Required'),
  active: yup.bool().required('Required')
});

export const createFieldSchema = yup.object().shape({
  name: yup.string().required('Required'),
  data_type: yup.string().oneOf(Object.keys(dataTypes), 'Invalid').required('Required'),
  is_required: yup.bool(),
  select_opts: yup.array().of(yup.string()),
  text_format: yup.string().matches(/^[@#$]+$/, {message: 'Only @, # and $ can be used.'})
});