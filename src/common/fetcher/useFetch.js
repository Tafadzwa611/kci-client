import React, {useEffect} from 'react';
import { makeRequest } from '../../utils';

const useFetch = (urls) => {
  const [data, setData] = React.useState([]);
  const [error, setError] = React.useState();
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const promises = urls.map(url => makeRequest.get(url).then(response => {
        if (response.ok) return response.json();
        throw response;
      }));

      Promise.all(promises).then(
        (json) => setData(json)
      ).catch((e) => setError(e)).finally(() => setLoading(false));
    }
    fetchData();
  }, [urls]);

  return {data, error, loading}
}

export default useFetch;