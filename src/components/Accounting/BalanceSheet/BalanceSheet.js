import React from 'react';
import Filter from './Filter';
import NoData from './NoData';
import Table from './Table';

const BalanceSheet = () => {
    return (
        <div className="card slide">
            <div className="card-body">
                <h5 className="table-heading" style={{marginBottom:"20px"}}>Balance Sheet</h5>

                <Filter />
                <NoData />
                <Table />
            </div>
        </div>
    );
}

export default BalanceSheet;