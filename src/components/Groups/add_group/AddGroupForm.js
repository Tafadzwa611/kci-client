// import React from 'react';
// import { Form, Formik } from 'formik';
// import { onModalSubmit } from './utils';
// import { addGroupSchema } from './schemas';
// import { Modal, NonFieldErrors, CustomInput, CustomSelect, ModalSubmit, CustomDatePicker } from '../../../common';

// const AddGroupForm = ({groupTypes, setExpenseTypes, loan_officers, memberslist}) => {
//     const initialValues = {group_name: '', group_date: '', address: '', group_phone_number: '', group_bank_name: '',
//                             group_account_number: '', group_officer_id: '', group_type_id: '', members: ''
//                             };

//     const onSubmit = async (values, actions) => {
//         const sideEffect = (jsonResp) => setExpenseTypes(curr => [jsonResp, ...curr]);
//         const url = '/clientsapi/add_group/';
//         onModalSubmit(values, 'post', url, actions.resetForm, setOpen, actions.setErrors, sideEffect);
//     }

//     return (
//         <Formik initialValues={initialValues} validationSchema={addGroupSchema} onSubmit={onSubmit}>
//             {({ isSubmitting, errors, setFieldValue}) => (
//             <Form>
//                 <NonFieldErrors errors={errors}>
//                     <CustomInput label='Group Name' name='group_name' type='text'/>
//                     <CustomDatePicker label='Group Date' setFieldValue={setFieldValue} name='group_date' type='date'/>
//                     <CustomSelect label='Group Type' name='group_type_id'>
//                         <option value=''>------</option>
//                         {groupTypes.map(gtype => <option key={gtype.id} value={gtype.id}>{gtype.name}</option>)}
//                     </CustomSelect>
//                     <CustomSelect label='Group Type' name='members'>
//                         <option value=''>------</option>
//                         {memberslist.map(member => <option key={member.id} value={member.id}>{member.fullname}</option>)}
//                     </CustomSelect>
//                     <CustomInput label='Group Phone Number' name='group_phone_number' type='text'/>
//                     <CustomInput label='Group Address' name='address' type='text'/>
//                     <CustomInput label='Group Bank Name' name='group_bank_name' type='text'/>
//                     <CustomInput label='Group Bank Account' name='group_account_number' type='text'/>
//                     <CustomSelect label='Loan Officer' name='loan_officer_id'>
//                         <option value=''>------</option>
//                         {loan_officers.map(officer => <option key={officer.id} value={officer.id}>{officer.first_name} {officer.last_name}</option>)}
//                     </CustomSelect>
//                     <ModalSubmit isSubmitting={isSubmitting} />
//                 </NonFieldErrors>
//             </Form>
//             )}
//         </Formik>
//     )
// }

// export default AddGroupForm;


import React from 'react'

function AddGroupForm() {
    return (
        <div>
            Add Group
        </div>
    )
}

export default AddGroupForm

