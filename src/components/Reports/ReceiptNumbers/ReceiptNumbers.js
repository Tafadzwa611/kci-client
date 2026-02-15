import React from 'react';
import axios from 'axios';
import { Form, Formik } from 'formik';
import {
  CustomSelectFilter,
  SubmitButtonFilter
} from '../../../common';
import {
  getParams
} from '../../../utils/utils';


function ReceiptNumbers() {
  const [rbs, setRbs] = React.useState(null);
  const [receiptNumbers, setReceiptNumbers] = React.useState(null);

  React.useEffect(() => {
    const fetch = async () => {
      const response = await axios.get('/loansapi/receipt_books/?use_branch_access');
      setRbs(response.data);
    }
    fetch();
  }, []);

  if (!rbs) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <Filter rbs={rbs} setReceiptNumbers={setReceiptNumbers} />
    </div>
  )
}

function Filter({rbs, setReceiptNumbers}) {
  const onSubmit = async (values, actions) => {
    try {
      const params = getParams(values);
      const response = await axios.get('/loansapi/receipt_books/', {params: params});
      setReceiptNumbers(response.data);
    } catch (error) {
      console.log(error);
      if (error.message === 'Network Error') {
        actions.setErrors({responseStatus: 'Network Error'});
      } else if (error.response.status >= 400 && error.response.status < 500) {
        actions.setErrors({responseStatus: error.response.status, ...error.response.data});
      } else {
        actions.setErrors({responseStatus: error.response.status});
      }
    }
  }

  return (
    <Formik initialValues={{ receipt_book_id: '' }} onSubmit={onSubmit}>
      {({isSubmitting}) => (
        <div className='search_background'>
          <div className='row-containers' style={{border:'none'}}>
            <Form>
              <div className='row row-payments row-loans' style={{marginTop:'1rem'}}>
                <div className='row-payments-container' style={{width:'19%'}}>
                  <CustomSelectFilter label='Receipt Book' name='receipt_book_id' required>
                    <option value=''>------</option>
                    {rbs.map(rb => (
                      <option key={rb.id} value={rb.id}>
                        {rb.currency.name} - {rb.name} - {rb.branch.name}
                      </option>
                    ))}
                  </CustomSelectFilter>
                </div>
              </div>
              <div style={{marginTop:'1rem', display:'flex', justifyContent:'space-between'}}>
                <SubmitButtonFilter isSubmitting={isSubmitting}/>
              </div>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  )
}

export default ReceiptNumbers;