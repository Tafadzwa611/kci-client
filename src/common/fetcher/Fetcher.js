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
    <div className='col-12' style={{color:"red", border:"1px solid red", backgroundColor: "#ffe5e5", height:'75px'}}>
      <div style={{fontSize: 12, color: 'red', display:'flex', alignItems:'center', height:'100%', paddingLeft:'20px'}}>
        {errorMessage}
        <span className='retry__span' onClick={() => setLoading(true)}>
          Retry
        </span>
      </div>
    </div>
  )
}

export default Fetcher;