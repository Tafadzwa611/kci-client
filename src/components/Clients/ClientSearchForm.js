import React, { Component } from 'react';

class ClientSearchForm extends Component {

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

        const {loading} = this.state;

        return (
            <div className="card-body">
                <form>
                    <div className="row-containers">
                        <div className="row row-payments">
                            <div className="row-payments-container">
                                <label className="form-label row-label">Min Reg Date</label>
                                <div className="input-group" style={{margin:"10px 0"}}>
                                    <i className="uil uil-calendar-alt"></i>
                                    <input className="custom-select-form row-form input-background" type="date" />
                                </div>
                            </div>
                            <div className="row-payments-container">
                                <label className="form-label row-label">Max Reg Date</label>
                                <div className="input-group" style={{margin:"10px 0"}}>
                                    <i className="uil uil-calendar-alt"></i>
                                    <input className="custom-select-form row-form input-background" type="date" />
                                </div>
                            </div>
                            <div className="row-payments-container">
                                <label className="form-label row-label">Min Date Of Birth</label>
                                <div className="input-group" style={{margin:"10px 0"}}>
                                    <i className="uil uil-calendar-alt"></i>
                                    <input className="custom-select-form row-form input-background" type="date" />
                                </div>
                            </div>
                            <div className="row-payments-container">
                                <label className="form-label row-label">Max Date Of Birth</label>
                                <div className="input-group" style={{margin:"10px 0"}}>
                                    <i className="uil uil-calendar-alt"></i>
                                    <input className="custom-select-form row-form input-background" type="date" />
                                </div>
                            </div>
                        </div>
                        <div className="row row-payments" style={{marginTop:"1rem"}}>
                            <div className="row-payments-container">
                                <select className='custom-select-form row-form'>
                                    <option style={{display:"none"}}>Select Branch</option>
                                    <option>Branch 1</option>
                                    <option>Branch 2</option>
                                </select>
                            </div>
                            <div className="row-payments-container">
                                <div className="input-group" style={{margin:"0"}}>
                                    <input className="custom-select-form row-form input-background" placeholder="Search Client ..." />
                                </div>
                            </div>
                            <div className="row-payments-container">
                                <select className='custom-select-form row-form'>
                                    <option style={{display:"none"}}>Select Client Type</option>
                                    <option>Individual</option>
                                    <option>Company</option>
                                </select>
                            </div>
                            <div className="row-payments-container">
                                <select className='custom-select-form row-form'>
                                    <option style={{display:"none"}}>Select Gender</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                </select>
                            </div>
                            <button className="btn btn-info btn-info-search" onClick={this.fetchData} style={{margin:"0"}} disabled={loading}>{ loading ? 'Searching' : 'Search'}</button>
                        </div>
                    </div>

                    <div className="filter-container">
                        <h5 className="table-heading">View Clients</h5>
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
            );
        }
    }

export default ClientSearchForm;