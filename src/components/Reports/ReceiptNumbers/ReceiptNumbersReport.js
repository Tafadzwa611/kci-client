import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Form, Formik } from 'formik';
import {
  ActionModal,
  ModalActionSubmit,
  NonFieldErrors,
  CustomDatePickerFilter,
  CustomSelectFilter,
  SubmitButtonFilter,
  CustomInputFilter
} from '../../../common';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { removeEmptyValues, getParams } from '../../../utils/utils';

const MODAL_STATES = {
  reuse: 'reuse',
  none: false,
};

const UNUSED = 'Unused';

function ReceiptNumbersReport({ reportConfig }) {
  const [rbs, setRbs] = React.useState(null);
  const [numbers, setNumbers] = React.useState(null);

  React.useEffect(() => {
    const fetch = async () => {
      const response = await axios.get('/loansapi/receipt_books/?use_branch_access');
      setRbs(response.data);
    };

    fetch();
  }, []);

  if (!rbs) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Filter
        reportConfig={reportConfig}
        rbs={rbs}
        setNumbers={setNumbers}
      />
      {numbers && (
        <Table
          reportConfig={reportConfig}
          numbers={numbers}
          setNumbers={setNumbers}
        />
      )}
    </div>
  );
}

function Table({ reportConfig, numbers, setNumbers }) {
  const { none, reuse } = MODAL_STATES;
  const [modal, setModal] = React.useState(none);
  const numberRef = React.useRef(null);

  const openReuseModal = (evt) => {
    const numberItem = numbers.find((rn) => rn.id == evt.target.id);
    numberRef.current = numberItem;
    setModal(reuse);
  };

  return (
    <div>
      {modal == reuse && (
        <ReuseNumber
          reportConfig={reportConfig}
          numberItem={numberRef.current}
          setOpen={setModal}
          setNumbers={setNumbers}
        />
      )}
      <div style={{ paddingTop: '2rem' }}></div>
      <div className='table-responsive font-12'>
        <div style={{ marginBottom: '1rem', float: 'right' }}>
          <ReactHTMLTableToExcel
            id={reportConfig.exportButtonId}
            className='download-table-xls-button btn btn-default'
            table={reportConfig.exportTableId}
            filename={reportConfig.exportFilename}
            sheet='tablexls'
            buttonText='Download as XLS'
          />
        </div>
        <table className='table table-hover' id={reportConfig.exportTableId}>
          <tbody>
            <tr className='journal-details header'>
              <th>Details</th>
              <th>{reportConfig.title}_Number</th>
              <th>{reportConfig.title}_Book_Name</th>
              <th>{reportConfig.title}_Book_Branch</th>
              <th>Used_For</th>
              <th>Txn_Date</th>
              <th>Entry_Date</th>
              <th>Source_ID</th>
              <th>Action</th>
            </tr>
            {numbers.map((rn) => (
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
                      onClick={openReuseModal}
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
  );
}

function Filter({ reportConfig, rbs, setNumbers }) {
  const onSubmit = async (values, actions) => {
    try {
      const data = removeEmptyValues(values);
      const params = getParams(data);
      const url = values.receipt_book_id
        ? `${reportConfig.endpoint}${values.receipt_book_id}/`
        : reportConfig.endpoint;

      const response = await axios.get(url, { params });
      setNumbers(response.data);
    } catch (error) {
      console.log(error);
      if (error.message === 'Network Error') {
        actions.setErrors({ responseStatus: 'Network Error' });
      } else if (error.response.status >= 400 && error.response.status < 500) {
        actions.setErrors({ responseStatus: error.response.status, ...error.response.data });
      } else {
        actions.setErrors({ responseStatus: error.response.status });
      }
    }
  };

  const filteredRbs = rbs.filter((rb) => rb.receipt_book_type === reportConfig.typeId);

  return (
    <Formik
      initialValues={{
        receipt_book_id: '',
        used_for: '',
        min_created_at: '',
        max_created_at: '',
      }}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, setFieldValue }) => (
        <div className='search_background'>
          <div className='row-containers sf-shellwrap'>
            <Form>
              <div className='row row-payments row-loans sf-card'>
                <div className='sf-row sf-row-2'>
                  <div className='row-payments-container sf-w-24'>
                    <CustomSelectFilter
                      label={`${reportConfig.title} Book`}
                      name='receipt_book_id'
                      onChange={(e) => {
                        setFieldValue('receipt_book_id', e.target.value);
                        setFieldValue('used_for', '');
                      }}
                    >
                      <option value=''>------</option>
                      {filteredRbs.map((rb) => (
                        <option key={rb.id} value={rb.id}>
                          {rb.currency.name} - {rb.name} - {rb.branch.name}
                        </option>
                      ))}
                    </CustomSelectFilter>
                    <CustomSelectFilter label='Used For' name='used_for'>
                      <option value=''>------</option>
                      {reportConfig.usedForOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </CustomSelectFilter>
                    <div className='row-payments-container sf-w-49'>
                      <CustomDatePickerFilter
                        label='Min Date'
                        name='min_created_at'
                        setFieldValue={setFieldValue}
                      />
                    </div>
                    <div className='row-payments-container sf-w-49'>
                      <CustomDatePickerFilter
                        label='Max Date'
                        name='max_created_at'
                        setFieldValue={setFieldValue}
                      />
                    </div>
                    <div className='row-payments-container sf-w-49'>
                      <CustomInputFilter
                        label={`${reportConfig.title} Number`}
                        name='receipt_number'
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className='sf-submit'>
                <SubmitButtonFilter isSubmitting={isSubmitting} />
              </div>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
}

function ReuseNumber({ reportConfig, numberItem, setOpen, setNumbers }) {
  const updateItem = (id) => {
    setNumbers((current) => current.map((rn) => (
      rn.id === id
        ? {
          ...rn,
          receipt_info: UNUSED,
          used_for: UNUSED,
          source_id: null,
          value_date: null,
          entry_date: null,
        }
        : rn
    )));
  };

  const onSubmit = async (values, actions) => {
    try {
      const CONFIG = {
        headers: {
          'X-CSRFToken': Cookies.get('csrftoken'),
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      };
      const url = reportConfig.typeId === 1
        ? `/reportsapi/reuse_receipt/${numberItem.id}/`
        : `/reportsapi/reuse_voucher/${numberItem.id}/`;
      await axios.post(url, values, CONFIG);
      updateItem(numberItem.id);
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
              Are you sure you want to reuse this {reportConfig.title.toLowerCase()}?<br />
              <b>
                {reportConfig.title} Number: {numberItem.receipt_number}<br />
                {reportConfig.title} Info: {numberItem.receipt_info}<br />
                {reportConfig.title} Book Name: {numberItem.receipt_book_name}<br />
                {reportConfig.title} Book Branch: {numberItem.receipt_book_branch}<br />
                Entry Date: {numberItem.entry_date}<br />
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

export default ReceiptNumbersReport;
