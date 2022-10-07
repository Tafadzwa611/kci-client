import React, {Fragment} from 'react';
import { FirstRow, SecondRow, ThirdRow, FourthRow } from './TableRows';

const Table = ({ clients, currencyIso }) => {
    return (
        <div className="table-container" style={{padding:"0", paddingTop:"1.5rem", border:"none"}}>
            <div className="table-responsive font-12" style={{maxHeight:"600px"}}>
                <table className="table" style={{width:"100%"}}>
                    <thead className="clients-report-table">
                        <tr className="journal-details fees__report_thead"> 
                            <th style={{textAlign:"right"}}>Total_Loans_Released</th>
                            <th style={{textAlign:"right"}}>Total_Principal_Released</th>
                            <th style={{textAlign:"right"}}>Current_Principal_At_Risk</th>
                            <th></th>
                            <th style={{textAlign:"right"}}>Principal</th>
                            <th style={{textAlign:"right"}}>Interest</th>
                            <th style={{textAlign:"right"}}>Fees</th>
                            <th style={{textAlign:"right"}}>Penalty</th>
                            <th style={{textAlign:"right"}}>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                    {clients.map(client => {
                        return (
                        <Fragment key={client.id}>
                            <FirstRow client={client}/>
                            <SecondRow client={client} currencyIso={currencyIso}/>
                            <ThirdRow client={client} currencyIso={currencyIso}/>
                            <FourthRow client={client} currencyIso={currencyIso}/>
                        </Fragment>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Table;