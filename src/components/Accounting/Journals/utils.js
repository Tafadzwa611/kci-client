import { useState, useRef } from 'react';

export function useAsyncReference(value) {
  const ref = useRef(value);
  const [, forceRender] = useState(false);
  function updateState(newState) {
    ref.current = newState;
    forceRender(s => !s);
  }
  return [ref, updateState];
}

export function debounceFunction (func, delay) {
  let timer;
  return function() {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func();
    }, delay)
  }
}

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function convertDate(date_str) {
  if (date_str === '' || date_str === null) {
    return date_str
  }
  const temp_date = date_str.split(/[//-]/);
  if (date_str.includes('-')) {
    return temp_date[2] + ' ' + months[Number(temp_date[1]) - 1] + ' ' + temp_date[0]
  }
  return temp_date[1] + ' ' + months[Number(temp_date[0]) - 1] + ' ' + temp_date[2]
}

function getAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}


export {convertDate, getAge};