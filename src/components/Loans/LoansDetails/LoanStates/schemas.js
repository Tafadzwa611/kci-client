import * as yup from 'yup';

export const approveLoanSchema = yup.object().shape({
    expected_disbursement_date: yup.date().required('Required')
});