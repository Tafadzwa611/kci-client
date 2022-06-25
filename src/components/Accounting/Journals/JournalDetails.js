import React from 'react';

const JournalDetails = () => {

    return (
        <div className="card text-light">
            <div className="card-body font-12">

                <h5 className="table-heading" style={{marginBottom:"20px"}}>Journal Details</h5>

                <div className="row">
                    <div className="col-6">
                        <ul>
                            <li><b>Debit</b></li>
                            <li>Account Debited: Cash Boz ZWL</li>
                            <li>Branch Debited: Main Branch</li>
                            <li>Amount Debited: ZWL 100.00</li>
                        </ul>
                    </div>
                    <div className="col-6">
                        <ul>
                            <li><b>Credit</b></li>
                            <li>Account Credited: Admin Fee</li>
                            <li>Branch Credited: Main Branch</li>
                            <li>Amount Credited: ZWL 100.00</li>
                        </ul>
                    </div>
                </div>

                <div className="row">
                    <div className="col-6">
                        <ul>
                            <li><b>Additional Details</b></li>
                            <li>Date: Fri Apr 08 2022, 16:51:58 GMT+0200 (Central Africa Time)</li>
                            <li>Created By: Tadiwa Happy</li>
                            <li>Narrative: Admin Fee Received L10000000003</li>
                        </ul>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <button><a href="/#/journals" className="btn btn-default" style={{borderRadius:"0"}}>Go To Journals</a></button>
                    </div>
                </div>

            </div>
        </div>

    )
}

export default JournalDetails;