import React from 'react';
import { Link } from 'react-router-dom';
import {
  NonFieldErrors,
  CustomDatePickerFilter,
  CustomSelectFilter,
  SubmitButtonFilter,
  MultiSelectFilter
} from '../../../common';
import axios from 'axios';
import { Form, Formik } from 'formik';
import { useCash } from '../../../contexts/CashContext';
import { removeEmptyValues, getParams } from '../../../utils/utils';
import { useBranches } from '../../../contexts/BranchesContext';


function CashCountReport() {
  const [reports, setReports] = React.useState([]);

  return (
    <div>
      <button type='button' className='btn btn-success'>
        <Link to='/accounting/viewaccounting/record_cash_count'>
          Balance Cashbook
        </Link>
      </button>
      <div style={{ paddingTop: '2rem' }}></div>
      <Filter setReports={setReports} />
      <div style={{ paddingTop: '2rem' }}></div>
      {Array.isArray(reports) ? (
        <Table reports={reports} />
        ): (
        <DenominationTable reports={reports} />
      )}
    </div>
  )
}


function Filter({ setReports }) {
  const initialValues = {
    min_date: '',
    max_date: '',
    account_id: '',
    branch_id: '',
    type: 'Total',
  };

  const onSubmit = async (values, actions) => {
    try {
      const data = removeEmptyValues(values);
      const params = getParams(data);
      const path = (
        values.type === 'Total' ?
        'cash_count_report' :
        'cash_count_report_2'
      );
      const response = await axios.get(`/acc-api/${path}/`, { params: params });
      setReports(response.data);
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

  const { cash } = useCash();
  const { branches } = useBranches();

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ isSubmitting, setFieldValue, errors }) => (
        <div className='search_background'>
          <div className='row-containers sf-shellwrap'>
            <Form>
              <div className='row row-payments row-loans sf-card'>
                <div className='sf-row sf-row-2'>
                  <div className='row-payments-container sf-w-24'>
                    <CustomDatePickerFilter
                      label='Min Date'
                      name='min_date'
                      setFieldValue={setFieldValue}
                    />
                  </div>

                  <div className='row-payments-container sf-w-24'>
                    <CustomDatePickerFilter
                      label='Max Date'
                      name='max_date'
                      setFieldValue={setFieldValue}
                    />
                  </div>

                  <div className='row-payments-container sf-w-24'>
                    <CustomSelectFilter label='Account' name='account_id'>
                      <option value=''>------</option>
                      {cash.accounts.map(account => (
                        <option key={account.id} value={account.id}>
                          {account.currency} - {account.label} - {account.branch}
                        </option>
                      ))}
                    </CustomSelectFilter>
                  </div>

                  <div className='row-payments-container sf-w-24'>
                    <MultiSelectFilter
                      label='Branches'
                      name='branch_ids'
                      options={branches.map(br => ({label: br.name, value:br.id}))}
                      setFieldValue={setFieldValue}
                    />
                  </div>
                  <div className='row-payments-container sf-w-24'>
                    <CustomSelectFilter label='Type' name='type'>
                      <option value='Total'>Totals Only</option>
                      <option value='Denominations'>Denominations</option>
                    </CustomSelectFilter>
                  </div>
                </div>
              </div>
              <div className='sf-submit'>
                <SubmitButtonFilter isSubmitting={isSubmitting} />
              </div>
              <NonFieldErrors errors={errors}/>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
}


const Table = ({reports}) => {
  return (
    <div style={{ padding: '0', border: 'none' }}>
      <div style={{ width: '100%', overflowX: 'auto' }}>
        <div className='table__height'>
          <table className='table' id='requests'>
            <thead>
              <tr className='journal-details header' style={{ position: 'sticky', top: '0' }}>
                <th style={{ textAlign: 'start' }}>Date</th>
                <th style={{ textAlign: 'start' }}>Branch</th>
                <th style={{ textAlign: 'start' }}>Cashbook</th>
                <th style={{ textAlign: 'start' }}>Currency</th>
                <th style={{ textAlign: 'start' }}>System_Balance</th>
                <th style={{ textAlign: 'start' }}>Manual_Balance</th>
                <th style={{ textAlign: 'start' }}>Reason</th>
              </tr>
            </thead>
            <tbody>
              {reports.map(report => {
                return (
                  <tr key={report.id}>
                    <td style={{ verticalAlign: 'middle' }}>
                      {report.count_date}
                    </td>
                    <td style={{ verticalAlign: 'middle' }}>
                      {report.branch_name}
                    </td>
                    <td style={{ verticalAlign: 'middle' }}>
                      {report.account_name}- {report.currency}
                    </td>
                    <td style={{ verticalAlign: 'middle' }}>
                      {report.currency}
                    </td>
                    <td style={{ verticalAlign: 'middle' }}>
                      {report.system_balance}
                    </td>
                    <td style={{ verticalAlign: 'middle' }}>
                      {report.counted_total}
                    </td>
                    <td style={{ verticalAlign: 'middle' }}>
                      {report.variance_explanation}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}


const DenominationTable = ({reports}) => {
  const { column_labels, rows } = reports;

  return (
    <div style={{ padding: '0', border: 'none' }}>
      <div style={{ width: '100%', overflowX: 'auto' }}>
        <div className='table__height'>
          <table className='table' id='requests'>
            <thead>
              <tr className='journal-details header' style={{ position: 'sticky', top: '0' }}>
                <th style={{ textAlign: 'start' }}>Date</th>
                <th style={{ textAlign: 'start' }}>Branch</th>
                <th style={{ textAlign: 'start' }}>Cashbook</th>
                {column_labels.map((label) => (
                  <th key={label}>{label}</th>
                ))}
                <th>System_Balance</th>
                <th>Manual_Balance</th>
                <th>Variance</th>
                <th style={{ textAlign: 'start' }}>Reason</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(row => {
                return (
                  <tr key={row.cash_count_id}>
                    <td style={{ verticalAlign: 'middle' }}>
                      {row.count_date}
                    </td>
                    <td style={{ verticalAlign: 'middle' }}>
                      {row.branch_name}
                    </td>
                    <td style={{ verticalAlign: 'middle' }}>
                      {row.account_name}
                    </td>
                    {column_labels.map((label) => (
                      <td key={label} style={{ verticalAlign: 'middle' }}>
                        {row.denomination_quantities?.[label] ?? 0}
                      </td>
                    ))}
                    <td style={{ verticalAlign: 'middle' }}>{row.system_total}</td>
                    <td style={{ verticalAlign: 'middle' }}>{row.manual_total}</td>
                    <td style={{color: Number(row.variance) < 0 ? "red" : "green", verticalAlign: 'middle' }}>
                      {row.variance}
                    </td>
                    <td style={{ verticalAlign: 'middle' }}>{row.variance_explanation}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default CashCountReport;