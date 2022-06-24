import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import LoanPayments from './LoanPayments';
import Modal from '../../Modal';
import LoanComments from './LoanComments';
import LoanCollateral from './LoanCollateral';
import LoanPenalties from './LoanPenalties';
import LoanSchedule from './LoanSchedule';
import LoanTerms from './LoanTerms';

const LoanDetail = () => {

    const [openModal, setOpenmodal] = useState(false);
    const showOpenModal = () => setOpenmodal(!openModal);
    const [toggleState, setToggleState] = useState(1);
    const toggleTab = (index) => {setToggleState(index)};

    var loanpayments = [
        {collection_date:'12/12/21',  collected_by:'Tamuka Mutinhima', branch_collected:'Masvingo', method:'Ecocash', principal:'100', interest:'100', to_be_refunded:'0', total_amount_paid:'200', id:'1'},
        {collection_date:'12/12/21',  collected_by:'Tamuka Mutinhima', branch_collected:'Masvingo', method:'Ecocash', principal:'100', interest:'100', to_be_refunded:'0', total_amount_paid:'200', id:'2'},
        {collection_date:'12/12/21',  collected_by:'Tamuka Mutinhima', branch_collected:'Masvingo', method:'Ecocash', principal:'100', interest:'100', to_be_refunded:'0', total_amount_paid:'200', id:'3'},
        {collection_date:'12/12/21',  collected_by:'Tamuka Mutinhima', branch_collected:'Masvingo', method:'Ecocash', principal:'100', interest:'100', to_be_refunded:'0', total_amount_paid:'200', id:'4'},
        {collection_date:'12/12/21',  collected_by:'Tamuka Mutinhima', branch_collected:'Masvingo', method:'Ecocash', principal:'100', interest:'100', to_be_refunded:'0', total_amount_paid:'200', id:'5'},
        {collection_date:'12/12/21',  collected_by:'Tamuka Mutinhima', branch_collected:'Masvingo', method:'Ecocash', principal:'100', interest:'100', to_be_refunded:'0', total_amount_paid:'200', id:'6'},
    ];

    return (
        <div className="text-light">
            <div className="card">
                <div className="card-body">
                    <div className="loan-details-client-info-section">

                        <div className="loan-details-client-info">
                            <div></div>
                            <div>
                                <ul className="loan-details-client-info-list">
                                    <li><b>Client Number : </b> THEOC1000048</li>
                                    <li><b>Client Branch : </b> Main Branch</li>
                                    <li><b>Loan Number : </b> 10000000079</li>
                                    <li><b>Loan Branch : </b> Main Branch</li>
                                    <li><b>EC Number : </b> 0169149G</li>
                                    <li><b>Employer : </b> Ministry of Health</li>
                                    <li><b>Job Position : </b> Nurse</li>
                                </ul>
                            </div>
                            <div>
                                <ul className="loan-details-client-info-list">
                                    <li><b>Date Added : </b> 08/19/2020</li>
                                    <li><b>Work Addres : </b> Ngomahuru hosptal 9028 masvngo</li>
                                    <li><b>Date of Birth : </b> 03/15/1977</li>
                                    <li><b>Gender : </b> MALE</li>
                                    <li><b>Email : </b> None</li>
                                    <li><b>Mobile : </b> 0776101369</li>
                                </ul>
                            </div>
                        </div>

                        <div className="loans-details-btns">
                            <button className="btn btn-success">Edit Loan</button>
                            <button className="btn btn-danger" onClick={showOpenModal}>Delete Loan</button>
                        </div>
                        {openModal && <Modal closeModal={setOpenmodal}/>}

                    </div>

                    <div className='table-responsive font-12' style={{marginTop:"20px"}}>
                        <table className='table table-centered'>
                            <thead className="thead-light">
                                <tr>
                                    <th style={{textAlign:"start"}}>Loan #</th>
                                    <th style={{textAlign:"start"}}>Released</th>
                                    <th style={{textAlign:"start"}}>First_Repayment_Date</th>
                                    <th style={{textAlign:"start"}}>Maturity</th>
                                    <th style={{textAlign:"start"}}>Repayment</th>
                                    <th style={{textAlign:"start"}}>Principal</th>
                                    <th style={{textAlign:"start"}}>Interest_Rate</th>
                                    <th style={{textAlign:"start"}}>Interest</th>
                                    <th style={{textAlign:"start"}}>Penalty</th>
                                    <th style={{textAlign:"start"}}>Admin_Fees</th>
                                    <th style={{textAlign:"start"}}>Due</th>
                                    <th style={{textAlign:"start"}}>Paid</th>
                                    <th style={{textAlign:"start"}}>Balance</th>
                                    <th style={{textAlign:"start"}}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>10000000000001</td>
                                    <td>12/12/21</td>
                                    <td>12/01/22</td>
                                    <td>12/03/22</td>
                                    <td>Monthly</td>
                                    <td>10000</td>
                                    <td>30</td>
                                    <td>3000</td>
                                    <td>0</td>
                                    <td>300</td>
                                    <td>13000</td>
                                    <td>3000</td>
                                    <td>10000</td>
                                    <td><small className="badge badge-info">Open</small></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="card">
                <div className="card-body">

                    <div style={{marginTop:"20px", fontSize:"0.6875rem"}}>
                        <div className="bloc-tabs">
                            <button className={toggleState === 1 ? "tabs-loans active-tabs-loans" : "tabs-loans"} onClick={() => toggleTab(1)}> Repayments </button>
                            <button className={toggleState === 2 ? "tabs-loans active-tabs-loans" : "tabs-loans"} onClick={() => toggleTab(2)}> Loan Terms </button>
                            <button className={toggleState === 3 ? "tabs-loans active-tabs-loans" : "tabs-loans"} onClick={() => toggleTab(3)}> Loan Schedule </button>
                            <button className={toggleState === 4 ? "tabs-loans active-tabs-loans" : "tabs-loans"} onClick={() => toggleTab(4)}> Penalties </button>
                            <button className={toggleState === 5 ? "tabs-loans active-tabs-loans" : "tabs-loans"} onClick={() => toggleTab(5)}> Loan Collateral </button>
                            <button className={toggleState === 6 ? "tabs-loans active-tabs-loans" : "tabs-loans"} onClick={() => toggleTab(6)}> Loan Files </button>
                            <button className={toggleState === 7 ? "tabs-loans active-tabs-loans" : "tabs-loans"} onClick={() => toggleTab(7)}> Loan Comments </button>
                        </div>
                        <div className="content-tabs">
                            <div className={toggleState === 1 ? "content  active-content" : "content"}>

                                <div className="tab-1-download-btn">
                                    <button className="btn btn-success"><NavLink className="loan_details_tab_btns" to="/addloanpayment">Add Payment</NavLink></button>
                                    <button class="btn btn-export">
                                        <i class="uil uil-download-alt"></i> 
                                        <span>Download Excel</span>
                                    </button>
                                </div>

                                <div className='table-responsive' style={{marginTop:"20px"}}>
                                    <table className='table table-centered table-hover'>
                                        <thead className="thead-light">
                                            <tr>
                                                <th>Collection_Date</th>
                                                <th>Collected_By</th>
                                                <th>Branch_Collected</th>
                                                <th>Method</th>
                                                <th>Principal</th>
                                                <th>Interest</th>
                                                <th>To_Be_Refunded</th>
                                                <th>Total_Amount_Paid</th>
                                                <th>Action</th>
                                                <th>Receipt</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {loanpayments.map(payment => (
                                                <LoanPayments 
                                                    key={payment.id} 
                                                    collection_date={payment.collection_date}
                                                    collected_by={payment.collected_by}
                                                    branch_collected={payment.branch_collected} 
                                                    method={payment.method}
                                                    principal={payment.principal}
                                                    interest={payment.interest} 
                                                    to_be_refunded={payment.to_be_refunded}
                                                    total_amount_paid={payment.total_amount_paid}
                                                />
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className={toggleState === 2 ? "content  active-content" : "content"}>
                                <LoanTerms />
                            </div>
                            <div className={toggleState === 3 ? "content  active-content" : "content"}>
                                <LoanSchedule />
                            </div>
                            <div className={toggleState === 4 ? "content  active-content" : "content"}>
                                <LoanPenalties />
                            </div>
                            <div className={toggleState === 5 ? "content  active-content" : "content"}>
                                <LoanCollateral />
                            </div>
                            <div className={toggleState === 6 ? "content  active-content" : "content"}>
                                
                            </div>
                            <div className={toggleState === 7 ? "content  active-content" : "content"}>
                                <LoanComments />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default LoanDetail;