import React from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const Table = ({report}) => {
    return (
        <div>
            <div style={{display:'flex', justifyContent:'flex-end', marginTop:'1.5rem'}}>
                <ReactHTMLTableToExcel
                    id='test-table-xls-button'
                    className='btn btn-default'
                    table='loan-distribution'
                    filename='Loan Distribution By Sector'
                    sheet='tablexls'
                    buttonText='Download as XLS'
                />
            </div>
            <div className='table-container font-12' style={{border:'none', padding:'0', marginTop:'1rem'}}>
                <div className='table-responsive' style={{maxHeight:'800px'}}>
                    <table className='table' id='loan-distribution'>
                        <tbody>
                            <tr className='journal-details fees__report_thead'>
                                <td>SECTOR</td>
                                <td>NUMBER OF CLIENTS</td>
                                <td>NUMBER OF LOANS</td>
                                <td>BALANCE</td>
                                <td>TOTAL EXPECTED</td>
                            </tr>
                            {report.sectors.map((sector, index) => (
                                <tr key={index}>
                                    <td>{sector.reason_for_borrowing}</td>
                                    <td>{sector.num_of_clients}</td>
                                    <td>{sector.num_of_loans}</td>
                                    <td>{sector.principal_and_interest_balance}</td>
                                    <td>{sector.principal_and_interest_expected}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Table;