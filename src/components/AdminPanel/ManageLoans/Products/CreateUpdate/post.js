import axios from 'axios';
import Cookies from 'js-cookie';
import { removeEmptyValues } from '../../../../../utils/utils';

const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
const post = async (values, setErrors, setProductId, setView) => {
  try {
    const data = removeEmptyValues(values);
    const response = await axios.post('/loansapi/add_loan_product/', data, CONFIG);
    setProductId(response.data.id);
    setView('list');
  } catch (error) {
    if (error.message === "Network Error") {
      setErrors({responseStatus: "Network Error"});
    } else if (error.response.status === 400) {
      setErrors({responseStatus: error.response.status, ...error.response.data});
    } else {
      setErrors({responseStatus: error.response.status});
    }
  }
};

const put = async (values, setErrors, setSelectedPrdct, setView) => {
  try {
    const data = removeEmptyValues(values);
    await axios.put(`/loansapi/edit_loan_product/${data.id}/`, data, CONFIG);
    setSelectedPrdct(values);
    setView('list');
  } catch (error) {
    if (error.message === "Network Error") {
      setErrors({responseStatus: "Network Error"});
    } else if (error.response.status === 400) {
      setErrors({responseStatus: error.response.status, ...error.response.data});
    } else {
      setErrors({responseStatus: error.response.status});
    }
  }
};

export {post, put};
