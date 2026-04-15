import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MiniLoader from '../../Loader/MiniLoader';
import DateRange from './DateRange';
import Table from './Table';

function CashBookReport() {
  const [statement, setStatement] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [loadingAccounts, setLoadingAccounts] = useState(true);
  const [accountsError, setAccountsError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchAccounts = async () => {
      setLoadingAccounts(true);
      setAccountsError(null);

      try {
        const response = await axios.get('/acc-api/cash-accounts-list/');
        if (!mounted) return;
        setAccounts(response.data?.accounts || []);
      } catch (error) {
        if (!mounted) return;

        if (error.message === 'Network Error') {
          setAccountsError('Network Error');
        } else if (error.response?.status === 403) {
          setAccountsError('Permission Error.');
        } else if (error.response?.status === 404) {
          setAccountsError('Something could not be found.');
        } else if (error.response?.status >= 400 && error.response?.status < 500) {
          setAccountsError('Client Error');
        } else {
          setAccountsError('Server Error');
        }
      } finally {
        if (mounted) {
          setLoadingAccounts(false);
        }
      }
    };

    fetchAccounts();

    return () => {
      mounted = false;
    };
  }, []);

  if (loadingAccounts) {
    return (
      <div className='bloc-tabs'>
        <MiniLoader />
      </div>
    );
  }

  if (accountsError) {
    return (
      <div className='sf-errorbox'>
        <div className='sf-errorbox-title'>{accountsError}</div>
      </div>
    );
  }

  return (
    <>
      <DateRange
        setStatement={setStatement}
        accounts={accounts}
      />

      <div style={{ paddingTop: '1rem' }}></div>

      {statement ? <Table statement={statement} /> : null}
    </>
  );
}

export default CashBookReport;
