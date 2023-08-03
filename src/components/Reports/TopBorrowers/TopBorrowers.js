import React, {useState} from 'react';
import Filter from './Filter';
import Table from './Table';

function TopBorrowers() {
  const [borrowersData, setBorrowersData] = useState(null);
  const [currency, setCurrency] = useState(null);

  return (
    <>
      <Filter setBorrowersData={setBorrowersData} setCurrency={setCurrency}/>
      <div style={{paddingTop: '2rem'}}></div>
      {borrowersData ? <Table report={borrowersData} currency={currency}/> : null}
    </>
  )
}

export default TopBorrowers;