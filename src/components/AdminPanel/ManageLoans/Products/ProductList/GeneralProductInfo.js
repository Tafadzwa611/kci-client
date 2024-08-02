import React from 'react';
import { useBranches } from '../../../../../contexts/BranchesContext';

function GeneralProductInfo({product, close, setView}) {
  const {branches} = useBranches();
  const allowedBranches = branches.filter(br => product.allowed_branches_ids.includes(br.id));

  return (
    <div style={{display:"flex", columnGap:"1%"}}>
      <div style={{width:"74%"}}>
        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", marginBottom: '2rem'}}>
          <div style={{width:"33%"}}>
            <ul style={{paddingRight:"1rem"}}>
              <li style={{marginBottom: '1rem'}}><b>Product Information</b></li>
              <li>Product Name: {product.name}</li>
              <li>External Name: {product.ext_name}</li>
              <li>Product ID: {product.loan_product_id}</li>
              <li>Product Type: {product.product_type}</li>
              <li>Product Description: {product.description}</li>
              {product.is_active ?
                <li>Status: <span className="badge badge-success">Active</span></li>:
                <li>Status: <span className="badge badge-danger">Inactive</span></li>
              }
              <li>Date Created: {product.date_created}</li>
              <li>Created By: {product.created_by}</li>
            </ul>
          </div>
          <div style={{width:"33%"}}>
            <ul style={{paddingRight:"1rem"}}>
              <li style={{marginBottom: '1rem'}}><b>Principal Settings</b></li>
              <li>Product Currency: {product.currency}</li>
              <li>Minimum Principal Amount: {product.minimum_principal_amount}</li>
              <li>Maximum Principal Amount: {product.maximum_principal_amount}</li>
            </ul>
          </div>
          <div style={{width:"33%"}}>
            <ul style={{paddingRight:"1rem"}}>
              <li style={{marginBottom: '1rem'}}><b>Interest Settings</b></li>
              <li>Interest Method: {product.interest_method}</li>
              <li>Minimum Interest Rate: {product.minimum_interest_rate}%{product.interest_interval}</li>
              <li>Maximum Interest Rate: {product.maximum_interest_rate}%{product.interest_interval}</li>
            </ul>
          </div>
        </div>
        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", marginBottom: '2rem'}}>
          <div style={{width:"33%"}}>
            <ul style={{paddingRight:"1rem"}}>
              <li style={{marginBottom: '1rem'}}><b>Tenure Settings</b></li>
              <li>Minimum Number of Repayments: {getTenure(product.minimum_loan_duration, product.loan_duration_time_unit)}</li>
              <li>Maximum Number of Repayments: {getTenure(product.maximum_loan_duration, product.loan_duration_time_unit)}</li>
              <li>Loan Schedule Strategy: {product.schedule_strategy}</li>
              <li>Non Working Days Rescheduling: {getActionOnHoliday(product.action_on_holiday)}</li>
            </ul>
          </div>
          <div style={{width:"33%"}}>
            <ul style={{paddingRight:"1rem"}}>
              <li style={{marginBottom: '1rem'}}><b>Arrears Settings</b></li>
              <li>Action On Default: {product.action_on_loan_default}</li>
              {product.action_on_loan_default === 'Add Penalty' &&
                <>
                  <li>Apply Penalty On: {product.apply_late_repayment_penalty_on}</li>
                  <li>Penalty Rate: {product.late_repayment_penalty_percentage}%{product.penalty_charged_per}</li>
                  <li>Penalty Tolerance Period In Days: {getTenure(product.grace_period, 'Days')}</li>
                  {product.send_sms_on_default ?
                    <li>Send SMS Alert On Default: <span className="badge badge-success">Active</span></li>:
                    <li>Send SMS Alert On Default: <span className="badge badge-danger">Inactive</span></li>}
                </>}
              {product.action_on_loan_default === 'Add Interest' &&
                <>
                  <li>Apply Interest On: {product.apply_late_repayment_penalty_on}</li>
                  <li>Interest Rate: {product.on_default_rate}%</li>
                  <li>Is Recurring: {product.is_default_interest_recurring ? 'Yes' : 'No'}</li>
                  <li>Add After Last Installment Only: {product.add_on_last_installment_only ? 'Yes' : 'No'}</li>
                  {product.send_sms_on_default ?
                    <li>Send SMS Alert On Default: <span className="badge badge-success">Active</span></li>:
                    <li>Send SMS Alert On Default: <span className="badge badge-danger">Inactive</span></li>}
                </>}
            </ul>
          </div>
          <div style={{width:"33%"}}>
            <ul style={{paddingRight:"1rem"}}>
              <li style={{marginBottom: '1rem'}}><b>Product availability</b></li>
              <li>Client Type: {product.client_type}</li>
              <li>Branches:{allowedBranches.map(br => ` ${br.name}`)}</li>
            </ul>
          </div>
        </div>
        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
          <div style={{width:"33%"}}>
            <ul style={{paddingRight:"1rem"}}>
              <li style={{marginBottom: '1rem'}}><b>Decimal Places, Rounding Off and Repayment Order</b></li>
              <li>Decimal Places: {getDecimalPlaces(product.number_of_decimal_places)}</li>
              <li>Rounding Scheme: {getRoundingScheme(product.rounding_scheme)}</li>
              <li>Repayment Order: {product.repayment_order.first}, {product.repayment_order.second}, {product.repayment_order.third}, {product.repayment_order.fourth}</li>
            </ul>
          </div>
          <div style={{width:"33%"}}>
            <ul style={{paddingRight:"1rem"}}>
              <li style={{marginBottom: '1rem'}}><b>Top-Up Settings</b></li>
              <li>Top-Up Window Period In Days: {product.topup_window_period} days</li>
              <li>Number Of Topups Allowed Per Loan: {product.number_of_topups_allowed}</li>
              <li>Maximum Top-Up Amount As A Percentage: {product.topup_limit}%</li>
            </ul>
          </div>
          <div style={{width:"33%"}}>
            <ul style={{paddingRight:"1rem"}}>
              <li style={{marginBottom: '1rem'}}><b>Auto Restructure Settings</b></li>
              {product.auto_restructure ?
                <li>Status: <span className="badge badge-success">Active</span></li>:
                <li>Status: <span className="badge badge-danger">Inactive</span></li>
              }
              <li>Auto Restructure Interest: {product.auto_restructure_interest ? `${product.auto_restructure_interest}%${product.interest_interval}` : 'Not set'}</li>
              <li>Auto Restructure Number Of Installments: {product.auto_restructure_installments ? product.auto_restructure_installments : 'Not set'}</li>
            </ul>
          </div>
        </div>
      </div>
      {/* <div style={{width:"25%"}}>
        <div className='fees-container'>
          <li style={{marginBottom: '1rem'}}><b>Loan Product Fees</b></li>
          {product.fees.length > 0 ? product.fees.map((fee, idx) => 
            <ul key={idx} style={{marginBottom: '1rem'}}>
              <li><b>Fee Name: {fee.name}</b></li>
              <li className='fees-item'>Fee Type: {fee.fee_type}</li>
              <li className='fees-item'>Is Mandatory: {fee.is_mandatory ? 'Yes' : 'No'}</li>
              <li className='fees-item'>Fee Payment: {fee.fee_calculation}</li>
              <li className='fees-item'>Value: {fee.value}</li>
            </ul> 
          ):
          <li className='fees-item'>No fees were setup for this product.</li>}
        </div>
      </div> */}
    </div>
  )
}

const getTenure = (num, timeUnit) => {
  const timeUnits = {
    Days: 'Day',
    Weeks: 'Week',
    '2 Weeks': 'Fortnight',
    Months: 'Month',
    '2 Months': 'Bimonth',
    '3 Months': 'Quarter',
    '4 Months': 'Quadrimester',
    '6 Months': 'Half Year',
    Years: 'Year',
  }
  return `${num} ${num === 1 ? timeUnits[timeUnit] : `${timeUnits[timeUnit]}s`}`
}

const getActionOnHoliday = (action) => {
  if (action === null) {
    return 'None'
  }

  return {
    NXT: 'Move ahead to next working day',
    PREV: 'Move backwards to previous working day',
    EXT: 'Extend Schedule'
  }[action]
}

const getDecimalPlaces = (number_of_decimal_places) => {
  return {
    '0.01': 'Round Off to Two Decimal Places',
    '0.1': 'Round Off to One Decimal Place',
    '1': 'Round Off to Integer'
  }[number_of_decimal_places]
}

const getRoundingScheme = (rounding_scheme) => {
  return {
    ROUND_HALF_UP: 'Round Half Up',
    ROUND_UP: 'Round Up',
    ROUND_DOWN: 'Round Down'
  }[rounding_scheme]
}

export default GeneralProductInfo;