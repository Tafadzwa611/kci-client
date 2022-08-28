import React, { useEffect, useRef, useState } from 'react';
import LineChart from '../LoansReleased/LineChart';
import { makeRequest } from '../../../utils/utils';
import Select from 'react-select';

function LoanCollections({branches, currencies}) {
    const [labels, setLabels] = useState(null);
    const [dataSets, setDataSets] = useState(null);
    const [showDisbursements, setShowDisbursements] = useState(false);
    const [selectedBranchesIds, setSelectedBranchesIds] = useState([]);
    // const [wrapperWidth, setWrapperWidth] = useState(1517);
    const zwlId = currencies.filter(currency => currency.shortname === 'ZWL')[0].id;
    const [currencyId, setCurrencyId] = useState(zwlId);
    const pageNum = useRef(1);
    const isFirstRun = useRef(true);
    const months = {0: 'Jan', 1: 'Feb', 2: 'Mar', 3: 'Apr', 4: 'May', 5: 'Jun', 6: 'Jul', 7: 'Aug', 8: 'Sep', 9: 'Oct', 10: 'Nov', 11: 'Dec'};
    const [optionSelected, setOptionSelected] = useState([]);

    const handleMultiSelect = selected => {
        setOptionSelected(selected);
        setSelectedBranchesIds(selected.map(branch => branch.id));
    }

    useEffect(() => {
        getReport();
    }, []);

    const getReport = async () => {
        const report = await getData();
        updateUi(report);
    }

    useEffect(() => {
        getDataCollections();
    }, [selectedBranchesIds, showDisbursements, currencyId]);

    const getDataCollections = async () => {
        if (!isFirstRun.current) {
            pageNum.current = 1;
            const report = await getData();
            updateUi(report);
        }
    } 

    async function getData() {
        try {
            let url1 = `/dashboardapi/dashboard-collections/?page_num=${pageNum.current}&currency_id=${currencyId}&components=Principal&components=Interest&components=Penalties&components=Fees`;
            let url2 = `/dashboardapi/dashboard-loans-released/?page_num=${pageNum.current}&currency_id=${currencyId}`;
            selectedBranchesIds.forEach(id => {
                url1 += `&branch_ids=${id}`;
                url2 += `&branch_ids=${id}`;
            });
            const urlArray = [url1]
            if (showDisbursements) {urlArray.push(url2)}
            const data = await fetchData(urlArray);
            const report = (data.length === 1) ? {...data[0]} : {...data[0], ...data[1]};
            pageNum.current = report.next_page_num;
            isFirstRun.current = false;
            return report
        }catch(error) {
            console.log(error);
        }
    }

    async function fetchData(urlArray) {
        let data = [];
        for (let i = 0; i < urlArray.length; i++) {
            const response = await makeRequest.get(urlArray[i], {timeout: 8000});
            if (response.ok) {
                const report = await response.json();
                data.push(report);
            }else {
                const error = await response.json();
                console.log(error);
            }
        }
        return data
    }

    function updateUi(newReport, extendReport=false) {
        const [newCollections, newDisbursements] = getDatasets(newReport);
        const newLabels = newReport.monthly_collections.reverse().map(month => {
            const d = new Date(month.month_of_year);
            return `${months[d.getMonth()]} ${d.getFullYear()}`
        });
        const collectionsOpts = {borderColor: '#ADF1BC', cubicInterpolationMode: 'monotone'};
        const disbursementsOpts = {borderColor: '#637FEA', cubicInterpolationMode: 'monotone'};
    
        if (extendReport) {
            setLabels(curr => [...newLabels, ...curr]);
            setDataSets(curr => [
                {...collectionsOpts, data: [...newCollections, ...curr[0].data]},
                {...disbursementsOpts, data: [...newDisbursements, ...curr[1].data]}
            ]);
            // setWrapperWidth(curr => curr + (12*60));
        }else {
            setLabels(newLabels);
            setDataSets([
                {...collectionsOpts, data: newCollections},
                {...disbursementsOpts, data: newDisbursements}
            ]);
        }
    }

    const changeCurrency = (evt) => {
        setCurrencyId(evt.target.value);
    }

    function getDatasets(newReport) {
        const newCollections = newReport.monthly_collections.map(month => month.amount_collected);
        let newDisbursements = [];
        if (showDisbursements) {
            newDisbursements = newReport.loans_released.map(month => month.amount_released);
        }
        return [newCollections.reverse(), newDisbursements.reverse()]
    }

    async function loadMore () {
        const report = await getData();
        updateUi(report, true);
    }
    
    function toggleDisbursements() {
        setShowDisbursements(curr => !curr);
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
                                <p className="dashboard-section-title">Loan Collections</p>
                                <p className="dashboard-section-amount-or-number">1290</p>
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

                        <div className="chart-section">
                            <div className="chart-container" style={{height:"355px"}}>
                                <div style={{display:"flex", columnGap:"5px", marginBottom:"10px"}}>
                                    <input type='checkbox' checked={showDisbursements} onChange={toggleDisbursements}/>
                                    <span style={{marginTop:"3px"}}>Show Amount Disbursed</span>
                                </div>
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

export default LoanCollections;