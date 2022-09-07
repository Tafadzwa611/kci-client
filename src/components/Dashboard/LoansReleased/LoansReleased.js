import React, { useEffect, useRef, useState } from 'react';
import LineChart from './LineChart';
import { makeRequest } from '../../../utils/utils';
import Select from 'react-select';

function LoansReleased({branches, currencies}) {
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
  const [allloansreleased, setAllLoansReleased]= useState([])

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
      let url = `/dashboardapi/dashboard-loans-released/?page_num=${pageNum.current}&currency_id=${currencyId}`;
      selectedBranchesIds.forEach(id => (url += `&branch_ids=${id}`));
      const response = await makeRequest.get(url, {timeout: 8000});
      if (response.ok) {
        const report = await response.json();
        pageNum.current = report.next_page_num;
        isFirstRun.current = false;
        setAllLoansReleased(report);
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
    newReport.loans_released.reverse().forEach(month => {
      const d = new Date(month.month_of_year);
      newLabels.push(`${months[d.getMonth()]} ${d.getFullYear()}`);
      newData.push(month.amount_released);
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
                          <p className="dashboard-section-title">Loans Released</p>
                          <p className="dashboard-section-amount-or-number">{currency} {allloansreleased['loans_released_total_sum_amount']}</p>
                      </div>
                      <div className="book-value-info-box">
                          <p className="dashboard-section-sub-title">Daily Change</p>
                          {allloansreleased['loans_released_yesterday_change'] > 0 &&
                            <p className="dashboard-section-amount-or-number upward-change">
                                <span>{allloansreleased['loans_released_yesterday_change']}%</span> 
                                <i className="uil uil-arrow-growth"></i>
                            </p>
                          }
                          {allloansreleased['loans_released_yesterday_change'] == 0 &&
                            <p className="dashboard-section-amount-or-number no-change">
                                <span>{allloansreleased['loans_released_yesterday_change']}%</span> 
                                <i className="uil uil-arrows-h-alt"></i>
                            </p>
                          }
                          {allloansreleased['loans_released_yesterday_change'] < 0 &&
                            <p className="dashboard-section-amount-or-number downward-change">
                                <span>{allloansreleased['loans_released_yesterday_change']}%</span> 
                                <i className="uil uil-chart-down"></i>
                            </p>
                          }
                      </div>
                      <div className="book-value-info-box">
                          <p className="dashboard-section-sub-title">Weekly Change</p>
                          {allloansreleased['loans_released_last_week_change'] > 0 &&
                            <p className="dashboard-section-amount-or-number upward-change">
                                <span>{allloansreleased['loans_released_last_week_change']}%</span> 
                                <i className="uil uil-arrow-growth"></i>
                            </p>
                          }
                          {allloansreleased['loans_released_last_week_change'] == 0 &&
                            <p className="dashboard-section-amount-or-number no-change">
                                <span>{allloansreleased['loans_released_last_week_change']}%</span> 
                                <i className="uil uil-arrows-h-alt"></i>
                            </p>
                          }
                          {allloansreleased['loans_released_last_week_change'] < 0 &&
                            <p className="dashboard-section-amount-or-number downward-change">
                                <span>{allloansreleased['loans_released_last_week_change']}%</span> 
                                <i className="uil uil-chart-down"></i>
                            </p>
                          }
                      </div>
                      <div className="book-value-info-box">
                          <p className="dashboard-section-sub-title">Monthly Change</p>
                          {allloansreleased['loans_released_last_month_change'] > 0 &&
                            <p className="dashboard-section-amount-or-number upward-change">
                                <span>{allloansreleased['loans_released_last_month_change']}%</span> 
                                <i className="uil uil-arrow-growth"></i>
                            </p>
                          }
                          {allloansreleased['loans_released_last_month_change'] == 0 &&
                            <p className="dashboard-section-amount-or-number no-change">
                                <span>{allloansreleased['loans_released_last_month_change']}%</span> 
                                <i className="uil uil-arrows-h-alt"></i>
                            </p>
                          }
                          {allloansreleased['loans_released_last_month_change'] < 0 &&
                            <p className="dashboard-section-amount-or-number downward-change">
                                <span>{allloansreleased['loans_released_last_month_change']}%</span> 
                                <i className="uil uil-chart-down"></i>
                            </p>
                          }
                      </div>
                      <div className="book-value-info-box">
                          <p className="dashboard-section-sub-title">Yearly Change</p>
                          {allloansreleased['loans_released_last_year_change'] > 0 &&
                            <p className="dashboard-section-amount-or-number upward-change">
                                <span>{allloansreleased['loans_released_last_year_change']}%</span> 
                                <i className="uil uil-arrow-growth"></i>
                            </p>
                          }
                          {allloansreleased['loans_released_last_year_change'] == 0 &&
                            <p className="dashboard-section-amount-or-number no-change">
                                <span>{allloansreleased['loans_released_last_year_change']}%</span> 
                                <i className="uil uil-arrows-h-alt"></i>
                            </p>
                          }
                          {allloansreleased['loans_released_last_year_change'] < 0 &&
                            <p className="dashboard-section-amount-or-number downward-change">
                                <span>{allloansreleased['loans_released_last_year_change']}%</span> 
                                <i className="uil uil-chart-down"></i>
                            </p>
                          }
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

export default LoansReleased;