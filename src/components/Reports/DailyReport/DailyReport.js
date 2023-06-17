import React, {useState} from 'react';
import Filter from './Filter';
import Table from './Table';

function DailyReport({loggedInUser}) {
    const [params, setParams] = useState(null);
    const [dailyData, setDailyData] = useState(null);
    const [intValues, setIntValues] = useState([])


    return (
        <>
            <Filter setDailyData={setDailyData} setParams={setParams} setIntValues={setIntValues}/>
            <div style={{paddingTop: '2rem'}}></div>
            {dailyData &&
                <Table
                    report={dailyData} 
                    loggedInUser={loggedInUser}
                    intValues={intValues}
                />
            }
        </>
    )
}

export default DailyReport;