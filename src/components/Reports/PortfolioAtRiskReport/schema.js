import * as yup from 'yup';

export const addSchema = yup.object().shape({
    lower_limit: yup.number(),
    upper_limit: yup.number().moreThan(yup.ref('lower_limit'), "Upper limit should be greater than lower limit"),
});