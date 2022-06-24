import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Modal from '../Modal';
import ViewClientLoans from './ViewClientLoans';

const Tabs = (props) => {

    const [toggleState, setToggleState] = useState(1);
    const toggleTab = (index) => {setToggleState(index)};
    const [openModal, setOpenmodal] = useState(false);
    const showOpenModal = () => setOpenmodal(!openModal);

    return (
        <div className="container">
            <div className="bloc-tabs">
                <button className={toggleState === 1 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(1)}> Details </button>
                <button className={toggleState === 2 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(2)}> Tafadzwa's Loan </button>
                <button className={toggleState === 3 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(3)}> Tafadzwa's Documents </button>
                <button className={toggleState === 4 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(4)}> Tafadzwa's Statement </button>
            </div>

            <div className="content-tabs">
                <div className={toggleState === 1 ? "content  active-content" : "content"}>
                    <div className="details-container">

                        <div className="client-name">
                            <p>Tafadzwa Kuno</p>
                            <span className="client-work-details">Ministry of Education - Teacher</span>
                        </div>

                        <div className="client-details-buttons">
                            <div className="client-details-buttons-left">   
                                <button className="btn btn-default"><NavLink className="alink-tag" to="/addloan">Add Loan</NavLink></button>
                                <button className="btn btn-default"><NavLink className="alink-tag" to="/transferclient">Transfer Client</NavLink></button>
                            </div>
                            <div className="client-details-buttons-right">   
                                <button className="btn btn-success">Edit Tafadzwa</button>
                                <button className="btn btn-danger" onClick={showOpenModal}>Delete Tafadzwa</button>
                            </div>
                            {openModal && <Modal closeModal={setOpenmodal}/>}
                        </div>

                        <div className="info-tab">
                            <span>Personal Details</span>
                        </div>

                        <div>
                            <table className="client-details-table">
                                <tbody>
                                    <tr>
                                        <td><b>Account Number</b></td>
                                        <td>THEOC1000048</td>
                                    </tr>
                                    <tr>
                                        <td><b>Branch</b></td>
                                        <td>Main Branch</td>
                                    </tr>
                                    <tr>
                                        <td><b>EC Number</b></td>
                                        <td style={{paddingRight: "400px"}}>0169149G</td>
                                    </tr>
                                    <tr>
                                        <td><b>ID Number</b></td>
                                        <td>27144291N83</td>
                                    </tr>
                                    <tr>
                                        <td><b>Phone Number</b></td>
                                        <td>0776101369</td>
                                    </tr>
                                    <tr>
                                        <td><b>Ecocash Number</b></td>
                                        <td>0776101369</td>
                                    </tr>
                                    <tr>
                                        <td><b>Bank Name</b></td>
                                        <td>POSB</td>
                                    </tr>
                                    <tr>
                                        <td><b>Bank Branch</b></td>
                                        <td>None</td>
                                    </tr>
                                    <tr>
                                        <td><b>Bank Account Number</b></td>
                                        <td>500002810082</td>
                                    </tr>
                                    <tr>
                                        <td><b>Email</b></td>
                                        <td>None</td>
                                    </tr>
                                    <tr>
                                        <td><b>Gender</b></td>
                                        <td>MALE</td>
                                    </tr>
                                    <tr>
                                        <td><b>Date of Birth</b></td>
                                        <td>03/15/1977</td>
                                    </tr>
                                    <tr>
                                        <td><b>Client Registration Date</b></td>
                                        <td>08/19/2020</td>
                                    </tr>
                                    <tr>
                                        <td><b>Employer</b></td>
                                        <td>Ministry of Health</td>
                                    </tr>
                                    <tr>
                                        <td><b>Job Position</b></td>
                                        <td>Nurse</td>
                                    </tr>
                                    <tr>
                                        <td><b>Home Address</b></td>
                                        <td>Ngomahuru hosptal 9028 masvngo</td>
                                    </tr>
                                    <tr>
                                        <td><b>Work Address</b></td>
                                        <td>Ngomahuru hosptal 9028 masvngo</td>
                                    </tr>
                                    <tr>
                                        <td><b>Next of Kin One</b></td>
                                        <td>None</td>
                                    </tr>
                                    <tr>
                                        <td><b>Next of Kin Two</b></td>
                                        <td>None</td>
                                    </tr>
                                    <tr>
                                        <td><b>Next of Kin One Phone Number</b></td>
                                        <td>None</td>
                                    </tr>
                                    <tr>
                                        <td><b>Next of Kin Two Phone Number</b></td>
                                        <td>None</td>
                                    </tr>
                                    <tr>
                                        <td><b>Next of Kin One Address</b></td>
                                        <td>None <em>(None)</em></td>
                                    </tr>
                                    <tr>
                                        <td><b>Next of Kin Two Address</b></td>
                                        <td>None <em>(None)</em></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="info-tab">
                            <span>Other Details</span>
                        </div>

                        <div className="client-details-footer">
                            <span>
                                <i>Client added on Sept. 29, 2021 by Blessing Mutsetsa</i>
                            </span>
                            <span>
                                <i>Client last updated on March 23, 2021 by Tamuka Mutinhima</i>
                            </span>
                        </div>

                    </div>
                </div>

                <div className={toggleState === 2 ? "content  active-content" : "content"}>

                    <div className="info-tab info-flex" style={{marginTop:"1rem"}}>
                        <span>All Loans</span>
                        <div>
                            <button className="btn btn-export on_info"><i class="uil uil-download-alt"></i> <span>Download Excel</span></button>
                        </div>
                    </div>

                    <div>
                        <ViewClientLoans />
                    </div>

                </div>

                <div className={toggleState === 3 ? "content  active-content" : "content"}>

                </div>

                <div className={toggleState === 4 ? "content  active-content" : "content"}>

                    <div className="info-tab info-flex" style={{marginTop:"1rem"}}>
                        <span>Statement</span>
                        <div>
                            <button className="btn btn-export on_info"><i class="uil uil-download-alt"></i> <span>Download Excel</span></button>
                        </div>
                    </div>

                    <div className="table-responsive font-12" style={{marginTop:"1rem"}}>
                        <table className="table table-centered">
                            <thead className="thead-light">
                                <tr>
                                    <th>Date_Posted</th>
                                    <th>Reference</th>
                                    <th>Loan_Description</th>
                                    <th>Repayments</th>
                                    <th>Disbursements</th>
                                    <th>Principal Due</th>
                                    <th>Interest Due</th>
                                    <th>Penalty Due</th>
                                    <th>Fees Due</th>
                                    <th>Balance ZWL</th>
                                </tr>
                            </thead>
                            <tbody>
                            
                                <tr>
                                    <td>Nov. 1, 2021, 1:32 p.m.</td>
                                    <td>10000001254</td>
                                    <td>Loan disbursed via Ecocash <small><em>(ZWL 352.95 admin fee received)</em></small></td>
                                    <td></td>
                                    <td>2353.00</td>
                                    <td>2353.00</td>
                                    <td>942.00</td>
                                    <td>0</td>
                                    <td>0.00</td>
                                    <td>3295.00</td>
                                </tr>
                            
                                <tr>
                                    <td>Dec. 17, 2021, 10:31 a.m.</td>
                                    <td>Penalty on 10000001254</td>
                                    <td>Late Repayment </td>
                                    <td></td>
                                    <td></td>
                                    <td>2353.00</td>
                                    <td>942.00</td>
                                    <td>1977.00</td>
                                    <td>0.00</td>
                                    <td>5272.00</td>
                                </tr>
                            
                                <tr>
                                    <td>Dec. 27, 2021, 5:11 p.m.</td>
                                    <td>Payment on 10000001254</td>
                                    <td>Repayment via Stop Order </td>
                                    <td>5272.00</td>
                                    <td></td>
                                    <td>0.00</td>
                                    <td>0.00</td>
                                    <td>0.00</td>
                                    <td>0.00</td>
                                    <td>0.00</td>
                                </tr>
                            
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Tabs;

