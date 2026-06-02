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
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


function CashCountReport() {
  const [reports, setReports] = React.useState([]);

  return (
    <div>
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


const Table = ({ reports }) => {
  const exportToPDF = () => {
    const doc = new jsPDF({ orientation: "landscape" });

    const columns = [
      "Date",
      "Branch",
      "Cashbook",
      "Currency",
      "System Balance",
      "Manual Balance",
      "Reason",
    ];

    const rows = reports.map(r => [
      r.count_date,
      r.branch_name,
      `${r.account_name} - ${r.currency}`,
      r.currency,
      r.system_balance,
      r.counted_total,
      r.variance_explanation,
    ]);

    doc.text("Cash Count Report", 14, 15);

    autoTable(doc, {
      startY: 20,
      head: [columns],
      body: rows,
      styles: { fontSize: 9 },
    });

    doc.save("cash_count_report.pdf");
  };

  return (
    <div style={{ padding: '0', border: 'none' }}>
      <div style={{ marginBottom: '10px' }}>
        <button className="btn btn-primary" onClick={exportToPDF}>
          Export PDF
        </button>
      </div>

      <div style={{ width: '100%', overflowX: 'auto' }}>
        <div className='table__height'>
          <table className='table' id='requests'>
            <thead>
              <tr className='journal-details header' style={{ position: 'sticky', top: '0' }}>
                <th>Date</th>
                <th>Branch</th>
                <th>Cashbook</th>
                <th>Currency</th>
                <th>System Balance</th>
                <th>Manual Balance</th>
                <th>Variance</th>
                <th>Reason</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {reports.map(report => (
                <tr key={report.id}>
                  <td>{report.count_date}</td>
                  <td>{report.branch_name}</td>
                  <td>{report.account_name} - {report.currency}</td>
                  <td>{report.currency}</td>
                  <td>{report.system_balance}</td>
                  <td>{report.counted_total}</td>
                  <td>{report.variance}</td>
                  <td>{report.variance_explanation}</td>
                  <td>
                    <Link 
                      to={`/accounting/viewaccounting/update_cashcount/${report.account_id}?date=${report.count_date}&explanation=${report.variance_explanation}&reportId=${report.id}`}
                    >
                      <button
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
                        Edit
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};


const DenominationTable = ({ reports }) => {
  const { column_labels = [], rows = [] } = reports;

  const exportToPDF = () => {
    const doc = new jsPDF({
      orientation: "landscape",
      format: "a3",
    });

    const columns = [
      "Date",
      "Branch",
      "Cashbook",
      ...column_labels,
      "System Balance",
      "Manual Balance",
      "Variance",
      "Reason",
    ];

    const body = rows.map(row => [
      row.count_date,
      row.branch_name,
      row.account_name,
      ...column_labels.map(label => row.denomination_quantities?.[label] ?? 0),
      row.system_total,
      row.manual_total,
      row.variance,
      row.variance_explanation,
    ]);

    doc.text("Cash Count Denomination Report", 14, 15);

    autoTable(doc, {
      startY: 20,
      head: [columns],
      body,
      styles: {
        fontSize: 7,
        cellPadding: 2,
        overflow: "linebreak",
        valign: "middle",
      },
      theme: "grid",
      headStyles: {
        fontSize: 7,
      },
      columnStyles: {
        0: { cellWidth: 20 },
        1: { cellWidth: 28 },
        2: { cellWidth: 28 },
        [columns.length - 1]: { cellWidth: 60 },
      },
      margin: { left: 8, right: 8 },
      rowPageBreak: "avoid",
      tableWidth: "wrap",
    });

    doc.save("cash_count_denomination_report.pdf");
  };

  return (
    <div style={{ padding: '0', border: 'none' }}>
      <div style={{ marginBottom: '10px' }}>
        <button className="btn btn-primary" onClick={exportToPDF}>
          Export PDF
        </button>
      </div>

      <div style={{ width: '100%', overflowX: 'auto' }}>
        <div className='table__height'>
          <table className='table' id='requests'>
            <thead>
              <tr className='journal-details header' style={{ position: 'sticky', top: '0' }}>
                <th>Date</th>
                <th>Branch</th>
                <th>Cashbook</th>
                {column_labels.map(label => (
                  <th key={label}>{label}</th>
                ))}
                <th>System Balance</th>
                <th>Manual Balance</th>
                <th>Variance</th>
                <th>Reason</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(row => (
                <tr key={row.cash_count_id}>
                  <td>{row.count_date}</td>
                  <td>{row.branch_name}</td>
                  <td>{row.account_name}</td>

                  {column_labels.map(label => (
                    <td key={label}>
                      {row.denomination_quantities?.[label] ?? 0}
                    </td>
                  ))}

                  <td>{row.system_total}</td>
                  <td>{row.manual_total}</td>

                  <td style={{ color: Number(row.variance) < 0 ? "red" : "green" }}>
                    {row.variance}
                  </td>
                  <td>{row.variance_explanation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CashCountReport;