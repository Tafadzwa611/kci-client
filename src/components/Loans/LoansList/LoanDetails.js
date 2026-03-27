import Actions from './Actions';
import { statusClasses } from './data';
import React from 'react';
import BlocTabs from './BlocTabs';
import axios from 'axios';

function LoanDetails({ loanApiData, close }) {
  const [loan, setLoan] = React.useState(loanApiData);

  React.useEffect(() => {
    const fetch = async () => {
      if (loan) return;
      const response = await axios.get(`/loansapi/get_loan/${loanApiData.id}/`);
      setLoan(response.data);
    };
    fetch();
  }, [JSON.stringify(loan)]);

  if (!loan) {
    return <div>Loading...</div>;
  }

  const loanType = loan.client_type === 'Clients' || loan.client_type === 'Groups' ? 'cli' : 'sol';

  return (
    <div id='loan-details'>
      <div style={{ position: 'sticky', top: '0', width: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', padding: '1.5rem' }} className='j-details-container'>
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', columnGap: '5px' }}>
                {close && (
                  <button className='btn btn-default client__details' onClick={close}>
                    Close
                  </button>
                )}
                <button className='btn btn-default client__details' onClick={() => setLoan(null)}>
                  Refresh
                </button>
              </div>
              <div></div>
            </div>

            <div className='loans__info__container'>
              <div className='loans__info__section'>
                <span style={{ margin: '0 5px' }}><b>{loan.branch} Branch </b></span> /
                <span style={{ margin: '0 5px' }}>
                  <b> {loan.client_fullname ? loan.client_fullname : loan.group_name}&apos;s</b> Loan Details
                </span> /
                <span style={{ margin: '0 5px' }}><b>{loan.loan_id}</b></span> /
                <div style={{ marginLeft: '5px' }}>
                  <button className={statusClasses[loan.status]}>
                    {loan.status === 'Approved' ? 'Awaiting Disbursement' : loan.status} {loan.auto_restructured && '(Auto Restructured)'}
                  </button>
                </div>
              </div>

              <Actions loan={loan} setLoanDetails={setLoan} loanType={loanType} />
            </div>
          </div>

          <BlocTabs
            loan={loan}
            setLoan={setLoan}
            client_name={loan.client_fullname ? loan.client_fullname : loan.group_name}
          />
        </div>
      </div>
    </div>
  );
}

export default LoanDetails;