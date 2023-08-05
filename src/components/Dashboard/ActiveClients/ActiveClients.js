import React, { useEffect, useRef, useState } from 'react';
import LineChart from '../LoansReleased/LineChart';
import { makeRequest } from '../../../utils/utils';
import Select from 'react-select';
import Loader from '../../Loader/loader';

function ActiveClients({div4, showDiv4, branches, currencies}) {
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
  const [allactiveclients, setAllActiveClients]= useState([])

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
      let url = `/dashboardapi/dashboard-active-clients/?page_num=${pageNum.current}&currency_id=${currencyId}`;
      selectedBranchesIds.forEach(id => (url += `&branch_ids=${id}`));
      const response = await makeRequest.get(url, {timeout: 8000});
      if (response.ok) {
        const report = await response.json();
        pageNum.current = report.next_page_num;
        isFirstRun.current = false;
        setAllActiveClients(report);
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
    newReport.active_clients.reverse().forEach(month => {
      const d = new Date(month.month_of_year);
      newLabels.push(`${months[d.getMonth()]} ${d.getFullYear()}`);
      newData.push(month.active_clients_count);
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

                  <div className="loans_clients_summary_container" style={{marginTop:"20px"}}>

                    <div className="loans_clients_summary_container-header total__all_clients">
                      <div style={{display:'flex', alignItems:'center', columnGap:'10px'}}>
                        <p className="dashboard-section-title">Active Clients</p>
                        <p className="dashboard-section-amount-or-number">{allactiveclients['total_active_clients']}</p>
                      </div>
                    </div>

                    <div className="loans_clients_summary_container-header" onClick={showDiv4}>
                        <div>
                            <h1 className="dashboard-section-title">Active Clients Categories</h1>
                        </div>

                        <i className={div4 ? 'uil uil-angle-down arrow_rotate loans_clients_summary-arrow' : 'uil uil-angle-down loans_clients_summary-arrow'}></i>
                    </div>

                    <div className={div4 ? 'loan_client_item_list grid showDiv' : 'loan_client_item_list grid'}>

                        <div className="loans__clients__data">
                            <div className="loan_client_summary__titles">
                                <h3 className="loan_client_item_name">Active Female Individual Clients</h3>
                                <span className="loan_client_item_number" style={{display:"flex", columnGap:"5px"}}>
                                  {allactiveclients['female_active_clients_count']} ( {allactiveclients['female_active_clients_percentage']}% ) 
                                </span>
                            </div>
                            <div className="loan_client_item__bar">
                                <span className="loan_client_item__percentage" style={{width: `${allactiveclients['female_active_clients_percentage']}%`}}></span>
                            </div>
                        </div>

                        <div className="loans__clients__data">
                            <div className="loan_client_summary__titles">
                                <h3 className="loan_client_item_name">Active Male Individual Clients</h3>
                                <span className="loan_client_item_number" style={{display:"flex", columnGap:"5px"}}>
                                  {allactiveclients['male_active_clients_count']} ( {allactiveclients['male_active_clients_percentage']}% ) 
                                </span>
                            </div>
                            <div className="loan_client_item__bar">
                                <span className="loan_client_item__percentage" style={{width: `${allactiveclients['male_active_clients_percentage']}%`}}></span>
                            </div>
                        </div>

                        <div className="loans__clients__data">
                            <div className="loan_client_summary__titles">
                                <h3 className="loan_client_item_name">Active Company/Co-operative Clients</h3>
                                <span className="loan_client_item_number" style={{display:"flex", columnGap:"5px"}}>
                                  {allactiveclients['group_active_count']} ( {allactiveclients['group_active_percentage']}% ) 
                                </span>
                            </div>
                            <div className="loan_client_item__bar">
                                <span className="loan_client_item__percentage" style={{width: `${allactiveclients['group_active_percentage']}%`}}></span>
                            </div>
                        </div>

                    </div>

                </div>

                  <div className="chart-section">
                      <div className="chart-container">
                        <div className='chart'>
                          {(labels===null || dataSets===null) ?
                          <div style={{display:"flex", justifyContent:"center", alignItems:"center", marginTop:"115px"}}>
                            <Loader/>
                          </div> :
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

export default ActiveClients;