import React, {useState} from 'react';
import { useField } from 'formik';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import TimePicker from 'react-multi-date-picker/plugins/time_picker';

function CustomTimePicker({ setFieldValue, label, ...props }) {
  const [field, meta] = useField(props);

  const handleChange = value => {
    if (value instanceof DateObject) {
      setFieldValue(field.name, `${value.hour}:${value.minute}`);
    }else {
      setFieldValue(field.name, '');
    }
  }

  const renderComponent = <CustomInput required={props.required} touched={meta.touched} error={meta.error} />;

  return (
    <div className='row custom-background'>
      <label className='form-label'>{label}{props.required && <span style={{color: 'red'}}>&#42;</span>}</label>
      <div className='col-9'>
        <DatePicker
          onChange={handleChange}
          disableDayPicker
          format='HH:mm'
          plugins={[<TimePicker hideSeconds/>]}
          render={renderComponent}
        />
        {meta.touched && meta.error && <div className='error'>{meta.error}</div>}
      </div>
    </div>
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
      required={props.required}
    />
  )
}

export default CustomTimePicker