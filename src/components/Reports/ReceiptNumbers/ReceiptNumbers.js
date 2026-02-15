import React from 'react';
import axios from 'axios';
import { Form, Formik } from 'formik';
import {
  CustomSelectFilter,
  SubmitButtonFilter
} from '../../../common';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';


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
      {receiptNumbers && (
        <Table receiptNumbers={receiptNumbers} />
      )}
    </div>
  )
}

function Table({ receiptNumbers }) {
  return (
    <div>
      <div style={{paddingTop: '2rem'}}></div>
      <div className='table-responsive font-12'>
        <div style={{marginBottom: '1rem', float: 'right'}}>
          <ReactHTMLTableToExcel
            id='test-table-xls-button'
            className='download-table-xls-button btn btn-default'
            table='receipts'
            filename='Receipts'
            sheet='tablexls'
            buttonText='Download as XLS'
          />
        </div>
        <table className='table table-hover' id='receipts'>
          <tbody>
            <tr className='journal-details header'>
              <th>Details</th>
              <th>Prefix</th>
              <th>Receipt_Number</th>
              <th>Receipt_Book_Name</th>
              <th>Receipt_Book_Branch</th>
              <th>Used_For</th>
              <th>Txn_Date</th>
              <th>Entry_Date</th>
              <th>Source_ID</th>
            </tr>
            {receiptNumbers.map((rn) => (
              <tr className='table-row' key={rn.id}>
                <td>{rn.receipt_info}</td>
                <td>{rn.receipt_book_prefix}</td>
                <td>{rn.receipt_number}</td>
                <td>{rn.receipt_book_name}</td>
                <td>{rn.receipt_book_branch}</td>
                <td>{rn.used_for}</td>
                <td>{rn.value_date}</td>
                <td>{rn.entry_date}</td>
                <td>{rn.source_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function Filter({rbs, setReceiptNumbers}) {
  const onSubmit = async (values, actions) => {
    try {
      const response = await axios.get(`/reportsapi/receipt_numbers/${values.receipt_book_id}/`);
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