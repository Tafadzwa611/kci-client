import React, {useState} from 'react';
import Filter from './Filter';
import axios from 'axios';
import Cookies from 'js-cookie';
import PaymentsReportList from './PaymentsReportList';
import {useNavigate} from 'react-router-dom';

function ExcelPayments() {
  const [params, setParams] = useState({
    amount_col: '',
    ref_col: '',
    field_name: 'loan_id',
    cash_account_id: '',
    order: 'loan_added_on',
    include_fp_op: true,
    payment_date: '',
    file_name: '',
  });
  let navigate = useNavigate();

  async function onSubmit(evt) {
    evt.preventDefault();
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      const response = await axios.post('/loansapi/start_excel_payments_processing/', params, CONFIG);
      navigate({pathname: `/payments/viewpayments/paymentsreport/${response.data.result}`});
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Filter params={params} setParams={setParams} onSubmit={onSubmit} disableFetch={false} loading={false}/>
      <div style={{paddingTop: '17px'}}></div>
      <div className='row'>
        <div className='col-12'>
          <PaymentsReportList />
        </div>
      </div>
    </div>
  )
}

export default ExcelPayments;