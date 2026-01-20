import React, {useState, useEffect} from 'react';
import Select from 'react-select';
import { useField } from 'formik';
import { uuidv4 } from '../../utils';

function MultiSelectFilter({label, options, initVals, setFieldValue, ...props}) {
    const [optionSelected, setOptionSelected] = useState(initVals);
    const [field, meta] = useField(props);

    const inputId = uuidv4();

    const handleMultiSelect = selected => {
        const selectAll = selected.find(val => val.value === '*');
        if (selectAll) {
            selected = [selectAll];
        }
        setOptionSelected(selected);
        // const newVals = selected.filter(val => val.value !== '*').map(val => val.value);
        const newVals = selected.map(val => val.value);
        setFieldValue(field.name, newVals);
        const el = document.getElementById(inputId);
        if (selected.length === 0) {
            el.required = props.required;
        }else {
            el.required = false;
        }
    }

    useEffect(() => {
        const el = document.getElementById(inputId);
        el.required = props.required;
    }, []);

    return (
        <div>
            <label className='form-label row-label'>
                {label}{props.required && <span style={{color: 'red'}}>&#42;</span>}
            </label>
            <div>
                <Select
                    isMulti
                    name='multi-select'
                    options={[{label: 'Select all', value: '*'}, ...options]}
                    value={optionSelected}
                    className='basic-multi-select'
                    classNamePrefix='select'
                    onChange={selected => handleMultiSelect(selected)}
                    styles={style}
                    inputId={inputId}
                />
                {meta.error && <div className='error'>{JSON.stringify(meta.error)}</div>}
            </div>
        </div>
    )
}

const style = {
    control: base => ({
        ...base,
        border: '1px solid #dee2e6',
        boxShadow: "none",
        '&:hover':'1px solid #dee2e6',
    })
};

export default MultiSelectFilter;