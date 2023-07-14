import React, {useEffect, useState} from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import LoansTable from './LoansTable';
import Select from 'react-select';
import { makeRequest } from '../../../utils/utils';
import AgeingAnalysisFilter from './AgeingAnalysisFilter';

ChartJS.register(ArcElement, Tooltip, Legend);


function AgeingAnalysis({
  open,
  setOpen,
  par_name,
  par_value,
  branches,
  currencyId,
  lowerLimit,
  upperLimit,
  loans_in_arrears_count,
  total_loan_count,
  principal_at_risk,
  total_loan_portfolio,
  loggedInUser,
  selectedBranchesIds,
  intValues,
  setParams,
  params,
  currency
}) {
  const [loans, setLoans] = useState({count: 0, next_page_num: 0, loans_in_arrears: []});

  const closeModal = () => {
    setLoans({count: 0, next_page_num: 0, loans_in_arrears: []});
    setOpen(false);
  }

  const otherLoans = 100 - Number(par_value);
  const data = {
    labels: [`% of Loan portfolio ${par_name} days late`, 'Other Loans'],
    datasets: [
      {
        label: '# of Votes',
        data: [par_value, otherLoans],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={open ? 'modal fade show' : 'modal fade'} style={{display: open ? 'block' : 'none'}}>
      <div className='modal-dialog modal-xl modal-dialog-scrollable' style={{maxWidth:"calc(100% - 3rem)", height:"calc(100% - 7rem)", top:"3.8rem"}}>
        <div className='modal-content'>
          <div className='modal-header'>
            <span style={{fontWeight:"600"}}>Aging Report {par_name}</span>
            <button type='button' className='close' onClick={closeModal}><span aria-hidden='true'>&times;</span></button>
          </div>
          <ModalBody
            data={data}
            currency={currency}
            branches={branches}
            loans={loans}
            setLoans={setLoans}
            loans_in_arrears_count={loans_in_arrears_count}
            par_name={par_name}
            par_value={par_value}
            total_loan_count={total_loan_count}
            principal_at_risk={principal_at_risk}
            total_loan_portfolio={total_loan_portfolio}
            loggedInUser={loggedInUser}
            setParams={setParams}
            intValues={intValues}
            params={params}
          />
          <div className='modal-footer justify-content-between'>
            <button type='button' className='btn btn-default' onClick={closeModal}>Close</button>
          </div>
        </div>
      </div>
    </div>
  )
}


const ModalBody = ({
  data,
  currency,
  branches,
  loans,
  loans_in_arrears_count,
  par_name,
  par_value,
  total_loan_count,
  principal_at_risk,
  total_loan_portfolio,
  loggedInUser,
  setLoans,
  intValues,
  setParams,
  params
}) => {
    return (
        <>
            <div className='modal-body'>
                <div style={{columnGap:"3rem", display:"grid", gridTemplateColumns:"1fr 2fr"}}>
                    <div className='chartWrapper'>
                        <div className='chartAreaWrapper'>
                            <div className='chartAreaWrapper2' style={{width: '400px', height: '400px'}}>
                                <Pie data={data} />
                            </div>
                        </div>
                    </div>
                    <div className="age-report-select-disabled">
                        <div style={{width:"100%", marginTop:"7px"}}>
                            <div>
                            <span className='info-box-text'>Branches: 
                                <Select
                                isMulti
                                name='branches'
                                options={branches}
                                value={branches}
                                classNamePrefix='select'
                                className='basic-multi-select'
                                placeholder='Select Branches'
                                isDisabled={true}
                                />
                            </span><br/>
                            </div>
                            <div style={{display:"flex", flexDirection:"column", rowGap:"5px"}}>
                                <span className='info-box-text'>Par Value: <b>{par_value}%</b></span><br/>
                                <span className='info-box-text'>Number of loans {par_name} days late: <b>{loans_in_arrears_count}</b></span><br/>
                                <span className='info-box-text'>Total Loan Count: <b>{total_loan_count}</b></span><br/>
                                <span className='info-box-text'>Principal At Risk: <b>{currency} {principal_at_risk}</b></span><br/>
                                <span className='info-box-text'>Total Loan Portfolio: <b>{currency} {total_loan_portfolio}</b></span>
                            </div>
                        </div>
                    </div>
                </div>
                <AgeingAnalysisFilter setLoans={setLoans} intValues={intValues} setParams={setParams} />
                {loans.loans_in_arrears &&
                  <LoansTable 
                    currency={currency} 
                    loans={loans} 
                    par_name={par_name} 
                    loggedInUser={loggedInUser} 
                    setLoans={setLoans}
                    params={params}
                  />
                }
            </div>
        </>
    )
}

export default AgeingAnalysis;

