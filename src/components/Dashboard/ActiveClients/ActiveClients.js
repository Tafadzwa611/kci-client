import React, { useEffect, useRef, useState } from 'react';
import { makeRequest } from '../../../utils/utils';
import Select from 'react-select';

const ActiveClients = ({div4, showDiv4, branches, currencies}) => {
    const [selectedBranchesIds, setSelectedBranchesIds] = useState([]);
    const [currency, setCurrency] = useState('ZWL');
    const zwlId = currencies.filter(currency => currency.shortname === 'ZWL')[0].id;
    const [currencyId, setCurrencyId] = useState(zwlId);
    const [optionSelected, setOptionSelected] = useState([]);
    const [allactiveclients, setAllActiveClients] = useState([])

    const handleMultiSelect = selected => {
        setOptionSelected(selected);
        setSelectedBranchesIds(selected.map(branch => branch.id));
    }

    const changeCurrency = (evt) => {
        setCurrencyId(evt.target.value);
    }

    useEffect(() => {
        geAllClientsData();
    }, [selectedBranchesIds, currencyId]);

    const geAllClientsData = async () => {
        const data = await fetchData();
        const newCurrency = currencies.filter(currency => currency.id == currencyId)[0].shortname;
        setCurrency(newCurrency);
        setAllActiveClients(data);
    };

    async function fetchData() {
        try {
          let url = `/dashboardapi/dashboard-active-clients/?currency_id=${currencyId}`;
          selectedBranchesIds.forEach(id => (url += `&branch_ids=${id}`));
          const response = await makeRequest.get(url, {timeout: 8000});
          if (response.ok) {
            const report = await response.json();
            return report
          }else {
            const error = await response.json();
            console.log(error);
          }
        }catch(error) {
          console.log(error);
        }
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
                            <p className="dashboard-section-title">Active Clients</p>
                            <p className="dashboard-section-amount-or-number">{allactiveclients['all_active_clients_count']}</p>
                        </div>
                        <div className="book-value-info-box">
                            <p className="dashboard-section-sub-title">Daily Change</p>
                            {allactiveclients['active_daily_change'] > 0 &&
                                <p className="dashboard-section-amount-or-number upward-change">
                                    <span>{allactiveclients['active_daily_change']}%</span> 
                                    <i className="uil uil-arrow-growth"></i>
                                </p>
                            }
                            {allactiveclients['active_daily_change'] == 0 &&
                                <p className="dashboard-section-amount-or-number no-change">
                                    <span>{allactiveclients['active_daily_change']}%</span> 
                                    <i className="uil uil-arrows-h-alt"></i>
                                </p>
                            }
                            {allactiveclients['active_daily_change'] < 0 &&
                                <p className="dashboard-section-amount-or-number downward-change">
                                    <span>{allactiveclients['active_daily_change']}%</span> 
                                    <i className="uil uil-chart-down"></i>
                                </p>
                            }
                        </div>
                        <div className="book-value-info-box">
                            <p className="dashboard-section-sub-title">Weekly Change</p>
                            {allactiveclients['active_weekly_change'] > 0 &&
                                <p className="dashboard-section-amount-or-number upward-change">
                                    <span>{allactiveclients['active_weekly_change']}%</span> 
                                    <i className="uil uil-arrow-growth"></i>
                                </p>
                            }
                            {allactiveclients['active_weekly_change'] == 0 &&
                                <p className="dashboard-section-amount-or-number no-change">
                                    <span>{allactiveclients['active_weekly_change']}%</span> 
                                    <i className="uil uil-arrows-h-alt"></i>
                                </p>
                            }
                            {allactiveclients['active_weekly_change'] < 0 &&
                                <p className="dashboard-section-amount-or-number downward-change">
                                    <span>{allactiveclients['active_weekly_change']}%</span> 
                                    <i className="uil uil-chart-down"></i>
                                </p>
                            }
                        </div>
                        <div className="book-value-info-box">
                            <p className="dashboard-section-sub-title">Monthly Change</p>
                            {allactiveclients['active_monthly_change'] > 0 &&
                                <p className="dashboard-section-amount-or-number upward-change">
                                    <span>{allactiveclients['active_monthly_change']}%</span> 
                                    <i className="uil uil-arrow-growth"></i>
                                </p>
                            }
                            {allactiveclients['active_monthly_change'] == 0 &&
                                <p className="dashboard-section-amount-or-number no-change">
                                    <span>{allactiveclients['active_monthly_change']}%</span> 
                                    <i className="uil uil-arrows-h-alt"></i>
                                </p>
                            }
                            {allactiveclients['active_monthly_change'] < 0 &&
                                <p className="dashboard-section-amount-or-number downward-change">
                                    <span>{allactiveclients['active_monthly_change']}%</span> 
                                    <i className="uil uil-chart-down"></i>
                                </p>
                            }
                        </div>
                        <div className="book-value-info-box">
                            <p className="dashboard-section-sub-title">Yearly Change</p>
                            {allactiveclients['active_yearly_change'] > 0 &&
                                <p className="dashboard-section-amount-or-number upward-change">
                                    <span>{allactiveclients['active_yearly_change']}%</span> 
                                    <i className="uil uil-arrow-growth"></i>
                                </p>
                            }
                            {allactiveclients['active_yearly_change'] == 0 &&
                                <p className="dashboard-section-amount-or-number no-change">
                                    <span>{allactiveclients['active_yearly_change']}%</span> 
                                    <i className="uil uil-arrows-h-alt"></i>
                                </p>
                            }
                            {allactiveclients['active_yearly_change'] < 0 &&
                                <p className="dashboard-section-amount-or-number downward-change">
                                    <span>{allactiveclients['active_yearly_change']}%</span> 
                                    <i className="uil uil-chart-down"></i>
                                </p>
                            }
                        </div>
                    </div>

                    <div className="loans_clients_summary_container" style={{marginTop:"20px"}}>

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
                                        {allactiveclients['female_active_clients_count']} ( {allactiveclients['female_active_clients_percentage']}% ) /
                                        <div className="tooltip">
                                            <span className="link">{currency} {allactiveclients['sum_female_active_clients_loans']}</span>
                                            <span className="tooltiptext">Total amount disbursed</span>
                                        </div>
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
                                        {allactiveclients['male_active_clients_count']} ( {allactiveclients['male_active_clients_percentage']}% ) / 
                                        <div className="tooltip">
                                            <span className="link">{currency} {allactiveclients['sum_male_active_clients_loans']}</span>
                                            <span className="tooltiptext">Total amount disbursed</span>
                                        </div>
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
                                        {allactiveclients['group_active_count']} ( {allactiveclients['group_active_percentage']}% ) / 
                                        <div className="tooltip">
                                            <span className="link">{currency} {allactiveclients['sum_groups_active_clients_loans']}</span>
                                            <span className="tooltiptext">Total amount disbursed</span>
                                        </div>
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
                            chart
                        </div>
                        <div className="chart-scroller bottom">
                            <i className="uil uil-arrow-circle-left"></i>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default ActiveClients;