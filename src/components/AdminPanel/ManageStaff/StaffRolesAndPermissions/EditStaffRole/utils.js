import { makeRequest } from '../../../../../utils/utils';

export const onModalSubmit = async (data, method, url, resetForm, setOpen, setErrors, sideEffect) => {
  const fetcher = makeRequest[method];
  try {
    let response;
    if (['get', 'delete'].includes(method)) {
      response = await fetcher(url);
    }else {
      response = await fetcher(url, data);
    }
    if (response.ok) {
      const jsonResp = await response.json();
      sideEffect(jsonResp);
      resetForm();
      setOpen(false);
    }else {
      if (response.status >= 500) {
        setErrors({responseStatus: response.status});
      }else {
        const jsonErr = await response.json();
        setErrors({responseStatus: response.status, ...jsonErr});
      }
    }
  }catch(error) {
    console.log(error);
    setErrors({clientError: error});
  }
}