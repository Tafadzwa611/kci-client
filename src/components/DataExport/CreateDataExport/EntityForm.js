import React, {useState} from 'react';
import { Form, Formik } from 'formik';
import {
    NonFieldErrors,
    CustomInput,
    CustomSelect,
    SubmitButton,
    CustomCheckbox
} from '../../../common';
import ClientFields from './ClientFields';

function EntityForm({initialValues, validationSchema, onSubmit, setTab}) {
    const [showClientFields, setShowClientFields] = useState(false);
    const onChange = (setFieldValue, newValue) => {
        setFieldValue('base_entity', newValue);
        if (newValue == 'CLIENT'){
            setShowClientFields(true);
        } else {
            setShowClientFields(false);
        }
    }
    return (
        <>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {({ isSubmitting, setFieldValue, errors }) => (
                <Form>
                    <NonFieldErrors errors={errors}>
                        <div className='divider divider-info' style={{marginTop:'0'}}>
                            <span>Fields</span>
                        </div>
                        <CustomInput label='Name' name='data_export_name' type='text' required/>
                        <CustomSelect label='Export Format' name='data_export_file_format' required>
                            <option value=''>------</option>
                            <option value='XLXS'>XLXS</option>
                            <option value='CSV'>CSV</option>
                        </CustomSelect>
                        <CustomSelect 
                            label='Base Entity' 
                            name='base_entity' 
                            required
                            onChange={evt => onChange(setFieldValue, evt.target.value)}
                        >
                            <option value=''>------</option>
                            <option value='CLIENT'>CLIENT</option>
                            <option value='GROUP'>GROUP</option>
                        </CustomSelect>
                        {showClientFields &&
                            <ClientFields />
                        }
                        <div className='divider divider-white' style={{padding: '1.25rem'}}></div>
                        <div style={{display:'flex', justifyContent: 'flex-end'}}> 
                            {/* <SubmitButton isSubmitting={isSubmitting}/> */}
                            <button onClick={e => setTab('overview')} type='button' className='btn btn-info'>Next</button>
                        </div>
                    </NonFieldErrors>
                </Form>
                )}
            </Formik>
        </>
    )
}

export default EntityForm;




