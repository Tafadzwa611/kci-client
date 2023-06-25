import * as yup from 'yup';

export const addSchema = yup.object().shape({
    fullname: yup.string().required('Required'),
    shortname: yup.string().required('Required'),
    date_created: yup.string().required('Required'),
});