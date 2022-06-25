import React, { Component } from 'react';

class Filter extends Component {

    state = {
        loading: false
    }

    fetchData = () => {
        this.setState({loading: true});

        setTimeout(() => {
            this.setState({loading: false});
        }, 2000)
    }

    render() {

        const loading = this.state;

        return (


            <div className="card-body loans-filter">
                <form>
                    <div className="row-containers">
                        <div className="row row-payments">
                            <div className="row-payments-container">
                                <label className="form-label row-label">Min Disbursement Date</label>
                                <div className="input-group" style={{margin:"10px 0"}}>
                                    <i className="uil uil-calendar-alt"></i>
                                    <input className="custom-select-form row-form input-background" type="date" />
                                </div>
                            </div>
                            <div className="row-payments-container">
                                <label className="form-label row-label">Max Disbursement Date</label>
                                <div className="input-group" style={{margin:"10px 0"}}>
                                    <i className="uil uil-calendar-alt"></i>
                                    <input className="custom-select-form row-form input-background" type="date" />
                                </div>
                            </div>
                            <div className="row-payments-container">
                                <label className="form-label row-label">Min Principal Outstanding</label>
                                <div className="input-group" style={{margin:"10px 0"}}>
                                    <input className="custom-select-form row-form input-background" placeholder="Min Principal Outstanding" />
                                </div>
                            </div>
                            <div className="row-payments-container">
                                <label className="form-label row-label">Max Principal Outstanding</label>
                                <div className="input-group" style={{margin:"10px 0"}}>
                                    <input className="custom-select-form row-form input-background" placeholder="Max Principal Outstanding" />
                                </div>
                            </div>
                            <div className="row-payments-container">
                                <label className="form-label row-label">Min Amount Paid</label>
                                <div className="input-group" style={{margin:"10px 0"}}>
                                    <input className="custom-select-form row-form input-background" placeholder="Min Amount Paid" />
                                </div>
                            </div>
                            <div className="row-payments-container">
                                <label className="form-label row-label">Max Amount Paid</label>
                                <div className="input-group" style={{margin:"10px 0"}}>
                                    <input className="custom-select-form row-form input-background" placeholder="Max Amount Paid" />
                                </div>
                            </div>
                        </div>
                        <div className="row row-payments row-loans" style={{marginTop:"1rem"}}>
                            <div className="row-payments-container">
                                <select className='custom-select-form row-form'>
                                    <option style={{display:"none"}}>Select Branch</option>
                                    <option>Branch 1</option>
                                    <option>Branch 2</option>
                                </select>
                            </div>
                            <div className="row-payments-container">
                                <select className='custom-select-form row-form'>
                                    <option style={{display:"none"}}>Select Status</option>
                                    <option>Select all</option>
                                    <option>Processing</option>
                                    <option>Open</option>
                                    <option>Defaulted</option>
                                    <option>Arrears</option>
                                    <option>Fully Paid</option>
                                    <option>Over Paid</option>
                                    <option>Rejected</option>
                                    <option>Written-Off</option>
                                    <option>Restructured</option>
                                    <option>Early Settlement</option>
                                </select>
                            </div>
                            <div className="row-payments-container">
                                <select className='custom-select-form row-form'>
                                    <option style={{display:"none"}}>Select Currency</option>
                                    <option>ZWL</option>
                                    <option>USD</option>
                                </select>
                            </div>
                            <button className="btn btn-info btn-info-search" onClick={this.fetchData} style={{margin:"0"}} disabled={loading}>{ loading ? 'Searching' : 'Search'}</button>
                        </div>
                    </div>

                    <div className="filter-container">
                        <h5 className="table-heading">View Loans</h5>
                        <div className="filter-container-float-right">
                            <div className="show">
                                <span>Showing</span>
                                <select className="custom-select">
                                    <option>10</option>
                                    <option>20</option>
                                    <option>30</option>
                                    <option>50</option>
                                    <option>100</option>
                                </select>
                            </div>
                            <button className="btn btn-export"><i class="uil uil-download-alt"></i> <span>Download Excel</span></button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default Filter;