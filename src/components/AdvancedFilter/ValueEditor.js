import React from 'react';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import { useLoggedInUser } from '../../contexts/LoggedInUserContext';

function ValueEditor(props) {
  const {fieldData, handleOnChange, operator, value, values} = props;

  if (operator === 'null' || operator === 'notNull') {
    return null
  }

  if (fieldData.datatype === 'date' && ['between', 'notBetween'].includes(operator)) {
    return <DateRangePicker value={value} handleOnChange={handleOnChange} />
  }

  if (fieldData.datatype === 'date') {
    return <DatePickerEditor value={value} handleOnChange={handleOnChange} />
  }

  if (fieldData.datatype === 'select') {
    return <Select value={value} handleOnChange={handleOnChange} values={values} />
  }

  if (fieldData.datatype === 'text') {
    return <Text value={value} handleOnChange={handleOnChange} />
  }

  if (fieldData.datatype === 'number') {
    return <NumEditor value={value} handleOnChange={handleOnChange} />
  }
}


function Select({value, handleOnChange, values}) {
  return (
    <select onChange={(e) => handleOnChange(e.target.value)} value={value} className="custom-select-form row-form">
      {values.map(val => <option key={val.name} value={val.name}>{val.label}</option>)}
    </select>
  )
}


function Text({value, handleOnChange}) {
  return (
    <input
      type='text'
      value={value}
      onChange={(e) => handleOnChange(e.target.value)}
      className='custom-select-form row-form input-background'
    />
  )
}

function NumEditor({value, handleOnChange}) {
  return (
    <input
      type='number'
      value={value}
      onChange={(e) => handleOnChange(e.target.value)}
      className='custom-select-form row-form input-background'
    />
  )
}

function DatePickerEditor({value, handleOnChange}) {
  const {loggedInUser} = useLoggedInUser();

  const handleChange = value => {
    if (value instanceof DateObject) {
      handleOnChange(getFormattedDate(value.toDate(), loggedInUser.date_format));
    }else {
      handleOnChange('');
    }
  }

  return <DatePicker value={value} format={loggedInUser.date_format.toUpperCase()} onChange={handleChange}/>
}

function DateRangePicker({value, handleOnChange}) {
  const {loggedInUser} = useLoggedInUser();

  const handleChange = value => {
    const valueString = value.map(dt => getFormattedDate(dt.toDate(), loggedInUser.date_format)).toString();
    handleOnChange(valueString);
  }

  if (value) {
    return <DatePicker value={value.split(',')} range format={loggedInUser.date_format.toUpperCase()} onChange={handleChange}/>
  }
  return <DatePicker range format={loggedInUser.date_format.toUpperCase()} onChange={handleChange}/>
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

export default ValueEditor;