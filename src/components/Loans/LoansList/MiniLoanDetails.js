import Actions from './Actions';
import React from 'react';
import { Link } from 'react-router-dom';
import BlocTabs from './BlocTabs';
import {statusClasses} from './data';
import axios from 'axios';


function MiniLoanDetails({loanData, extra}) {
  const {setLoanId, setLoanData} = extra;
  const [loan, setLoan] = React.useState(loanData);

  React.useEffect(() => {
    const fetch = async () => {
      if (loan)return;
      const response = await axios.get(`/loansapi/get_loan/${loanData.id}/`);
      setLoan(response.data);
    }
    fetch();
  }, [JSON.stringify(loan)]);

  if(!loan) {
    return <div>Loading...</div>
  }

  const loanType = loan.client_type === 'Clients' || loan.client_type === 'Groups' ? 'cli' : 'sol';

  return (
    <div id='loan-details'>
      <div style={{position:'sticky', top:'0', width:'100%'}}>
        <div style={{display:'flex', flexDirection:'column', padding:'1.5rem'}} className='j-details-container'>
          <div style={{marginBottom:'1rem'}}>
            <div style={{marginBottom:'1rem', display:'flex', justifyContent:'space-between'}}>
              <div>
                <button className='btn btn-default client__details' onClick={() => setLoanId(null)}>Close</button>
                <button className='btn btn-default client__details' onClick={() => setLoan(null)}>Refresh</button>
              </div>
              <button className='btn btn-default client__details'>
                <Link to={`/loans/viewloans/loandetails/cli/${loan.id}`}>Expand</Link>
              </button>
            </div>
            <div style={{marginBottom:'1rem', display:'flex', justifyContent:'space-between'}}>
              <div style={{display:'flex', alignItems:'center'}}>
                <span style={{margin: "0 5px"}}><b>{loan.branch} Branch </b></span> /
                <span style={{marginRight:"5px"}}><b>{loan.client_fullname ? loan.client_fullname : loan.group_name}</b></span> /
                <span style={{margin: "0 5px"}}><b>{loan.loan_id}</b></span> /          
                <div style={{marginLeft:"5px"}}>
                  <button className={statusClasses[loan.status]}>
                    {loan.status} {loan.auto_restructured && '(Auto Restructured)'}
                  </button>
                </div>
              </div>
              <Actions
                loan={loan}
                setLoanDetails={setLoan}
                setLoanId={setLoanId}
                setLoanData={setLoanData}
                loanType={loanType}
              />
            </div>
          </div>
          <BlocTabs
            loan={loan}
            setLoan={setLoan}
            setLoanData={setLoanData}
            client_name={loan.client_fullname ? loan.client_fullname : loan.group_name}
          />
        </div>
      </div>
    </div>
  )
}

export default MiniLoanDetails;