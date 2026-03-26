import React from 'react';
import useFetch from './useFetch';
import MiniLoader from '../../components/Loader/MiniLoader';

const Fetcher = ({urls, children, extra}) => {
  const {data, error, loading, setLoading} = useFetch(urls);

  if (loading) {
    return <div className='bloc-tabs'><MiniLoader /></div>
  }

  if (error !== null) {
    if (!error.status){
      return <Error errorMessage={'Network Error'} setLoading={setLoading} />
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
    return <Error errorMessage={errorMessage} setLoading={setLoading}/>
  }

  return children({data, extra})
}

function Error({errorMessage, setLoading}) {
  return (
    <>
      <div className='sf-errorbox'>
        <div className="sf-errorbox-title">{errorMessage}</div>
        <pre className="sf-errorbox-pre" style={{cursor:'pointer'}} onClick={() => setLoading(true)}>Retry</pre>
      </div>
    </>
  )
}

export default Fetcher;