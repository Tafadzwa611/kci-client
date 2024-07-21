import React, { useState } from 'react';
import { Modal, Fetcher, CheckBox } from '../../../../common';
import { useLoggedInUser } from '../../../../contexts/LoggedInUserContext';
import SingleAccount from './SingleAccount';
import MultipleAccounts from './MultipleAccounts';

function EarlySettlement({loan, setLoan, setOpen, setLoanData}) {
  const {loggedInUser} = useLoggedInUser();
  const today = new Date();
  const dt = loggedInUser.date_format.replace('dd', today.getDate()).replace('mm', today.getMonth()+1).replace('yyyy', today.getFullYear());
  const [interestDate, setInterestDate] = useState(dt);
  const [useMulti, setUseMulti] = useState(false);

  if (!['Open', 'Arrears'].includes(loan.status)) {
    return (
      <Modal open={true} setOpen={setOpen} title={'Early Settlement'}>
        <div>
          Loan needs to be a running loan.
        </div>
      </Modal>
    )
  }

  return (
    <Modal open={true} setOpen={setOpen} title={'Early Settlement'}>
      <Fetcher urls={['/acc-api/cash-and-cash-equivalents/', `/loansapi/pro_rata_data/${loan.id}/?interest_date=${interestDate}`]}>
        {({data}) => (
          <>
            <CheckBox label='Use Multiple Fund Accounts' isChecked={useMulti} onChange={e => setUseMulti(e.target.checked)}/>
            {useMulti ?
            <MultipleAccounts
              data={data}
              loan={loan}
              setLoan={setLoan}
              interestDate={interestDate}
              setInterestDate={setInterestDate}
              setOpen={setOpen}
              setLoanData={setLoanData}
            /> :
            <SingleAccount
              loan={loan}
              interestDate={interestDate}
              setLoan={setLoan}
              setOpen={setOpen}
              setInterestDate={setInterestDate}
              data={data}
              setLoanData={setLoanData}
            />}
          </>
        )}
      </Fetcher>
    </Modal>
  )
}

export default EarlySettlement;