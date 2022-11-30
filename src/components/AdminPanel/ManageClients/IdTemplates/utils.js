import { makeRequest } from '../../../../utils/utils';

export const onModalSubmit = async (data, method, url, resetForm, setOpen, setErrors, sideEffect) => {
  const fetcher = makeRequest[method];
  try {
    let response;
    if (['get', 'delete'].includes(method)) {
      response = await fetcher(url);
    }else {
      response = await fetcher(url, data);
    }
    const jsonResp = await response.json();
    if (response.ok) {
      sideEffect(jsonResp);
      resetForm();
      setOpen(false);
    }else {
      setErrors({responseStatus: response.status, ...jsonResp});
    }
  }catch(error) {
    setErrors({clientError: error});
  }
}