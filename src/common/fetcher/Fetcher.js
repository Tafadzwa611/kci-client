import React from 'react';
import NetworkError from './NetworkError';
import useFetch from './useFetch';

const Fetcher = ({url, method, children, options={}}) => {
  const {data, serverError, localError, loading} = useFetch({url, method, options});

  if (loading) {
    return <div className='bloc-tabs'>Loading Fetcher...</div>
  }

  if (localError != undefined) {
    return <NetworkError />
  }

  if (serverError != undefined) {
    return <div>
    <h2>Server Error.</h2>
  </div>
  }

  return children({data})
}

export default Fetcher;