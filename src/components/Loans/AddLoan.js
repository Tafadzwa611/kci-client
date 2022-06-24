import React from 'react';

const AddLoan = () => {

    return (
        <div className="card text-light slide">
            <div className="card-body">
                <form>
                    <div className="row">
                        <label className="form-label"></label>
                        <label className="form-title">[ Add Loan ]</label>
                    </div>
                    <div className="info-tab" style={{marginTop:"1rem"}}>
                        <span>Loan details</span>
                    </div>
                    <div className="row">
                        <label className="form-label"><b>Loan Product</b></label>
                        <select className='custom-select-form'>
                            <option></option>
                            <option>Loan Product 1</option>
                            <option>Loan Product 2</option>
                        </select>
                    </div>
                    <div className="row">
                        <label className="form-label"><b>Client</b></label>
                        <select className='custom-select-form'>
                            <option>Tafadzwa Kuno</option>
                            <option>Tavonga Gudyanga</option>
                        </select>
                    </div>
                    <div className="row custom-background">
                        <label className="form-label"><b>Amount</b></label>
                        <input className='custom-select-form' placeholder="Enter Loan Amount" />
                    </div>
                    <div className="row custom-background">
                        <label className="form-label"><b>Loan Interest Rate</b></label>
                        <input className='custom-select-form' placeholder="Enter Loan Interest" />
                    </div>
                    <div className="row">
                        <label className="form-label"><b>Disbursement Method</b></label>
                        <select className='custom-select-form'>
                            <option>Ecocash</option>
                            <option>Cash</option>
                        </select>
                    </div>
                    <div className="row">
                        <label className="form-label"><b>Repayment Cycle</b></label>
                        <select className='custom-select-form'>
                            <option>Day</option>
                            <option>Week</option>
                        </select>
                    </div>
                    <div className="row custom-background">
                        <label className="form-label"><b>Loan Release Date</b></label>
                        <input className='custom-select-form' placeholder="Enter Loan Release Date" type="date" />
                    </div>
                    <div className="row custom-background">
                        <label className="form-label"><b>Number of Repayments</b></label>
                        <input className='custom-select-form' placeholder="Enter Number of Repayments"/>
                    </div>
                    <div className="row custom-background">
                        <label className="form-label"><b>First Repayment Date</b></label>
                        <input className='custom-select-form' placeholder="Enter First Repayment Date" type="date" />
                    </div>
                    <div className="row">
                        <label className="form-label"><b>Reason For Loan</b></label>
                        <select className='custom-select-form'>
                            <option>Consumer</option>
                            <option>Consumer - Agriculture</option>
                        </select>
                    </div>
                    <div className="row">
                        <label className="form-label"><b>Status</b></label>
                        <select className='custom-select-form'>
                            <option>Open</option>
                            <option>Processing</option>
                            <option>Rejected</option>
                        </select>
                    </div>
                    <div className="row">
                        <label className="form-label"><b>Automatically list loan for ssb submission</b></label>
                        <input type="checkbox" />
                    </div>
                    <div className="info-tab" style={{marginTop:"1rem"}}>
                        <span>Loan Fees</span>
                    </div>
                    <div className="row custom-background">
                        <label className="form-label">
                            <div className="fees-label">
                                <span><b>Transaction charges <small>(Optional)</small></b></span>
                                <span><small>(Optional)</small></span>
                            </div>
                            </label>
                        <input className='custom-select-form' placeholder="Enter Transaction charges" />
                    </div>
                    <div className="info-tab" style={{marginTop:"1rem"}}>
                        <span>Loan Files</span>
                    </div>
                    <div className="row">
                        <label className="form-label"><b>Loan Files</b></label>
                        <input type="file" />
                    </div>
                    <div className="info-tab" style={{marginTop:"1rem"}}>
                        <span> Advanced Settings : Click here to Show</span>
                    </div>

                    <div className="row">
                        <label className="form-label"><b>Guarantor <small>(Optional)</small></b></label>
                        <select className='custom-select-form'>
                            <option>Tanyaradza</option>
                            <option>Peter</option>
                            <option>James</option>
                        </select>
                    </div>
                    <div className="row custom-background">
                        <label className="form-label"><b>Loan Comments <small>(Optional)</small></b></label>
                        <textarea style={{width:"50%", height:"5rem"}} className='custom-select-form'></textarea>
                    </div>

                    <div className="form-submit-btn">
                        <label className="form-label"></label>
                        <button className="btn btn-info">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddLoan;