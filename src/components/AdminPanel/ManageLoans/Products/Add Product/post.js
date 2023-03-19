import axios from 'axios';

const post = async (data, setErrors) => {
  try {
    const response = await axios.post('/loansapi/add_loan_product/', data);
    return response.data;
  } catch (error) {
    console.log(error);
    // setErrors(error.response.data);
  }
};

export {post};
