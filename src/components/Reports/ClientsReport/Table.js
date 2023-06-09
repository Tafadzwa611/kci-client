import React, {Fragment} from 'react';
import { FirstRow, SecondRow, ThirdRow, FourthRow } from './TableRows';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Pager from './Pager';

const Table = ({ clientsReportData, params, setClientsReportData, loggedInUser, intValues }) => {    

    const getFileName = () => {
        if (intValues.min_date != '' && intValues.max_date != '') {
            return `Clients report for ${loggedInUser.company_name} from ${intValues.min_date} to ${intValues.max_date}`
        }
        if (intValues.min_date == '' && intValues.max_date != '') {
            return `Clients report for ${loggedInUser.company_name} upto ${intValues.max_date}`
        }
        if (intValues.min_date != '' && intValues.max_date == '') {
            return `Clients report for ${loggedInUser.company_name} from ${intValues.min_date}`
        }
        return `Clients report for ${loggedInUser.company_name} all time.`
    }

    return (
        <>
            <TableHeader 
                clientsReportData={clientsReportData} 
                params={params} 
                setClientsReportData={setClientsReportData} 
            />
            <div className="table-container" style={{padding:"0", border:"none"}}>
                <div className="table-responsive font-12" style={{maxHeight:"600px"}}>
                    <table className="table" id='clients-report' style={{width:"100%"}}>
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
                            <tr>
                                <td className='text-bold text-left' colSpan={9}>Clients Report</td>
                            </tr>
                            <tr>
                                <td className='text-bold text-left' colSpan={9}>{getFileName()}</td>
                            </tr>
                            <tr>
                                <td className='text-bold text-left' colSpan={9}>Currency: {clientsReportData.currency}</td>
                            </tr>
                            <tr>
                                <td className='text-bold text-left' colSpan={9}>{`Extracted On: ${new Date()}`}</td>
                            </tr>
                            {clientsReportData.clients.map(client => {
                                return (
                                <Fragment key={client.id}>
                                    <FirstRow client={client}/>
                                    <SecondRow client={client}/>
                                    <ThirdRow client={client}/>
                                    <FourthRow client={client}/>
                                </Fragment>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

const TableHeader = ({clientsReportData, params, setClientsReportData }) => {
    return (
        <div className='table-header'>
            <div style={{display:'flex', columnGap:'10px', alignItems:'center'}}>
                <Pager
                    nextPageNumber={clientsReportData.next_page_num}
                    params={params}
                    loadMoreExpenses={() => console.log('loadMoreExpenses')}
                    loadingMore={false}
                    prevPageNumber={clientsReportData.prev_page_num}
                    setClientsReportData={setClientsReportData}
                />
                <div style={{marginTop:'6px'}}>Showing {clientsReportData.clients.length} of {clientsReportData.count} clients.</div>
            </div>
            <div style={{display:'flex', columnGap:'10px', alignItems:'center'}}>
            <div style={{marginTop:'6px'}}>Page {clientsReportData.number} of {clientsReportData.num_of_pages}</div>
                <div>
                    <ReactHTMLTableToExcel
                        id='test-table-xls-button'
                        className='btn btn-default'
                        table='clients-report'
                        filename='clients-report'
                        sheet='tablexls'
                        buttonText='Download as XLS'
                    />
                </div>
            </div>
        </div>
    )
}

export default Table;
