import * as yup from 'yup';

export const addSchema = yup.object().shape({
    data_export_name: yup.string().required('Required'),
    data_export_file_format: yup.string().required('Required'),
    base_entity: yup.string().required('Required'),
});