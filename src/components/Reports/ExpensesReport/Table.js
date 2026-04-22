import React, { useState } from 'react';
import axios from 'axios';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const toNumber = value => {
  const normalized = Number(value);
  return Number.isNaN(normalized) ? 0 : normalized;
};

const formatMoney = value => toNumber(value).toLocaleString(undefined, {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const formatReportDate = value => {
  if (!value) {
    return '';
  }

  const normalized = value.includes('/') ? value.split('/').reverse().join('-') : value;
  const date = new Date(normalized);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).replace(/ /g, '-');
};

const countVisibleItems = groupedExpenses => groupedExpenses.reduce((groupAcc, group) => {
  return groupAcc + (group.dates || []).reduce((dateAcc, dateGroup) => dateAcc + (dateGroup.items || []).length, 0);
}, 0);

const TableHeader = ({ report, itemCount, params, setReport, setParams }) => (
  <div className='table-header'>
    <div style={{ display: 'flex', columnGap: '10px', alignItems: 'center' }}>
      <Pager report={report} params={params} setReport={setReport} setParams={setParams} />
      <div style={{ marginTop: '6px' }}>Showing {itemCount} of {report.count || itemCount} expenses.</div>
    </div>
    <div style={{ display: 'flex', columnGap: '10px', alignItems: 'center' }}>
      <div style={{ marginTop: '6px' }}>Page {report.number || 1} of {report.num_of_pages || 1}</div>
      <ReactHTMLTableToExcel
        id='expenses-report-xls-button'
        className='btn btn-default'
        table='expenses-report'
        filename='expenses-report'
        sheet='tablexls'
        buttonText='Download as XLS'
      />
    </div>
  </div>
);

const Pager = ({ report, params, setReport, setParams }) => {
  const [errors, setErrors] = useState(null);

  const onClick = async evt => {
    try {
      const pageNum = evt.target.innerText === 'Next' ? report.next_page_num : report.prev_page_num;
      const newParams = new URLSearchParams(params?.toString() || '');
      newParams.set('page_num', pageNum);

      const response = await axios.get('/reportsapi/expenses_report/', { params: newParams });
      setReport(response.data);
      setParams(newParams);
      setErrors(null);
    } catch (error) {
      if (error.message === 'Network Error') {
        setErrors({ detail: 'Network Error' });
      } else {
        setErrors({ detail: 'Server Error' });
      }
    }
  };

  return (
    <div className='footer-container font-12 text-light' style={{ display: 'flex', columnGap: '3px' }}>
      {errors && JSON.stringify(errors)}
      {report.prev_page_num ? (
        <>
          <button className='btn btn-default' onClick={onClick}>Back</button>
          <br />
        </>
      ) : null}
      {report.next_page_num ? <button className='btn btn-default' onClick={onClick}>Next</button> : null}
    </div>
  );
};

const Table = ({ report, params, setReport, setParams }) => {
  const groupedExpenses = report.grouped_expenses || [];
  const itemCount = countVisibleItems(groupedExpenses);
  const fromDate = formatReportDate(params?.get('min_date'));
  const toDate = formatReportDate(params?.get('max_date'));

  return (
    <>
      <TableHeader
        report={report}
        itemCount={itemCount}
        params={params}
        setReport={setReport}
        setParams={setParams}
      />
      <div className='table-container' style={{ padding: '0', border: 'none' }}>
        <div className='table-responsive font-12' style={{ maxHeight: '600px' }}>
          <table className='table' id='expenses-report' style={{ width: '100%' }}>
            <thead className='clients-report-table'>
              <tr className='fees__report_thead'>
                <th colSpan={3}>
                  {fromDate ? `From: ${fromDate}` : 'From:'} &nbsp;&nbsp;&nbsp;
                  {toDate ? `To: ${toDate}` : 'To:'}
                </th>
              </tr>
              <tr className='fees__report_thead'>
                <th>Description</th>
                <th>Journal Number</th>
                <th style={{ textAlign: 'right' }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {groupedExpenses.length ? groupedExpenses.map((group, groupIdx) => (
                <React.Fragment key={`${group.branch_name}-${groupIdx}`}>
                  <tr>
                    <td colSpan={3}><b>{group.branch_name}</b></td>
                  </tr>

                  {(group.dates || []).map((dateGroup, dateIdx) => (
                    <React.Fragment key={`${group.branch_name}-${dateGroup.expense_date}-${dateIdx}`}>
                      <tr>
                        <td colSpan={3}><b>{dateGroup.expense_date}</b></td>
                      </tr>

                      {(dateGroup.items || []).map(item => (
                        <tr key={item.id}>
                          <td>{item.description}</td>
                          <td>{item.reference || '-'}</td>
                          <td style={{ textAlign: 'right' }}>{formatMoney(item.amount)}</td>
                        </tr>
                      ))}

                      <tr>
                        <td colSpan={2}></td>
                        <td style={{ textAlign: 'right' }}><b>{formatMoney(dateGroup.date_total)}</b></td>
                      </tr>
                    </React.Fragment>
                  ))}

                  <tr>
                    <td colSpan={2}></td>
                    <td style={{ textAlign: 'right' }}><b>{formatMoney(group.branch_total)}</b></td>
                  </tr>
                </React.Fragment>
              )) : (
                <tr>
                  <td colSpan={3}>No expenses found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Table;
