import React, {useState, useEffect} from 'react';
import { makeRequest } from '../../utils/utils';
import LoansReleased from './LoansReleased/LoansReleased';
import LoanCollections from './LoanCollections/LoanCollections';
import AllLoans from './AllLoans/AllLoans';
import AllClients from './AllClients/AllClients';
import Status from './Status/Status';
import ActiveClients from './ActiveClients/ActiveClients';

export default function Dashboard() {

    const [div1, setDiv1] = useState(false);
    const showDiv1 = () => setDiv1(!div1)
    const [div2, setDiv2] = useState(false);
    const showDiv2 = () => setDiv2(!div2)
    const [div3, setDiv3] = useState(false);
    const showDiv3 = () => setDiv3(!div3)
    const [div4, setDiv4] = useState(false);
    const showDiv4 = () => setDiv4(!div4)

    const [branches, setBranches] = useState(null);
    const [currencies, setCurrencies] = useState(null);

    useEffect(() => {
        document.title = 'Dashboard';
    })

    useEffect(() => {
        getBranchCurrencyData();
    }, []);

    const getBranchCurrencyData = async () => {
        await fetchBranches();
        await fetchCurrencies();
    }

    async function fetchBranches() {
        try {
            const response = await makeRequest.get('/usersapi/get-branches/', {timeout: 8000});
            if (response.ok) {
                const data = await response.json();
                return setBranches([...data.results.map(result => ({...result, label: result.name, value:result.id}))]);
            }else {
                const error = await response.json();
                console.log(error);
            }
        }catch(error) {
            console.log(error);
        }
    }

    async function fetchCurrencies() {
        try {
            const response = await makeRequest.get('/usersapi/list_currencies/', {timeout: 8000});
            if (response.ok) {
                const data = await response.json();
                return setCurrencies([...data.map(result => ({...result, label: result.shortname, value:result.id}))]);
            }else {
                const error = await response.json();
                console.log(error);
            }
        }catch(error) {
            console.log(error);
        }
    }

    if (branches === null || currencies === null) {
        return (
            <div>
                Loading...
            </div>
        )
    }
  
  return (
    <div className="font-13">
      <div style={{padding:"24px", paddingBottom:"0"}}>
          <h3>Dashboard</h3>
      </div>

      <div className="card">
          <div className="card-body">

              <div className="book-value-section">

                  <div className="book-value-select-section">
                      <div className="fields-container-select select_container_width">
                          <select className="custom-select-form select_width" placeholder="Select Currency">
                              <option style={{display:"none"}}>Select Currency </option>
                              <option>USD</option>
                              <option>ZWL</option>
                          </select>
                      </div>
                      <div className="fields-container-select select_container_width">
                          <select className="custom-select-form select_width" placeholder="Select Branch">
                              <option style={{display:"none"}}>Select Branch </option>
                              <option>Main Branch</option>
                              <option>Marondera</option>
                          </select>
                      </div>
                  </div>

                  <div className="book-value-update-section">
                      <div className="book-value-info-box">
                          <p className="dashboard-section-title">Loan Book Value</p>
                          <p className="dashboard-section-amount-or-number">ZWL 1 909 670.90</p>
                      </div>
                      <div className="book-value-info-box">
                          <p className="dashboard-section-sub-title">Daily Change</p>
                          <p className="dashboard-section-amount-or-number upward-change"><span>0.8%</span> <i className="uil uil-arrow-growth"></i></p>
                      </div>
                      <div className="book-value-info-box">
                          <p className="dashboard-section-sub-title">Weekly Change</p>
                          <p className="dashboard-section-amount-or-number downward-change"><span>0.8%</span> <i className="uil uil-chart-down"></i></p>
                      </div>
                      <div className="book-value-info-box">
                          <p className="dashboard-section-sub-title">Monthly Change</p>
                          <p className="dashboard-section-amount-or-number no-change"><span>0.0%</span> <i className="uil uil-arrows-h-alt"></i></p>
                      </div>
                      <div className="book-value-info-box">
                          <p className="dashboard-section-sub-title">Yearly Change</p>
                          <p className="dashboard-section-amount-or-number downward-change"><span>0.8%</span> <i className="uil uil-chart-down"></i></p>
                      </div>
                  </div>

                  <div className="loans_clients_summary_container" style={{marginTop:"20px"}}>

                      <div className="loans_clients_summary_container-header" onClick={showDiv3}>
                          <div>
                              <h1 className="dashboard-section-title">Loan Book Value Categories</h1>
                          </div>

                          <i className={div3 ? 'uil uil-angle-down arrow_rotate loans_clients_summary-arrow' : 'uil uil-angle-down loans_clients_summary-arrow'}></i>
                      </div>

                      <div className={div3 ? 'loan_client_item_list grid showDiv' : 'loan_client_item_list grid'}>

                          <div className="loans__clients__data">
                              <div className="loan_client_summary__titles">
                                  <h3 className="loan_client_item_name">Open Loans</h3>
                                  <span className="loan_client_item_number">ZWL 789 890.04 ( 80% )</span>
                              </div>
                              <div className="loan_client_item__bar">
                                  <span className="loan_client_item__percentage" style={{width:"80%"}}></span>
                              </div>
                          </div>

                          <div className="loans__clients__data">
                              <div className="loan_client_summary__titles">
                                  <h3 className="loan_client_item_name">Loans In Arrears</h3>
                                  <span className="loan_client_item_number">ZWL 127 890.89 ( 60% )</span>
                              </div>
                              <div className="loan_client_item__bar">
                                  <span className="loan_client_item__percentage in_arrears" style={{width:"60%"}}></span>
                              </div>
                          </div>

                          <div className="loans__clients__data">
                              <div className="loan_client_summary__titles">
                                  <h3 className="loan_client_item_name">Defaulted Loans</h3>
                                  <span className="loan_client_item_number">ZWL 657 989.90 ( 85% )</span>
                              </div>
                              <div className="loan_client_item__bar">
                                  <span className="loan_client_item__percentage defaulted_loans" style={{width:"85%"}}></span>
                              </div>
                          </div>

                      </div>

                  </div>

                  <div className="chart-section">
                      <div className="chart-container">
                          chart
                      </div>
                      <div className="chart-scroller bottom">
                          <i className="uil uil-arrow-circle-left"></i>
                      </div>
                  </div>

              </div>

          </div>
      </div>


        <ActiveClients branches={branches} currencies={currencies} div4={div4} showDiv4={showDiv4} />

        <LoansReleased branches={branches} currencies={currencies}/>

        <LoanCollections branches={branches} currencies={currencies}/>

        <div className="card">
            <div className="card-body">

                <div className="book-value-section">

                    <AllLoans branches={branches} currencies={currencies} div1={div1} showDiv1={showDiv1} />
                    <AllClients branches={branches} div2={div2} showDiv2={showDiv2} />

                </div>

            </div>
        </div>

        <Status branches={branches} currencies={currencies}/>
  </div>
  )
}