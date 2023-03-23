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
    console.log(error);
    setErrors(error.response.data);
  }
};

const put = async (values, setErrors, setSelectedPrdct, setView) => {
  try {
    const data = removeEmptyValues(values);
    await axios.put(`/loansapi/edit_loan_product/${data.id}/`, data, CONFIG);
    setSelectedPrdct(values);
    setView('list');
  } catch (error) {
    console.log(error);
    setErrors(error.response.data);
  }
};

export {post, put};
