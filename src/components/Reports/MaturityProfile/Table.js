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
                                <td></td>
                                <td>CASH INFLOWS</td>
                            </tr>
                            <tr>
                                <td>
                                    <b>
                                        i) 0-7 days {report.dates.DAY_0}-{report.dates.DAY_7}
                                    </b>
                                </td>
                                <td>{report.amounts.inflow_0_7}</td>
                            </tr>
                            <tr>
                                <td>
                                    <b>
                                        ii) 8 - 14 days {report.dates.DAY_8}-{report.dates.DAY_14}
                                    </b>
                                </td>
                                <td>{report.amounts.inflow_8_14}</td>
                            </tr>
                            <tr>
                                <td>
                                    <b>
                                        iii) 15 -30 days {report.dates.DAY_15}-{report.dates.DAY_30}
                                    </b>
                                </td>
                                <td>{report.amounts.inflow_15_30}</td>
                            </tr>
                            <tr>
                                <td>
                                    <b>
                                        iv) 31-60 days {report.dates.DAY_31}-{report.dates.DAY_60}
                                    </b>
                                </td>
                                <td>{report.amounts.inflow_31_60}</td>
                            </tr>
                            <tr>
                                <td>
                                    <b>
                                        v) 61-90 days {report.dates.DAY_61}-{report.dates.DAY_90}
                                    </b>
                                </td>
                                <td>{report.amounts.inflow_61_90}</td>
                            </tr>
                            <tr>
                                <td>
                                    <b>
                                        vi) 91-120 days {report.dates.DAY_91}-{report.dates.DAY_120}
                                    </b>
                                </td>
                                <td>{report.amounts.inflow_91_120}</td>
                            </tr>
                            <tr>
                                <td>
                                    <b>
                                        vii) 121-180 days {report.dates.DAY_121}-{report.dates.DAY_180}
                                    </b>
                                </td>
                                <td>{report.amounts.inflow_121_180}</td>
                            </tr>
                            <tr>
                                <td>
                                    <b>
                                        viii) 181-360 days {report.dates.DAY_181}-{report.dates.DAY_360}
                                    </b>
                                </td>
                                <td>{report.amounts.inflow_181_360}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Table;