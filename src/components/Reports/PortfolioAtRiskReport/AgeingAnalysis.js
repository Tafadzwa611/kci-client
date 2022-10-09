import React, {useEffect, useState} from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import LoansTable from './LoansTable';
import Select from 'react-select';
import { makeRequest } from '../../../utils/utils';


ChartJS.register(ArcElement, Tooltip, Legend);


function AgeingAnalysis({
  open,
  setOpen,
  par_name,
  par_value,
  currencyIso,
  branches,
  currencyId,
  limits,
  loans_in_arrears_count,
  total_loan_count,
  principal_at_risk,
  total_loan_portfolio
}) {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    fetchLoans();
  }, []);

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

  async function fetchLoans() {
    try {
      const url = getUrl();
      const response = await makeRequest.get(url, {timeout: 6000});
      if (response.ok) {
        const data = await response.json();
        return setLoans(data);
      }else {
        const error = await response.json();
        console.log(error);
      }
    }catch(error) {
      console.log(error);
    }
  }

  const getUrl = () => {
    const branchesIds = branches.map(branch => branch.id);
    return `/reportsapi/ageing-report/?currency_id=${currencyId}&branch_ids=${branchesIds.toString()}${limits.lowerLimit != '' ? `&lower_limit=${limits.lowerLimit}`: ``}
    ${limits.upperLimit != '' ? `&upper_limit=${limits.upperLimit}`: ``}`
  }

  return (
    <div className={open ? 'modal fade show' : 'modal fade'} style={{display: open ? 'block' : 'none'}}>
      <div className='modal-dialog modal-xl modal-dialog-scrollable' style={{maxWidth:"calc(100% - 3rem)", height:"calc(100% - 7rem)", top:"3.8rem"}}>
        <div className='modal-content'>
          <div className='modal-header'>
            <span style={{fontWeight:"600"}}>Aging Report {par_name}</span>
            <button type='button' className='close' onClick={e => setOpen(false)}><span aria-hidden='true'>&times;</span></button>
          </div>
          <ModalBody
            data={data}
            currencyIso={currencyIso}
            branches={branches}
            loans={loans}
            loans_in_arrears_count={loans_in_arrears_count}
            par_name={par_name}
            par_value={par_value}
            total_loan_count={total_loan_count}
            principal_at_risk={principal_at_risk}
            total_loan_portfolio={total_loan_portfolio}
          />
          <div className='modal-footer justify-content-between'>
            <button type='button' className='btn btn-default' onClick={e => setOpen(false)}>Close</button>
            {/* <button>Submit</button> */}
          </div>
        </div>
      </div>
    </div>
  )
}


const ModalBody = ({
  data,
  currencyIso,
  branches,
  loans,
  loans_in_arrears_count,
  par_name,
  par_value,
  total_loan_count,
  principal_at_risk,
  total_loan_portfolio
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
                                <span className='info-box-text'>Principal At Risk: <b>{currencyIso} {principal_at_risk}</b></span><br/>
                                <span className='info-box-text'>Total Loan Portfolio: <b>{currencyIso} {total_loan_portfolio}</b></span>
                            </div>
                        </div>
                    </div>
                </div>
                <LoansTable currencyIso={currencyIso} loans={loans}/>
            </div>
        </>
    )
}

export default AgeingAnalysis;