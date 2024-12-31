import React from 'react';
import { 
    ModalSubmit,
    NonFieldErrors,
    Modal,
    CustomSelect,
    CustomInput,
    CustomPhoneNumber
} from '../../../common';
import { Form, Formik } from 'formik';
import axios from 'axios';
import Cookies from 'js-cookie';

function EditNok({client, setClient, setOpen, nokId}) {
    const nok = client.next_of_kin_list.find(nok => nok.id == nokId);
    const initialValues = {
        ...nok,
        phone_number: {countryCode: nok.phone_number.split(' ')[0], phoneNumber: nok.phone_number.split(' ')[1]},
    };

    const onSubmit = async (values, actions) => {
        try {
            const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
            await axios.post(`/clientsapi/edit_nok/${nokId}/`, {...values, phone_number: `${values.phone_number.countryCode} ${values.phone_number.phoneNumber}`}, CONFIG);
            setClient(curr => {
                const nok = curr.next_of_kin_list.find(nok => nok.id == nokId);
                nok.first_name = values.first_name;
                nok.last_name = values.last_name;
                nok.gender = values.gender;
                nok.relationship = values.relationship;
                nok.phone_number = `${values.phone_number.countryCode} ${values.phone_number.phoneNumber}`;
                nok.address = values.address;
                nok.city = values.city;
                nok.country = values.country;
                nok.ownership = values.ownership;
                return curr
            });
            setOpen(null);
        } catch (error) {
            console.log(error);
            if (error.message === 'Network Error') {
                actions.setErrors({responseStatus: 'Network Error'});
            } else if (error.response.status >= 400 && error.response.status < 500) {
                actions.setErrors({responseStatus: error.response.status, ...error.response.data});
            } else {
                actions.setErrors({responseStatus: error.response.status});
            }
        }
    }

    return (
        <Modal open={true} setOpen={setOpen} title='Edit Next Of Kin' text='add'>
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
                {({ errors, isSubmitting, setFieldValue }) => (
                    <Form>
                        <NonFieldErrors errors={errors}>
                            <div className='create_modal_container'>
                                <div>
                                    <CustomInput label='First Name' name='first_name' type='text' required/>
                                    <CustomInput label='Last Name' name='last_name' type='text' required/>
                                    <CustomSelect label='Gender' name='gender' required>
                                        <option value=''>------</option>
                                        <option value='MALE'>MALE</option>
                                        <option value='FEMALE'>FEMALE</option>
                                    </CustomSelect>
                                    <CustomInput label='Relationship' name='relationship' type='text' required/>
                                    <CustomPhoneNumber label='Phone Number' name='phone_number' setFieldValue={setFieldValue} required/>
                                    <CustomInput label='Address' name='address' type='text' required/>
                                    <CustomInput label='City' name='city' type='text' required/>
                                    <CustomInput label='Country' name='country' type='text' required/>
                                    <CustomSelect label='Ownership' name='ownership' required>
                                        <option value=''>------</option>
                                        <option value='OWNER'>OWNER</option>
                                        <option value='RENTING'>RENTING</option>
                                        <option value='OTHER'>OTHER</option>
                                    </CustomSelect>
                                </div>
                                <ModalSubmit isSubmitting={isSubmitting} setOpen={setOpen}/>
                            </div>
                        </NonFieldErrors>
                    </Form>
                )}
            </Formik>
        </Modal>
    )
}

export default EditNok
