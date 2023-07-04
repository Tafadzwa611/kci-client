import React, {useState} from 'react';
import DateRange from './DateRange';
import Table from './Table';

function DisbursementReport({loggedInUser}) {
  const [params, setParams] = useState(null);
  const [disbursementData, setDisbursementData] = useState({total_count: 0, next_page_num: 0, report: []});
  const [intValues, setIntValues] = useState([])
  const [currency, setCurrency] = useState(null);

  return (
    <>
        <>
            <DateRange 
                setDisbursementData={setDisbursementData} 
                setParams={setParams} 
                setIntValues={setIntValues}
                setCurrency={setCurrency}
            />
            <div style={{paddingTop: '2rem'}}></div>
            {disbursementData.report &&
                <Table
                    report={disbursementData} 
                    loggedInUser={loggedInUser}
                    intValues={intValues}
                    currency={currency}
                    setDisbursementData={setDisbursementData}
                    params={params}
                />
            }
        </>
    </>
  )
}

export default DisbursementReport;