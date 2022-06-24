import React from 'react';
import DateRange from './DateRange';
import NoData from './NoData';
import Table from './Table'

const ProfitAndLoss = () => {
    return (
        <div className="card slide">
            <div className="card-body">
                <h5 className="table-heading" style={{marginBottom:"20px"}}>Profit And Loss</h5>

                <DateRange />
                <NoData />
                <Table />
            </div>
        </div>
    );
}

export default ProfitAndLoss;