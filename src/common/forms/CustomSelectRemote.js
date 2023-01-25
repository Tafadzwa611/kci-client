import React from 'react';
import AsyncSelect from 'react-select/async';
import useFetch from '../fetcher/useFetch'

// keyMap = {valueKey: 'id', labelKeys: ['fullname', 'branch']}
function CustomSelectRemote({url, keyMap, queryParam}) {
  const search = (inputValue) => {
    const urls = [`${url}?${queryParam}=${terr}`];
    const {data} = useFetch(urls);
    data[0].map(datum => {
      const value = datum[keyMap.valueKey]
      const labelKeys = keyMap.labelKeys;
      let 
      labelKeys.forEach(key => value += datum[val])
    })
    return
  }

  const loadOptions = (inputValue, callback) => {
    callback(search(inputValue));
  };

  return (
    <div>
      
    </div>
  )
}

export default CustomSelectRemote
