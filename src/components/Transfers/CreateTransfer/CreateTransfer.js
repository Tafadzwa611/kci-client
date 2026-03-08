// import React from 'react';
// import TransferForm from './TransferForm';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import { removeEmptyValues } from '../../../utils/utils';

// function CreateTransfer({transfertypes}) {
//     const navigate = useNavigate();

//     const initialValues = {
//         transfertype_id: '',
//         amount: '',
//         receiving_branch_id: '',
//         reference: '',
//         description: '',
//         date_added: '',
//     };

//     const onSubmit = async (values, actions) => {
//         try {
//             const data = removeEmptyValues(values);
//             const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
//             const response = await axios.post('/acc-api/create_transfer/', data, CONFIG);
//             navigate({pathname: '/transfers/viewtransfers', search: `?transfer_id=${response.data.id}`});
//         } catch (error) {
//             if (error.message === "Network Error") {
//                 actions.setErrors({responseStatus: "Network Error"});
//             } else if (error.response.status >= 400 && error.response.status < 500) {
//                 actions.setErrors({responseStatus: error.response.status, ...error.response.data});
//             } else {
//                 actions.setErrors({responseStatus: error.response.status});
//             }
//         }
//     }

//     return (
//         <TransferForm
//             transfertypes={transfertypes}
//             initialValues={initialValues}
//             onSubmit={onSubmit}
//         />
//     )
// }

// export default CreateTransfer;

import React from 'react';
import TransferForm from './TransferForm';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { removeEmptyValues } from '../../../utils/utils';

function CreateTransfer({transfertypes}) {
    const navigate = useNavigate();

    const initialValues = {
        transfertype_id: '',
        amount: '',
        branch_id: '',               // ✅ CHANGED (was receiving_branch_id)
        reference: '',
        description: '',
        date_added: '',
    };

    const onSubmit = async (values, actions) => {
        try {
            const data = removeEmptyValues(values);
            const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
            const response = await axios.post('/acc-api/create_transfer/', data, CONFIG);

            navigate({pathname: '/transfers/viewtransfers', search: `?transfer_id=${response.data.id}`});
        } catch (error) {
            if (error.message === "Network Error") {
                actions.setErrors({responseStatus: "Network Error"});
            } else if (error.response && error.response.status >= 400 && error.response.status < 500) {  // ✅ safer
                actions.setErrors({responseStatus: error.response.status, ...error.response.data});
            } else if (error.response) {  // ✅ safer
                actions.setErrors({responseStatus: error.response.status});
            } else { // ✅ covers unknown errors
                actions.setErrors({responseStatus: "Unknown Error"});
            }
        } finally {
            actions.setSubmitting(false);   // ✅ ADDED (prevents stuck loading)
        }
    }

    return (
        <TransferForm
            transfertypes={transfertypes}
            initialValues={initialValues}
            onSubmit={onSubmit}
        />
    )
}

export default CreateTransfer;
