import React from 'react';
import NetworkError from './NetworkError';
import useFetch from './useFetch';

const Fetcher = ({urls, children}) => {
  const {data, error, loading} = useFetch(urls);

  if (loading) {
    return <div className='bloc-tabs'>Loading Fetcher...</div>
  }

  if (error != undefined) {
    console.log(error);
    return <NetworkError />
  }

  return children({data})
}

export default Fetcher;