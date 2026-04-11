import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Form, Formik, } from 'formik';
import {
  ActionModal,
  ModalActionSubmit,
  NonFieldErrors,
  CustomDatePickerFilter,
  CustomSelectFilter,
  SubmitButtonFilter
} from '../../../common';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { removeEmptyValues, getParams } from '../../../utils/utils';


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
        <Table receiptNumbers={receiptNumbers} setReceiptNumbers={setReceiptNumbers} />
      )}
    </div>
  )
}

const MODAL_STATES = {
  reuse: 'reuse',
  none: false,
};

function Table({ receiptNumbers, setReceiptNumbers }) {
  const { none, reuse } = MODAL_STATES;
  const [modal, setModal] = React.useState(none);
  const rnRef = React.useRef(null);

  const openApproveModal = (evt) => {
    const rn = receiptNumbers.find(rn => rn.id == evt.target.id);
    rnRef.current = rn;
    setModal(reuse);
  };

  return (
    <div>
      {modal == reuse && (
        <ReuseReceipt
          receipt={rnRef.current}
          setOpen={setModal}
          setReceiptNumbers={setReceiptNumbers}
        />
      )}
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
              <th>Receipt_Number</th>
              <th>Receipt_Book_Name</th>
              <th>Receipt_Book_Branch</th>
              <th>Used_For</th>
              <th>Txn_Date</th>
              <th>Entry_Date</th>
              <th>Source_ID</th>
              <th>Action</th>
            </tr>
            {receiptNumbers.map((rn) => (
              <tr className='table-row' key={rn.receipt_number}>
                <td>{rn.receipt_info}</td>
                <td>{rn.receipt_number}</td>
                <td>{rn.receipt_book_name}</td>
                <td>{rn.receipt_book_branch}</td>
                <td>{rn.used_for}</td>
                <td>{rn.value_date}</td>
                <td>{rn.entry_date}</td>
                <td>{rn.source_id}</td>
                <td>
                  {rn.used_for === 'Orphaned' && (
                    <button
                      id={rn.id}
                      onClick={openApproveModal}
                      style={{
                      background: '#1bbf5f',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '.15rem',
                      cursor: 'pointer',
                      padding: '.2rem .25rem',
                      fontSize: '0.75rem',
                      marginLeft: '5px',
                      }}
                    >
                      Reuse
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function Filter({rbs, setReceiptNumbers}) {
  const [rbType, setRbType] = React.useState(null);

  const onSubmit = async (values, actions) => {
    try {
      const data = removeEmptyValues(values);
      const params = getParams(data);
      const url = (
        rbType === 1 ? 
        `/reportsapi/receipt_numbers/${values.receipt_book_id}/` : 
        `/reportsapi/voucher_numbers/${values.receipt_book_id}/`
      );
      const response = await axios.get(url, {params});
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

  const initialValues = {
    receipt_book_id: '',
    used_for: '',
    min_created_at: '',
    max_created_at: '',
  };

  const receiptBookTypes = {
    1: 'Receipt Book',
    2: 'Voucher Book',
  }

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({isSubmitting, setFieldValue}) => (
        <div className='search_background'>
          <div className='row-containers sf-shellwrap'>
            <Form>
              <div className='row row-payments row-loans sf-card'>
                <div className='sf-row sf-row-2'>
                  <div className='row-payments-container sf-w-24'>
                    <CustomSelectFilter
                      label='Receipt Book'
                      name='receipt_book_id'
                      onChange={(e) => {
                        setFieldValue('receipt_book_id', e.target.value);
                        const rb = rbs.find(rb => rb.id == e.target.value);
                        if (rb.receipt_book_type !== rbType) {
                          setFieldValue('used_for', '');
                          setRbType(rb ? rb.receipt_book_type : null);
                        }
                      }}
                      required
                    >
                      <option value=''>------</option>
                      {rbs.map(rb => (
                        <option key={rb.id} value={rb.id}>
                          {rb.currency.name} - {rb.name} - {rb.branch.name} - {receiptBookTypes[rb.receipt_book_type]}
                        </option>
                      ))}
                    </CustomSelectFilter>
                    {rbType === 1 ? (
                      <CustomSelectFilter label='Used For' name='used_for'>
                        <option value=''>------</option>
                        <option value='Payment'>Payment</option>
                        <option value='Orphaned'>Orphaned</option>
                        <option value='Unused'>Unused</option>
                      </CustomSelectFilter>
                    ) : (
                      <CustomSelectFilter label='Used For' name='used_for'>
                        <option value=''>------</option>
                        <option value='Expense'>Expense</option>
                        <option value='Orphaned'>Orphaned</option>
                        <option value='Unused'>Unused</option>
                      </CustomSelectFilter>
                    )}
                    <div className="row-payments-container sf-w-49">
                      <CustomDatePickerFilter
                        label="Min Date"
                        name="min_created_at"
                        setFieldValue={setFieldValue}
                      />
                    </div>
                    <div className="row-payments-container sf-w-49">
                      <CustomDatePickerFilter
                        label="Max Date"
                        name="max_created_at"
                        setFieldValue={setFieldValue}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className='sf-submit'>
                <SubmitButtonFilter isSubmitting={isSubmitting}/>
              </div>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  )
}

const UNUSED = 'Unused';

function ReuseReceipt({ receipt, setOpen, setReceiptNumbers }) {
  const updateItem = (id) => {
    setReceiptNumbers(curr => curr.map(rn => {
      return rn.id === id ? ({
        ...rn,
        'receipt_info': UNUSED,
        'used_for': UNUSED,
        'source_id': null,
        'value_date': null,
        'entry_date': null,
      }) : (
        rn
      );
    }));
  };

  const onSubmit = async (values, actions) => {
    try {
      const CONFIG = {
        headers: {
          'X-CSRFToken': Cookies.get('csrftoken'),
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      };
      const url = (
        receipt.receipt_book_type === 1 ? 
        `/reportsapi/receipt_numbers/${receipt.id}/` :
        `/reportsapi/voucher_numbers/${receipt.id}/`
      );
      await axios.post(url, values, CONFIG);
      updateItem(receipt.id);
      setOpen(false);
      actions.resetForm();
    } catch (error) {
      if (error.message === 'Network Error') {
        actions.setErrors({ responseStatus: 'Network Error' });
      } else if (error.response.status >= 400 && error.response.status < 500) {
        actions.setErrors({ responseStatus: error.response.status, ...error.response.data });
      } else {
        actions.setErrors({ responseStatus: error.response.status });
      }
    }
  };

  return (
    <ActionModal text='add'>
      <Formik initialValues={{}} onSubmit={onSubmit}>
        {({ errors, isSubmitting }) => (
          <Form>
            <div className='title' style={{ fontSize: '0.875rem' }}>
              Are you sure you want to reuse this receipt?<br />
              <b>
                Receipt Number: {receipt.receipt_number}<br />
                Receipt Info: {receipt.receipt_info}<br />
                Receipt Book Name: {receipt.receipt_book_name}<br />
                Receipt Book Branch: {receipt.receipt_book_branch}<br />
                Entry Date: {receipt.entry_date}<br />
              </b>
            </div>
            <ModalActionSubmit text='add' isSubmitting={isSubmitting} setOpen={setOpen} act='Reuse' />
            <NonFieldErrors errors={errors} />
          </Form>
        )}
      </Formik>
    </ActionModal>
  );
}

export default ReceiptNumbers;