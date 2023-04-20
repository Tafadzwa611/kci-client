import * as yup from 'yup';

export const addSchema = yup.object().shape({
    expense_name: yup.string().required('Required'),
    expense_type_id: yup.number().integer().required('Required'),
    fund_account_id: yup.number().integer().required('Required'),
    expense_amount: yup.number().required('Required'),
    expense_date: yup.string().required('Required'),
    reference: yup.string(),
    description: yup.string(),
});