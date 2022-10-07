import React from 'react';
import Row from './Row';

const Table = ({report, currencyIso}) => {

    return (
        <div className="table-container" style={{padding:"0", paddingTop:"1.5rem", border:"none"}}>
            <div className="table-responsive font-12" style={{maxHeight:"600px"}}>
                <table className="table table-hover" style={{width:"100%"}}>
                    <thead className="clients-report-table">
                        <tr className="journal-details fees__report_thead">
                            <th className="text-left">#</th>
                            <th className="text-left">Client</th>
                            <th className="text-right">Branch Client</th>
                            <th className="text-right">Total Principal Borrowed</th>
                            <th className="text-right">Current Principal At Risk</th>
                        </tr>
                    </thead>
                    <tbody> 
                        {report.map((client, idx) => <Row key={client.id} idx={idx} client={client} currencyIso={currencyIso}/>)}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Table;