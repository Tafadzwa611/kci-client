import React from 'react';
import { useLoggedInUser } from '../../contexts/LoggedInUserContext';
import { useField } from 'formik';
import DatePicker, { DateObject } from 'react-multi-date-picker';

function CustomDatePicker({ setFieldValue, label, ...props }) {
  const [field, meta] = useField(props);
  const {loggedInUser} = useLoggedInUser();

  const handleChange = value => {
    if (value instanceof DateObject) {
      setFieldValue(field.name, getFormattedDate(value.toDate(), loggedInUser.date_format));
    }else {
      setFieldValue(field.name, '');
    }
  }

  console.log(field)

  return (
    <>
      <div className='row custom-background'>
        <label className='form-label'>{label}{props.required && <span style={{color: 'red'}}>&#42;</span>}</label>
        <div className='col-9'>
          <DatePicker
            format={loggedInUser.date_format.toUpperCase()}
            onChange={handleChange}
            render={<CustomInput touched={meta.touched} error={meta.error} />}
          />
          {meta.touched && meta.error && <div className='error'>{meta.error}</div>}
        </div>
      </div>
    </>
  )
}

function CustomInput(props) {
  return (
    <input
      onKeyDown={(e) => e.preventDefault()}
      className={`custom-select-form ${props.touched && props.error ? 'input-error' : ''}`}
      onFocus={props.openCalendar}
      value={props.value}
      onChange={props.handleValueChange}
    />
  )
}

function getFormattedDate(date, format) {
  let year = date.getFullYear();
  let month = (1 + date.getMonth()).toString().padStart(2, '0');
  let day = date.getDate().toString().padStart(2, '0');
  return {
    'dd/mm/yyyy': `${day}/${month}/${year}`,
    'mm/dd/yyyy': `${month}/${day}/${year}`,
    'yyyy/mm/dd': `${year}/${month}/${day}`
  }[format]
}

export default CustomDatePicker;