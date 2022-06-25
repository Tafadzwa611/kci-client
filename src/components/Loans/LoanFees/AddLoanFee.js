import React from 'react';

const AddLoanFee = () => {
    return (
        <div className="card text-light slide">
            <div className="card-body">

                <form>
                    <div className="row">
                        <label className="form-label"></label>
                        <label className="form-title">[ Add Loan Fee ]</label>
                    </div>
                    <div className="row custom-background">
                        <label className="form-label"><b>Name</b></label>
                        <input className='custom-select-form' placeholder="Loan Fee Name"/>
                    </div>
                    <div className="row custom-background">
                        <label className="form-label"><b>Date</b></label>
                        <input className='custom-select-form' type="date"/>
                    </div>
                    <div className="row">
                        <label className="form-label"><b>Currency</b></label>
                        <select className='custom-select-form'>
                            <option></option>
                            <option>Currency 1</option>
                            <option>Currency 2</option>
                        </select>
                    </div>
                    <div className="row">
                        <div className="radio">
                            <label className="form-label"><b>Location</b></label>
                        </div>
                        <div className="radio-container font-12">
                            <label><input type="radio"/> Fixed Amount </label>
                            <label><input type="radio"/> Percent Based </label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="radio">
                            <label className="form-label"><b>Calculate fee as % of</b></label>
                        </div>
                        <div className="radio-container font-12">
                            <label><input type="radio"/> Total Loan Due Principal Amount </label>
                            <label><input type="radio"/> Total Loan Due Interest Amount </label>
                            <label><input type="radio"/> Total Loan Due Principal and Interest Amount </label>
                        </div>
                    </div>
                    <div className="row">
                        <label className="form-label"><b>Is Mandatory</b></label>
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

export default AddLoanFee;