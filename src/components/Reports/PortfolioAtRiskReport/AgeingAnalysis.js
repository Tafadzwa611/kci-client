import React, {useState} from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import LoansTable from './LoansTable';
import Select from 'react-select';
import AgeingAnalysisFilter from './AgeingAnalysisFilter';

ChartJS.register(ArcElement, Tooltip, Legend);


function AgeingAnalysis({open, setOpen, branches, par}) {
  return (
    <div className={open ? 'modal fade show' : 'modal fade'} style={{display: open ? 'block' : 'none'}}>
      <div className='modal-dialog modal-xl modal-dialog-scrollable' style={{maxWidth:'calc(100% - 3rem)', height:'calc(100% - 7rem)', top:'3.8rem'}}>
        <div className='modal-content'>
          <div className='modal-header'>
            <span style={{fontWeight:'600'}}>Aging Report {par.par_name}</span>
            <button type='button' className='close' onClick={() => setOpen(false)}><span aria-hidden='true'>&times;</span></button>
          </div>
          <ModalBody branches={branches} par={par}/>
          <div className='modal-footer justify-content-between'>
            <button type='button' className='btn btn-default' onClick={() => setOpen(false)}>Close</button>
          </div>
        </div>
      </div>
    </div>
  )
}


const ModalBody = ({par, branches}) => {
  const [loans, setLoans] = useState(null);
  const [params, setParams] = useState(null);

  const otherLoans = 100 - Number(par.par_value);
  const data = {
    labels: [`% of Loan portfolio ${par.par_name} days late`, 'Other Running Loans'],
    datasets: [
      {
        label: 'Par',
        data: [par.par_value, otherLoans],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className='modal-body'>
      <div style={{columnGap:'3rem', display:'grid', gridTemplateColumns:'1fr 2fr'}}>
        <div className='chartWrapper'>
          <div className='chartAreaWrapper'>
            <div className='chartAreaWrapper2' style={{width: '400px', height: '400px'}}>
              <Pie data={data} />
            </div>
          </div>
        </div>
        <div className='age-report-select-disabled'>
          <div style={{width:'100%', marginTop:'7px'}}>
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
            <div style={{display:'flex', flexDirection:'column', rowGap:'5px'}}>
              <span className='info-box-text'>Par Value: <b>{par.par_value}%</b></span><br/>
              <span className='info-box-text'>Number of loans {par.par_name} days late: <b>{par.loans_in_arrears_count}</b></span><br/>
              <span className='info-box-text'>Total Loan Count: <b>{par.total_loan_count}</b></span><br/>
              <span className='info-box-text'>Principal At Risk: <b>{par.currency} {par.principal_at_risk}</b></span><br/>
              <span className='info-box-text'>Total Loan Portfolio: <b>{par.currency} {par.total_loan_portfolio}</b></span>
            </div>
          </div>
        </div>
      </div>
      <AgeingAnalysisFilter setParams={setParams} setLoans={setLoans} par={par}/>
      {loans ? <LoansTable currency={par.currency} loans={loans} params={params} setLoans={setLoans}/> : null}
    </div>
  )
}

export default AgeingAnalysis;

