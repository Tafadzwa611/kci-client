import React, { useEffect, useState } from 'react';
import {isDate} from '../../../../utils/utils';

function ValueEditor(props) {
  const {fieldData, handleOnChange, operator, value, values} = props;

  if (operator === 'null' || operator === 'notNull') {
    return null
  }

  if (fieldData.datatype === 'date' && ['between', 'notBetween'].includes(operator)) {
    return <DateRangePicker handleOnChange={handleOnChange} />
  }

  if (fieldData.datatype === 'date') {
    return <DatePicker value={value} handleOnChange={handleOnChange} />
  }

  if (fieldData.datatype === 'select') {
    return <Select value={value} handleOnChange={handleOnChange} values={values} />
  }

  if (fieldData.datatype === 'text') {
    return <Text value={value} handleOnChange={handleOnChange} />
  }
}


function Select({value, handleOnChange, values}) {
  return (
    <select onChange={(e) => handleOnChange(e.target.value)} value={value}>
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
    />
  )
}


function DatePicker({value, handleOnChange}) {
  return (
    <input
      type='date'
      value={value}
      className={`${!isDate(value) ? 'invalid' : ''}`}
      onKeyDown={(e) => e.preventDefault()}
      onChange={(e) => handleOnChange(e.target.value)}
    />
  )
}

function DateRangePicker({handleOnChange}) {
  const [minDate, setMinDate] = useState('');
  const [maxDate, setMaxDate] = useState('');
  const [rangeError, setRangeError] = useState(false);

  useEffect(() => {
    handleOnChange(`${minDate},${maxDate}`);
    if (isDate(minDate) && isDate(maxDate)) {
      setRangeError(new Date(minDate) > new Date(maxDate));
    }
  }, [minDate, maxDate]);


  return (
    <>
      <input
        name='start'
        type='date'
        value={minDate}
        className={`${(!isDate(minDate) || rangeError) ? 'invalid' : ''}`}
        onKeyDown={(e) => e.preventDefault()}
        onChange={(e) => setMinDate(e.target.value)}
      />
      <input
        name='end'
        type='date'
        value={maxDate}
        className={`${(!isDate(maxDate) || rangeError) ? 'invalid' : ''}`}
        onKeyDown={(e) => e.preventDefault()}
        onChange={(e) => setMaxDate(e.target.value)}
      />
    </>
  )
}

export default ValueEditor;