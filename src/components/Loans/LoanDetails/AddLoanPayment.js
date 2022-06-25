import React from 'react';

const AddLoanPayment = () => {

    return (
        <div className="card text-light slide">
            <div className="card-body">
                <form>
                    <div className="row">
                        <label className="form-label"></label>
                        <label className="form-title">[ Add Payment ]</label>
                    </div>
                    <div className="row custom-background">
                        <label className="form-label"><b>Amount Paid</b></label>
                        <input className='custom-select-form' placeholder="Enter Amount Paid"/>
                    </div>
                    <div className="row custom-background">
                        <label className="form-label"><b>Payment Date</b></label>
                        <input className='custom-select-form' placeholder="Enter Payment Date" type="date" />
                    </div>
                    <div className="row">
                        <label className="form-label"><b>Payment Method </b></label>
                        <select className='custom-select-form'>
                            <option>Ecocash</option>
                            <option>Cash</option>
                            <option>Swipe/Kwenga</option>
                            <option>Bank Transfer</option>
                            <option>OneMoney</option>
                            <option>TeleCash</option>
                            <option>Stop Order</option>
                            <option>Garnishee</option>
                        </select>
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

export default AddLoanPayment;