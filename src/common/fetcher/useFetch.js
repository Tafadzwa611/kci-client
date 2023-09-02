import React, {useEffect} from 'react';
import { makeRequest } from '../../utils';

const useFetch = (urls) => {
  const [data, setData] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const isInit = React.useRef(true);

  useEffect(() => {
    if (error) setError(null);
    setLoading(true);
    fetchData();
  }, [JSON.stringify(urls)]);

  useEffect(() => {
    if (isInit.current) {
      isInit.current = false;
      return
    }
    if (error) return;
    setLoading(true);
    fetchData();
  }, [error]);

  const fetchData = async () => {
    const promises = urls.map(url => makeRequest.get(url).then(response => {
      if (response.ok) return response.json();
      throw response;
    }));

    Promise.all(promises).then(
      (json) => setData(json)
    ).catch((e) => setError(e)).finally(() => setLoading(false));
  }

  return {data, error, setError, loading}
}

export default useFetch;