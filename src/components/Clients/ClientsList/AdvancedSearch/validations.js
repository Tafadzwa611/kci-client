import {isDate} from '../../../../utils/utils';

const isQueryInvalid = (dates) => {
  const inValid = dates.some(dt => {
    const dtStrings = Object.values(dt);
    const [value] = dtStrings;
    if (!Array.isArray(value)) {
      return !isDate(value)
    }
    if (value.some(dt => !isDate(dt))) {
      return value.some(dt => !isDate(dt))
    }
    const minDate = new Date(value[0]);
    const maxDate = new Date(value[1]);
    return minDate > maxDate
  });
  return inValid
}

export {isQueryInvalid}