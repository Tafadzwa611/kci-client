import React from 'react';
import useFetch from './useFetch';
import MiniLoader from '../../components/Loader/MiniLoader';

const Fetcher = ({urls, children, extra}) => {
  const {data, error, loading} = useFetch(urls);

  if (loading) {
    return <div className='bloc-tabs'><MiniLoader /></div>
  }

  if (error !== null) {
    if (!error.status){
      return <Error errorMessage={'Network Error'} />
    }
    let errorMessage;
    if (error.status == 403){
      errorMessage = 'Permission Error.'
    }else if (error.status == 404) {
      errorMessage = 'Something could not be found.'
    }else if (error.status >= 400 && error.status < 500) {
      errorMessage = 'Client Error'
    }else {
      errorMessage = 'Server Error'
    }
    return <Error errorMessage={errorMessage} />
  }

  return children({data, extra})
}

function Error({errorMessage}) {
  return (
    <div>
      <div style={{fontSize: 12, color: 'red'}}>{errorMessage}</div>
    </div>
  )
}

export default Fetcher;