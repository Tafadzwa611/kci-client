import * as yup from 'yup';

export const addSchema = yup.object().shape({
    otherincome_name: yup.string().required('Required'),
    income_type_id: yup.number().integer().required('Required'),
    fund_account_id: yup.number().integer().required('Required'),
    income_amount: yup.number().required('Required'),
    income_date: yup.string().required('Required'),
    reference: yup.string(),
    description: yup.string(),
});