import React, { useEffect, useRef, useState } from 'react';
import LineChart from '../LoansReleased/LineChart';
import { makeRequest } from '../../../utils/utils';
import Select from 'react-select';

function LoanBook({div3, showDiv3, branches, currencies}) {
  const [labels, setLabels] = useState(null);
  const [dataSets, setDataSets] = useState(null);
  const [selectedBranchesIds, setSelectedBranchesIds] = useState([]);
  const [currency, setCurrency] = useState('ZWL');
  const zwlId = currencies.filter(currency => currency.shortname === 'ZWL')[0].id;
  const [currencyId, setCurrencyId] = useState(zwlId);
  const pageNum = useRef(1);
  const isFirstRun = useRef(true);
  const months = {0: 'Jan', 1: 'Feb', 2: 'Mar', 3: 'Apr', 4: 'May', 5: 'Jun', 6: 'Jul', 7: 'Aug', 8: 'Sep', 9: 'Oct', 10: 'Nov', 11: 'Dec'};
  const [optionSelected, setOptionSelected] = useState([]);
  const [loanbookvalues, setLoanBookValues]= useState([])

  const handleMultiSelect = selected => {
      setOptionSelected(selected);
      setSelectedBranchesIds(selected.map(branch => branch.id));
  }

  useEffect(() => {
    getReport();
  }, []);

  const getReport = async () => {
    const report = await fetchData();
    updateUi(report);
  }

  useEffect(() => {
    getData();
  }, [selectedBranchesIds, currencyId]);

  const getData = async () => {
    if (!isFirstRun.current) {
      pageNum.current = 1;
      const newCurrency = currencies.filter(currency => currency.id == currencyId)[0].shortname;
      setCurrency(newCurrency);
      const report = await fetchData();
      updateUi(report);
    }
  } 

  async function fetchData() {
    try {
      let url = `/dashboardapi/dashboard-loan-book/?page_num=${pageNum.current}&currency_id=${currencyId}`;
      selectedBranchesIds.forEach(id => (url += `&branch_ids=${id}`));
      const response = await makeRequest.get(url, {timeout: 8000});
      if (response.ok) {
        const report = await response.json();
        pageNum.current = report.next_page_num;
        isFirstRun.current = false;
        setLoanBookValues(report);
        return report
      }else {
        const error = await response.json();
        console.log(error);
      }
    }catch(error) {
      console.log(error);
    }
  }

  function updateUi(newReport, extendReport=false) {
    let newLabels = [];
    let newData = [];
    newReport.loan_book.reverse().forEach(month => {
      const d = new Date(month.month_of_year);
      newLabels.push(`${months[d.getMonth()]} ${d.getFullYear()}`);
      newData.push(month.amount);
    });
    if (extendReport) {
      setLabels(curr => [...newLabels, ...curr]);
      setDataSets(curr => [{data: [...newData, ...curr[0].data], borderColor: '#637fea', cubicInterpolationMode: 'monotone'}]);
    }else {
      setLabels(newLabels);
      setDataSets([{data: newData, borderColor: '#637fea', cubicInterpolationMode: 'monotone'}]);
    }
  }

  const changeCurrency = (evt) => {
    setCurrencyId(evt.target.value);
  }

  async function loadMore () {
    const report = await fetchData();
    updateUi(report, true);
  }

  const style = {
    control: base => ({
        ...base,
        border: '1px solid #dee2e6',
        boxShadow: "none",
        '&:hover':'1px solid #dee2e6',
    })
  };

  return (
        <>
            <div className="card">
                <div className="card-body">

                    <div className="book-value-section">

                        <div className="book-value-select-section">
                            <div className="fields-container-select select_container_width">
                                <select value={currencyId} onChange={changeCurrency} className="custom-select-form select_width" style={{padding:"0.5125rem 0.9rem"}}>
                                    {currencies.map(currency => {
                                        return <option key={currency.id} value={currency.id}>{currency.shortname}</option>
                                    })}
                                </select>
                            </div>
                            <div className="fields-container-select select_container_width branch">
                                <Select
                                    isMulti
                                    name='branches'
                                    options={branches}
                                    value={optionSelected}
                                    classNamePrefix='select'
                                    className='basic-multi-select'
                                    placeholder='Select Branches'
                                    onChange={selected => handleMultiSelect(selected)}
                                    styles={style}
                                />
                            </div>
                        </div>

                        <div className="book-value-update-section">
                            <div className="book-value-info-box">
                                <p className="dashboard-section-title">Loan Book Value</p>
                                <p className="dashboard-section-amount-or-number">{loanbookvalues['loan_book_current_value']}</p>
                            </div>
                            <div className="book-value-info-box">
                                <p className="dashboard-section-sub-title">Daily Change</p>
                                {loanbookvalues['daily_change'] > 0 &&
                                    <p style={{display:"flex", alignItems:"center", columnGap:"5px"}} className="dashboard-section-amount-or-number upward-change">
                                        <span>{loanbookvalues['daily_change']}%</span> 
                                        <i className="uil uil-arrow-growth"></i>
                                    </p>
                                }
                                {loanbookvalues['daily_change'] == 0 &&
                                    <p style={{display:"flex", alignItems:"center", columnGap:"5px"}} className="dashboard-section-amount-or-number no-change">
                                        <span>{loanbookvalues['daily_change']}%</span> 
                                        <i className="uil uil-arrows-h-alt"></i>
                                    </p>
                                }
                                {loanbookvalues['daily_change'] < 0 &&
                                    <p style={{display:"flex", alignItems:"center", columnGap:"5px"}} className="dashboard-section-amount-or-number downward-change">
                                        <span>{loanbookvalues['daily_change']}%</span> 
                                        <i className="uil uil-chart-down"></i>
                                    </p>
                                }
                                {loanbookvalues['daily_change'] == null &&
                                    <p className="dashboard-section-amount-or-number no-change">
                                        <span></span> 
                                        <i className="uil uil-arrows-h-alt"></i>
                                    </p>
                                }
                            </div>
                            <div className="book-value-info-box">
                                <p className="dashboard-section-sub-title">Weekly Change</p>
                                {loanbookvalues['weekly_change'] > 0 &&
                                    <p style={{display:"flex", alignItems:"center", columnGap:"5px"}} className="dashboard-section-amount-or-number upward-change">
                                        <span>{loanbookvalues['weekly_change']}%</span> 
                                        <i className="uil uil-arrow-growth"></i>
                                    </p>
                                }
                                {loanbookvalues['weekly_change'] == 0 &&
                                    <p style={{display:"flex", alignItems:"center", columnGap:"5px"}} className="dashboard-section-amount-or-number no-change">
                                        <span>{loanbookvalues['weekly_change']}%</span> 
                                        <i className="uil uil-arrows-h-alt"></i>
                                    </p>
                                }
                                {loanbookvalues['weekly_change'] < 0 &&
                                    <p style={{display:"flex", alignItems:"center", columnGap:"5px"}} className="dashboard-section-amount-or-number downward-change">
                                        <span>{loanbookvalues['weekly_change']}%</span> 
                                        <i className="uil uil-chart-down"></i>
                                    </p>
                                }
                                {loanbookvalues['weekly_change'] == null &&
                                    <p className="dashboard-section-amount-or-number no-change">
                                        <span></span> 
                                        <i className="uil uil-arrows-h-alt"></i>
                                    </p>
                                }
                            </div>
                            <div className="book-value-info-box">
                                <p className="dashboard-section-sub-title">Monthly Change</p>
                                {loanbookvalues['monthly_change'] > 0 &&
                                    <p style={{display:"flex", alignItems:"center", columnGap:"5px"}} className="dashboard-section-amount-or-number upward-change">
                                        <span>{loanbookvalues['monthly_change']}%</span> 
                                        <i className="uil uil-arrow-growth"></i>
                                    </p>
                                }
                                {loanbookvalues['monthly_change'] == 0 &&
                                    <p style={{display:"flex", alignItems:"center", columnGap:"5px"}} className="dashboard-section-amount-or-number no-change">
                                        <span>{loanbookvalues['monthly_change']}%</span> 
                                        <i className="uil uil-arrows-h-alt"></i>
                                    </p>
                                }
                                {loanbookvalues['monthly_change'] < 0 &&
                                    <p style={{display:"flex", alignItems:"center", columnGap:"5px"}} className="dashboard-section-amount-or-number downward-change">
                                        <span>{loanbookvalues['monthly_change']}%</span> 
                                        <i className="uil uil-chart-down"></i>
                                    </p>
                                }
                                {loanbookvalues['monthly_change'] == null &&
                                    <p className="dashboard-section-amount-or-number no-change">
                                        <span></span> 
                                        <i className="uil uil-arrows-h-alt"></i>
                                    </p>
                                }
                            </div>
                            <div className="book-value-info-box">
                                <p className="dashboard-section-sub-title">Yearly Change</p>
                                {loanbookvalues['yearly_change'] > 0 &&
                                    <p style={{display:"flex", alignItems:"center", columnGap:"5px"}} className="dashboard-section-amount-or-number upward-change">
                                        <span>{loanbookvalues['yearly_change']}%</span> 
                                        <i className="uil uil-arrow-growth"></i>
                                    </p>
                                }
                                {loanbookvalues['yearly_change'] == 0 &&
                                    <p style={{display:"flex", alignItems:"center", columnGap:"5px"}} className="dashboard-section-amount-or-number no-change">
                                        <span>{loanbookvalues['yearly_change']}%</span> 
                                        <i className="uil uil-arrows-h-alt"></i>
                                    </p>
                                }
                                {loanbookvalues['yearly_change'] < 0 &&
                                    <p style={{display:"flex", alignItems:"center", columnGap:"5px"}} className="dashboard-section-amount-or-number downward-change">
                                        <span>{loanbookvalues['yearly_change']}%</span> 
                                        <i className="uil uil-chart-down"></i>
                                    </p>
                                }
                                {loanbookvalues['yearly_change'] == null &&
                                    <p className="dashboard-section-amount-or-number no-change">
                                        <span></span> 
                                        <i className="uil uil-arrows-h-alt"></i>
                                    </p>
                                }
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
                                        <span className="loan_client_item_number" style={{display:"flex", columnGap:"5px"}}>
                                            {loanbookvalues['open_loans_count']} ({loanbookvalues['open_loans_percentage']}% ) / 
                                            <div className="tooltip">
                                                <span className="link">{currency} {loanbookvalues['sum_open_loans']}</span>
                                                <span className="tooltiptext">Open loans total due excluding penalties and fees</span>
                                            </div>
                                        </span>
                                    </div>
                                    <div className="loan_client_item__bar">
                                        <span className="loan_client_item__percentage" style={{width: `${loanbookvalues['open_loans_percentage']}%`}}></span>
                                    </div>
                                </div>

                                <div className="loans__clients__data">
                                    <div className="loan_client_summary__titles">
                                        <h3 className="loan_client_item_name">Loans In Arrears</h3>
                                        <span className="loan_client_item_number" style={{display:"flex", columnGap:"5px"}}>
                                            {loanbookvalues['arrears_loans_count']} ({loanbookvalues['arrears_loans_percentage']}% ) / 
                                            <div className="tooltip">
                                                <span className="link">{currency} {loanbookvalues['sum_arrears_loans']}</span>
                                                <span className="tooltiptext">Arrears loans total due excluding penalties and fees</span>
                                            </div>
                                        </span>
                                    </div>
                                    <div className="loan_client_item__bar">
                                        <span className="loan_client_item__percentage in_arrears" style={{width: `${loanbookvalues['arrears_loans_percentage']}%`}}></span>
                                    </div>
                                </div>

                            </div>

                        </div>

                        <div className="chart-section">
                            <div className="chart-container">
                                <div className='chart'>
                                {(labels===null || dataSets===null) ?
                                <div style={{width: '100px', margin: 'auto'}}>loading...</div> :
                                <LineChart data={{labels: labels, datasets: dataSets}}/>}
                                </div>
                            </div>
                            <div className="chart-scroller bottom">
                                <i onClick={loadMore} className="uil uil-arrow-circle-left" style={{cursor:"pointer"}}></i>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}

export default LoanBook;