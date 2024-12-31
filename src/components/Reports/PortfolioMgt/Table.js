import React from "react";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const Table = ({report}) => {
    return (
        <div>
            <div style={{display:'flex', justifyContent:'flex-end', marginTop:'1.5rem'}}>
                <ReactHTMLTableToExcel
                    id='test-table-xls-button'
                    className='btn btn-default'
                    table='loan-distribution'
                    filename='Portfolio Management'
                    sheet='tablexls'
                    buttonText='Download as XLS'
                />
            </div>
            <div className='table-container font-12' style={{border:'none', padding:'0', marginTop:'1rem'}}>
                <div className='table-responsive' style={{maxHeight:'800px'}}>
                    <table className='table' id='loan-distribution'>
                        <tbody>
                            <tr className='journal-details fees__report_thead'>
                                <td><b>PORTFOLIO ACTIVITY</b></td>
                                <td><b>VALUE/NUMBER</b></td>
                            </tr>
                            <tr>
                                <td>NUMBER OF LOANS DISBURSED</td>
                                <td>{report.num_of_loans_disbursed}</td>
                            </tr>
                            <tr>
                                <td>VALUE OF LOANS DISBURSED</td>
                                <td>{report.val_of_loans_disbursed}</td>
                            </tr>
                            <tr>
                                <td>NUMBER OF CLIENTS TAKING FIRST LOAN</td>
                                <td>{report.num_of_clients_taking_first_loan}</td>
                            </tr>
                            <tr>
                                <td>NUMBER OF CLIENTS TAKING SECOND AND SUBSEQUENT LOANS</td>
                                <td>{report.num_of_clients_taking_second_and_subsequen_loans}</td>
                            </tr>
                            <tr>
                                <td>NUMBER OF ACTIVE CLIENTS AT START OF QUARTER</td>
                                <td>{report.num_active_clients_at_start}</td>
                            </tr>
                            <tr>
                                <td>NUMBER OF ACTIVE CLIENTS AT END OF QUARTER</td>
                                <td>{report.num_active_clients_at_end}</td>
                            </tr>
                            <tr>
                                <td>NUMBER OF OUTSTANDING LOANS</td>
                                <td>{report.num_of_outstanding_loans}</td>
                            </tr>
                            <tr>
                                <td>AVERAGE LOAN TERM IN MONTHS</td>
                                <td>{report.avg_loan_term_in_months}</td>
                            </tr>
                            <tr>
                                <td>TOTAL NUMBER OF ALL CLIENTS (ACTIVE + NON ACTIVE)</td>
                                <td>{report.total_num_of_clients}</td>
                            </tr>
                            <tr>
                                <td><b>OUTREACH</b></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>NUMBER OF BRANCHES</td>
                                <td>{report.num_of_branches}</td>
                            </tr>
                            <tr>
                                <td>URBAN</td>
                                <td>{report.num_of_urban_branches}</td>
                            </tr>
                            <tr>
                                <td>RURAL</td>
                                <td>{report.num_of_rural_branches}</td>
                            </tr>
                            <tr>
                                <td>NUMBER OF ACTIVE LOAN CLIENTS IN RURAL BRANCHES</td>
                                <td>{report.num_of_active_clients_in_rural_branches}</td>
                            </tr>
                            <tr>
                                <td>NUMBER OF BORROWING GROUPS</td>
                                <td>{report.num_of_borrowing_groups}</td>
                            </tr>
                            <tr>
                                <td>NUMBER OF ACTIVE LOAN CLIENTS RECEIVING LOANS AS MEMBERS OF A GROUP</td>
                                <td>{report.num_of_clients_receiving_loans_as_members_as_a_group}</td>
                            </tr>
                            <tr>
                                <td>NUMBER OF ACTIVE LOAN CLIENTS RECEIVING LOANS AS INDIVIDUALS</td>
                                <td>{report.num_of_individual_clients_receiving_loans}</td>
                            </tr>
                            <tr>
                                <td>NUMBER OF LOANS WITH A DISBURSED LOAN AMOUNT MORE THAN $5,000</td>
                                <td>{report.num_loans_with_loan_amount_more_than_5000}</td>
                            </tr>
                            <tr>
                                <td>% OF FEMALE BORROWERS  TO  TOTAL BORROWERS</td>
                                <td>{report.percentage_of_female_borrowers_to_total_borrowers}</td>
                            </tr>
                            <tr>
                                <td><b>PORTFOLIO QUALITY</b></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>NUMBER OF LOANS IN ARREARS (Principal plus interest)</td>
                                <td>{report.num_of_loans_in_arrears}</td>
                            </tr>
                            <tr>
                                <td>VALUE OF LOANS IN ARREARS (Greater than 1 day)</td>
                                <td>{report.val_of_loans_in_arrears}</td>
                            </tr>
                            <tr>
                                <td>NUMBER OF LOANS IN ARREARS (Greater than 30 days)</td>
                                <td>{report.num_of_loans_in_arrears_30_days}</td>
                            </tr>
                            <tr>
                                <td>VALUE OF OUTSTANDING LOANS IN ARREARS (Greater than 30 days)</td>
                                <td>{report.val_of_loans_in_arrears_30_days}</td>
                            </tr>
                            <tr>
                                <td>NUMBER OF LOANS IN ARREARS (Greater than 60 days)</td>
                                <td>{report.num_of_loans_in_arrears_60_days}</td>
                            </tr>
                            <tr>
                                <td>VALUE OF OUTSTANDING LOANS IN ARREARS (Greater than 60 days)</td>
                                <td>{report.val_of_loans_in_arrears_60_days}</td>
                            </tr>
                            <tr>
                                <td>NUMBER OF LOANS IN ARREARS (Greater than 90 days)</td>
                                <td>{report.num_of_loans_in_arrears_90_days}</td>
                            </tr>
                            <tr>
                                <td>VALUE OF OUTSTANDING LOANS IN ARREARS (Greater than 90 days)</td>
                                <td>{report.val_of_loans_in_arrears_90_days}</td>
                            </tr>
                            <tr>
                                <td>TOTAL LOAN REPAYMENTS FROM BORROWERS IN THE CURRENT QUARTER</td>
                                <td>{report.total_repayments_current_quarter}</td>
                            </tr>
                            <tr>
                                <td>SCHEDULED AMOUNTS DUE IN PERIOD PLUS ARREARS</td>
                                <td>{report.scheduled_amounts_due_in_period_plus_arrears}</td>
                            </tr>
                            <tr>
                                <td><b>WRITE-OFFS</b></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>NUMBER OF LOANS WRITTEN OFF DURING PERIOD</td>
                                <td>{report.num_of_loans_written_off_during_period}</td>
                            </tr>
                            <tr>
                                <td> VALUE OF LOANS WRITTEN OFF</td>
                                <td>{report.value_of_loans_written_off}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Table;