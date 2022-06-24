import React from 'react';

const Table = () => {

    return (

        <div className="table-container font-12">
            <div className="table-responsive" style={{maxHeight:"800px"}}>
                <table className="table">
                    <thead>
                        <tr className="bg-gray">
                            <th>Transaction ID</th>
                            <th>Account Debited</th>
                            <th>Account Credited</th>
                            <th>Amount Debited</th>
                            <th>Amount Credited</th>
                            <th>Date Created</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <a href="/#/journaldetails" className="link">2022.4.8.16.51.18203</a>
                            </td>
                            <td>Cash Boz ZWL <em><small>(Main Branch)</small></em></td>
                            <td>Admin Fee <em><small>(Main Branch)</small></em></td>
                            <td>ZWL 100.00</td>
                            <td>ZWL 100.00</td>
                            <td>08 April 2022</td>
                        </tr>
                        <tr>
                            <td>
                                <a href="/#/journaldetails" className="link">2022.4.8.16.51.57f8b</a>
                            </td>
                            <td>Interest Receivable <em><small>(Main Branch)</small></em></td>
                            <td>Interest Revenue <em><small>(Main Branch)</small></em></td>
                            <td>ZWL 500.00</td>
                            <td>ZWL 500.00</td>
                            <td>08 April 2022</td>
                        </tr>
                        <tr>
                            <td>
                                <a href="/#/journaldetails" className="link">2022.4.8.16.51.eb7aa</a>
                            </td>
                            <td>Loans To Clients <em><small>(Main Branch)</small></em></td>
                            <td>Cash Boz ZWL <em><small>(Main Branch)</small></em></td>
                            <td>ZWL 1000.00</td>
                            <td>ZWL 1000.00</td>
                            <td>08 April 2022</td>
                        </tr>
                        <tr>
                            <td>
                                <a href="/#/journaldetails" className="link">2022.4.8.16.50.372d8</a>
                            </td>
                            <td>Cash Boz ZWL <em><small>(Main Branch)</small></em></td>
                            <td>Interest Receivable <em><small>(Main Branch)</small></em></td>
                            <td>ZWL 100.00</td>
                            <td>ZWL 100.00</td>
                            <td>08 April 2022</td>
                        </tr>
                        <tr>
                            <td>
                                <a href="/#/journaldetails" className="link">2022.4.1.22.2.c416f</a>
                            </td>
                            <td>Cash Boz ZWL <em><small>(Main Branch)</small></em></td>
                            <td>Admin Fee <em><small>(Main Branch)</small></em></td>
                            <td>ZWL 150.00</td>
                            <td>ZWL 150.00</td>
                            <td>01 April 2022</td>
                        </tr>
                        <tr>
                            <td>
                                <a href="/#/journaldetails" className="link">2022.4.1.22.2.5e03e</a>
                            </td>
                            <td>Interest Receivable <em><small>(Main Branch)</small></em></td>
                            <td>Interest Revenue <em><small>(Main Branch)</small></em></td>
                            <td>ZWL 500.00</td>
                            <td>ZWL 500.00</td>
                            <td>01 April 2022</td>
                        </tr>
                        <tr>
                            <td>
                                <a href="/#/journaldetails" className="link">2022.4.1.22.2.50190</a>
                            </td>
                            <td>Loans To Clients <em><small>(Main Branch)</small></em></td>
                            <td>Cash Boz ZWL <em><small>(Main Branch)</small></em></td>
                            <td>ZWL 1000.00</td>
                            <td>ZWL 1000.00</td>
                            <td>01 April 2022</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Table;