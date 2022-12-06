import * as yup from 'yup';

export const controlSchema = yup.object().shape({
  min_client_age: yup.number('Must be a number').positive('Must be a positive number').integer('Must be an integer.').min(1, 'Should be greater than 1.')
});