import React, {useState} from 'react';
import { useField } from 'formik';

function ClientFields() {
    return (
        <div className='base__entity__fields'>
            <div>
                <CustomCheckboxFields label='First Name' name='first_name'/>
                <CustomCheckboxFields label='Last Name' name='last_name'/>
                <CustomCheckboxFields label='Fullname' name='fullname'/>
                <CustomCheckboxFields label='Gender' name='gender'/>
                <CustomCheckboxFields label='Date of Birth' name='date_of_birth'/>
                <CustomCheckboxFields label='Registration Date' name='registration_date'/>
                <CustomCheckboxFields label='Added On' name='added_on'/>
                <CustomCheckboxFields label='Updated On' name='updated'/>
                <CustomCheckboxFields label='Phone Number' name='phone_number'/>
                <CustomCheckboxFields label='Phone Number Secondary' name='phone_number_secondary'/>
                <CustomCheckboxFields label='Email' name='email'/>
                <CustomCheckboxFields label='Client ID' name='client_id'/>
                <CustomCheckboxFields label='Home Address' name='home_address'/>
                <CustomCheckboxFields label='Work Address' name='work_address'/>
                <CustomCheckboxFields label='Employer' name='employer'/>
                <CustomCheckboxFields label='Job Position' name='job_position'/>
                <CustomCheckboxFields label='Ec Number' name='ec_number'/>
                <CustomCheckboxFields label='Account Number' name='account_number'/>
                <CustomCheckboxFields label='Bank Name' name='bank_name'/>
                <CustomCheckboxFields label='Bank Branch' name='bank_branch'/>
                <CustomCheckboxFields label='Next of Kin One' name='next_of_kin'/>
                <CustomCheckboxFields label='Relationship One' name='relationship'/>
                <CustomCheckboxFields label='Next of Kin One Number' name='next_of_kin_numb'/>
                <CustomCheckboxFields label='Next of kin One Address' name='next_of_kin_address'/>
                <CustomCheckboxFields label='Next of Kin Two' name='next_of_kin_two'/>
                <CustomCheckboxFields label='Relationship Two' name='relationship_two'/>
                <CustomCheckboxFields label='Next of Kin Two Number' name='next_of_kin_numb_two'/>
                <CustomCheckboxFields label='Next of Kin Two Address' name='next_of_kin_two_address'/>
                <CustomCheckboxFields label='Place of Stay' name='place_of_stay'/>
                <CustomCheckboxFields label='Place of Stay Two' name='place_of_stay_two'/>
                <CustomCheckboxFields label='Identification Number' name='identification_number'/>
                <CustomCheckboxFields label='Identification Type' name='identification_type'/>
                <CustomCheckboxFields label='Type of Employer' name='type_of_employer'/>
                <CustomCheckboxFields label='Type of Client' name='type_of_client'/>
                <CustomCheckboxFields label='Approved' name='approved'/>
                <CustomCheckboxFields label='Status' name='status'/>
                <CustomCheckboxFields label='Client Type' name='client_type'/>
                <CustomCheckboxFields label='Created By' name='created_by'/>
                <CustomCheckboxFields label='Updated By' name='updated_by'/>
                <CustomCheckboxFields label='Client Manager' name='client_manager'/>
            </div>
            <div style={{margin:"2rem 0"}}>
                <CustomCheckboxFields label='Select All' name='select_all'/>
            </div>
            <div className='base__entity__fields__select__all'>
                <button className='btn btn-olive'>Add Selected Fields</button>
            </div>
        </div>
    )
}

export default ClientFields;

const CustomCheckboxFields = ({ label, ...props }) => {
    props['type'] = 'checkbox';
    const [field, meta] = useField(props);
    const [checkedField, setCheckedField] = useState([]);

    // if (field.value == ''){
    //     setCheckedField(field.name);
    // }

    // console.log(checkedField)

    // const handleChange = (e) => {
    //     console.log(e.target)
    // };
  
    return (
        <>
            <div className='row custom-background' style={{marginTop:"0.75rem"}}>
                <label className='form-label-base__entity'>{label}{props.required && <span style={{color: 'red'}}>&#42;</span>}</label>
                <div className='col-8'>
                    <input
                    {...field}
                    {...props}
                    className={`${meta.touched && meta.error ? 'input-error' : ''}`}
                    />
                    {meta.touched && meta.error && <div className='error'>{meta.error}</div>}
                </div>
            </div>
        </>
    );
};
