import React from 'react';

const AddLoanProduct = () => {
    return (
        <div className="card text-light slide">
            <div className="card-body">
                <form>
                    <div className="row">
                        <label className="form-label"></label>
                        <label className="form-title">[ Add Loan Product ]</label>
                    </div>
                    <div className="info-tab" style={{marginTop:"1rem"}}>
                        <span>Name and Description</span>
                    </div>
                    <div className="row custom-background">
                        <label className="form-label"><b>Name</b></label>
                        <input className='custom-select-form' placeholder="Enter Loan Product Loan" />
                    </div>
                    <div className="row custom-background">
                        <label className="form-label"><b>Description <small>(Optional)</small></b></label>
                        <textarea style={{width:"50%", height:"5rem"}} className='custom-select-form' placeholder="Enter ..."></textarea>
                    </div>
                    <div className="info-tab" style={{marginTop:"1rem"}}>
                        <span>Principal Settings</span>
                    </div>
                    <div className="row">
                        <label className="form-label"><b>Currency </b></label>
                        <select className='custom-select-form'>
                            <option></option>
                            <option>US Dollar</option>
                            <option>Rand</option>
                            <option>Zimbabwean Dollar</option>
                        </select>
                    </div>
                    <div className="row">
                        <div className="radio">
                            <label className="form-label"><b>Disbursement Method</b></label>
                        </div>
                        <div className="radio-container font-12">
                            <label><input type="checkbox"/> Cash </label>
                            <label><input type="checkbox"/> EcoCash </label>
                            <label><input type="checkbox"/> OneMoney </label>
                            <label><input type="checkbox"/> TeleCash </label>
                            <label><input type="checkbox"/> Zipit/Bank Transfer </label>
                            <label><input type="checkbox"/> Restructure </label>
                        </div>
                    </div>
                    <div className="row custom-background">
                        <label className="form-label"><b>Minimum Principal Amount</b></label>
                        <input className='custom-select-form' placeholder="Enter Minimum Principal Amount" />
                    </div>
                    <div className="row custom-background">
                        <label className="form-label"><b>Default Principal Amount</b></label>
                        <input className='custom-select-form' placeholder="Enter Default Principal Amount" />
                    </div>
                    <div className="row custom-background">
                        <label className="form-label"><b>Maximum Principal Amount</b></label>
                        <input className='custom-select-form' placeholder="Enter Maximum Principal Amount" />
                    </div>
                    <div className="info-tab" style={{marginTop:"1rem"}}>
                        <span>Interest Settings</span>
                    </div>
                    <div className="row">
                        <label className="form-label"><b>Interest Method </b></label>
                        <select className='custom-select-form'>
                            <option>Flat Rate</option>
                            <option>Reducing Balance - Equal Installments</option>
                            <option>Reducing Balance - Equal Principal</option>
                            <option>Interest Only</option>
                            <option>Compound Interest</option>
                        </select>
                    </div>
                    <div className="row">
                        <label className="form-label"><b>Loan Interest Period </b></label>
                        <select className='custom-select-form'>
                            <option>Per Day</option>
                            <option>Per Week</option>
                            <option selected>Per Month</option>
                            <option>Per Year</option>
                        </select>
                    </div>
                    <div className="row custom-background">
                        <label className="form-label"><b>Minimum Loan Interest</b></label>
                        <input className='custom-select-form' placeholder="Enter Minimum Loan Interest" />
                    </div>
                    <div className="row custom-background">
                        <label className="form-label"><b>Default Loan Interest</b></label>
                        <input className='custom-select-form' placeholder="Enter Default Loan Interest" />
                    </div>
                    <div className="row custom-background">
                        <label className="form-label"><b>Maximum Loan Interest</b></label>
                        <input className='custom-select-form' placeholder="Enter Maximum Loan Interest" />
                    </div>
                    <div className="info-tab" style={{marginTop:"1rem"}}>
                        <span>Tenor Settings</span>
                    </div>
                    <div className="row">
                        <label className="form-label"><b>Repayment Cycle</b></label>
                        <select className='custom-select-form'>
                            <option>Day</option>
                            <option>Weekly</option>
                            <option>Biweekly</option>
                            <option selected>Monthly</option>
                            <option>Bimonthly</option>
                            <option>Quartely</option>
                            <option>Every 4 Months</option>
                            <option>Semi-annually</option>
                            <option>Yearly</option>
                        </select>
                    </div>
                    <div className="row custom-background">
                        <label className="form-label"><b>Minimum Number of Repayments</b></label>
                        <input className='custom-select-form' placeholder="Enter Minimum Number of Repayments" />
                    </div>
                    <div className="row custom-background">
                        <label className="form-label"><b>Default Number of Repayments</b></label>
                        <input className='custom-select-form' placeholder="Enter Default Number of Repayments" />
                    </div>
                    <div className="row custom-background">
                        <label className="form-label"><b>Maximum Number of Repayments</b></label>
                        <input className='custom-select-form' placeholder="Enter Maximum Number of Repayments" />
                    </div>
                    <div className="info-tab" style={{marginTop:"1rem"}}>
                        <span>Decimal Places, Rounding Off and Repayment Order</span>
                    </div>
                    <div className="row">
                        <label className="form-label"><b>Decimal Places </b></label>
                        <select className='custom-select-form'>
                            <option>Round Off to Two Decimal Places</option>
                            <option>Round Off to One Decimal Place</option>
                            <option>Round Off to Integer</option>
                        </select>
                    </div>
                    <div className="row">
                        <label className="form-label"><b>Rounding Scheme </b></label>
                        <select className='custom-select-form'>
                            <option>Round Half Up</option>
                            <option>Round Up</option>
                            <option>Round Down</option>
                        </select>
                    </div>
                    <div className="row">
                        <label className="form-label"><b>Repayment Order </b></label>
                        <select className='custom-select-form' multiple style={{width:"100px"}}>
                            <option>Penalty</option>
                            <option>Fees</option>
                            <option>Interest</option>
                            <option>Principal</option>
                        </select>
                        <div className="repayment-order-btns">
                            <button>Up</button>
                            <button>Down</button>
                        </div>
                    </div>
                    <div className="info-tab" style={{marginTop:"1rem"}}>
                        <span>TopUp Settings</span>
                    </div>
                    <div className="row custom-background">
                        <label className="form-label"><b>TopUp Window Period <small>( Optional )</small></b></label>
                        <input className='custom-select-form' placeholder="Enter Number of Days" />
                    </div>
                    <div className="row custom-background">
                        <label className="form-label"><b>Number of TopUps Allowed <small>( Optional )</small></b></label>
                        <input className='custom-select-form' placeholder="Enter Number of TopUps Allowed" />
                    </div>
                    <div className="row custom-background">
                        <label className="form-label"><b>TopUp Limit As a % <small>( Optional )</small></b></label>
                        <input className='custom-select-form' placeholder="Enter TopUp Limit Percentage" />
                    </div>
                    <div className="info-tab" style={{marginTop:"1rem"}}>
                        <span>Allowed Branches</span>
                    </div>
                    <div className="row">
                        <div className="radio">
                            <label className="form-label"><b>Branches</b></label>
                        </div>
                        <div className="radio-container font-12">
                            <label><input type="checkbox"/> Main Branch </label>
                            <label><input type="checkbox"/> Masvingo </label>
                        </div>
                    </div>
                    <div className="info-tab" style={{marginTop:"1rem"}}>
                        <span>Action on Defaults</span>
                    </div>
                    <div className="row">
                        <div className="radio">
                            <label className="form-label"><b>Apply Penalty On</b></label>
                        </div>
                        <div className="radio-container font-12">
                            <label><input type="radio"/> Do Not Apply </label>
                            <label><input type="radio"/> Principal Only </label>
                            <label><input type="radio"/> Principal + Interest  </label>
                            <label><input type="radio"/> Principal + Interest + Fees + Penalty  </label>
                        </div>
                    </div>
                    <div className="row custom-background">
                        <label className="form-label"><b>Penalty Percentage</b></label>
                        <input className='custom-select-form' placeholder="Enter penalty percentage (If penalty percentage is 10%, do not put the percent sign)" />
                    </div>
                    <div className="row">
                        <label className="form-label"><b>Penalty </b></label>
                        <select className='custom-select-form'>
                            <option></option>
                            <option>Per Day</option>
                            <option>Per Week</option>
                            <option>Per Month</option>
                            <option>Per Year</option>
                        </select>
                    </div>
                    <div className="row">
                        <label className="form-label"><b>Calculate late repayment penalty using the defaulted installment amount only</b></label>
                        <input type="checkbox" />
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

export default AddLoanProduct;