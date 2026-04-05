import React from 'react';
import axios from 'axios';
import DateRange from './DateRange';
import Table from './Table';

function CashBook() {
  const [statement, setStatement] = React.useState(null);
  const [accounts, setAccounts] = React.useState(null);

  React.useEffect(() => {
    const fetchAccounts = async () => {
      const response = await axios.get('/acc-api/cash-accounts-list/');
      setAccounts(response.data?.accounts || []);
    };
    fetchAccounts();
  }, []);

  if (accounts === null) {
    return (
      <div className='bloc-tabs'>
        Loading...
      </div>
    );
  }

  return (
    <div>
      <DateRange
        setStatement={setStatement}
        accounts={accounts}
      />
      <div style={{ paddingTop: '1rem' }}></div>

      {statement ? <Table statement={statement} /> : null}
    </div>
  )
}

export default CashBook;