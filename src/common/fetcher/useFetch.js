import React, {useEffect} from 'react';
import { makeRequest } from '../../utils';

const useFetch = ({url, method, options={}}) => {
  const [apiData, setApiData] = React.useState();
  const [serverError, setServerError] = React.useState();
  const [localError, setLocalError] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const { body = {} } = options;

  const getResponse = async () => {
    const fetcher = makeRequest[method];
    let response;
    if (['get', 'delete'].includes(method)) {
      response = await fetcher(url, options);
    }else {
      response = await fetcher(url, body, options);
    }
    return response
  }

  useEffect(() => {
    setLoading(true);
    setServerError();
    setLocalError();
    const fetchData = async () => {
      try {
        const response = await getResponse();
        if (response.redirected) {
          window.location.href = '/users/login/';
        }
        if (response.ok && response.headers.get('content-type') == 'application/json') {
          const responseData = await response.json();
          setApiData(responseData);
        }else {
          const error = await response.json();
          setServerError({error, response});
        }
      }catch(err) {
        setLocalError(err);
      }
      setLoading(false);
    }
    fetchData();
  }, [url]);
  return {data: apiData, serverError, localError, loading}
}

export default useFetch;