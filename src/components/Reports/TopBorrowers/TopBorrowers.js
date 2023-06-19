import React, {useState} from 'react';
import Filter from './Filter';
import Table from './Table';

function TopBorrowers({loggedInUser}) {
  const [params, setParams] = useState(null);
  const [borrowersData, setBorrowersData] = useState({total_count: 0, next_page_num: 0, report: []});
  const [intValues, setIntValues] = useState([])
  const [currency, setCurrency] = useState(null);

  return (
    <>
        <>
            <Filter 
                setBorrowersData={setBorrowersData} 
                setParams={setParams} 
                setIntValues={setIntValues}
                setCurrency={setCurrency}
            />
            <div style={{paddingTop: '2rem'}}></div>
            {borrowersData.report &&
                <Table
                    report={borrowersData} 
                    loggedInUser={loggedInUser}
                    intValues={intValues}
                    currency={currency}
                />
            }
        </>
    </>
  )
}

export default TopBorrowers;