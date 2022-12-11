import React from 'react';
import NetworkError from './NetworkError';
import useFetch from './useFetch';
import MiniLoader from '../../components/Loader/MiniLoader';

const Fetcher = ({urls, children}) => {
  const {data, error, loading} = useFetch(urls);

  if (loading) {
    return <div className='bloc-tabs'><MiniLoader /></div>
  }

  if (error != undefined) {
    console.log(error);
    return <NetworkError />
  }

  return children({data})
}

export default Fetcher;