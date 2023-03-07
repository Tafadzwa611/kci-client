
import React from 'react';
import { convertDate } from '../../Accounting/Journals/utils';


function TableHeader({aggregateData, minDate, maxDate}) {
  return (  
    <div style={{marginBottom:"1.5rem"}}>
      <div className="header-padding-container">
        <div className="header-padding"><b>From:</b></div>
        <div className="header-padding">{convertDate(minDate)}</div>
      </div>
      <div className="header-padding-container">
        <div className="header-padding"><b>To:</b></div>
        <div className="header-padding">{convertDate(maxDate)}</div>
      </div>
      <div className="header-padding-container">
        <div className="header-padding"><b>Report Run Date:</b></div>
        <div className="header-padding">{convertDate(aggregateData.report_run_date)} {aggregateData.report_run_time}</div>
      </div>
      <div className="header-padding-container">
        <div className="header-padding"><b>Number Of Installments:</b></div>
        <div className="header-padding">{aggregateData.num_of_installments}</div>
      </div>
      <div className="header-padding-container">
        <div className="header-padding"><b>Total Amount Expected:</b></div>
        <div className="header-padding">{aggregateData.total_expected_amount}</div>
      </div>
      <div className="header-padding-container">
        <div className="header-padding"><b>Total Repaid Amount:</b></div>
        <div className="header-padding">{aggregateData.total_amount_paid}</div>
      </div>
      <div className="header-padding-container">
        <div className="header-padding"><b>Total Principal Expected:</b></div>
        <div className="header-padding">{aggregateData.total_expected_principal}</div>
      </div>
      <div className="header-padding-container">
        <div className="header-padding"><b>Total Principal Repaid:</b></div>
        <div className="header-padding">{aggregateData.total_principal_paid}</div>
      </div>
      <div className="header-padding-container">
        <div className="header-padding"><b>Total Interest Expected:</b></div>
        <div className="header-padding">{aggregateData.total_expected_interest}</div>
      </div>
      <div className="header-padding-container">
        <div className="header-padding"><b>Total Interest Repaid:</b></div>
        <div className="header-padding">{aggregateData.total_interest_paid}</div>
      </div>
      <div className="header-padding-container">
        <div className="header-padding"><b>Total Penalty Expected:</b></div>
        <div className="header-padding">{aggregateData.total_expected_penalty}</div>
      </div>
      <div className="header-padding-container-bottom">
        <div className="header-padding"><b>Total Penalty Repaid:</b></div>
        <div className="header-padding">{aggregateData.total_penalty_paid}</div>
      </div>
    </div>
  )
}

export default TableHeader;