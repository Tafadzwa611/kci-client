import React, { useEffect, useState, useRef } from 'react';
import { makeRequest } from '../../../utils/utils';
import BarChart from './BarChart';
import Select from 'react-select';
import Loader from '../../Loader/loader';

const Status = ({branches, currencies}) => {
    const [labels, setLabels] = useState(null);
    const [dataSets, setDataSets] = useState(null);
    const [wrapperWidth, setWrapperWidth] = useState(null);
    const [selectedBranchesIds, setSelectedBranchesIds] = useState([]);
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

    const changeCurrency = (evt) => {
        setCurrencyId(evt.target.value);
    }
  
    useEffect(() => {
        getDataReport();
    }, []);

    const getDataReport = async () => {
        const report = await fetchData();
        updateUi(report);
    }
  
    useEffect(() => {
        getData();
    }, [selectedBranchesIds, currencyId]);

    const getData = async () => {
        if (!isFirstRun.current) {
            pageNum.current = 1;
            const report = await fetchData();
            updateUi(report);
        }
    }
  
    async function fetchData() {
        try {
            let url = `/dashboardapi/dashboard-loan-status/?page_num=${pageNum.current}&currency_id=${currencyId}`;
            selectedBranchesIds.forEach(id => (url += `&branch_ids=${id}`));
            const response = await makeRequest.get(url, {timeout: 8000});
            if (response.ok) {
                const report = await response.json();
                pageNum.current = report.next_page_num;
                isFirstRun.current = false;
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
        const newLabels = [];
        const newData = [[], [], [], [], [], []];
        newReport.loan_status_distribution.reverse().forEach(month => {
            const d = new Date(month.month_of_year);
            newLabels.push(`${months[d.getMonth()]} ${d.getFullYear()}`);
            newData[0].push(month.status['Open']);
            newData[1].push(month.status['Fully Paid']);
            newData[2].push(month.status['Restructured']);
            newData[3].push(month.status['Over Paid']);
            newData[4].push(month.status['Early Settlement']);
            newData[5].push(month.status['Defaulted']);
        });
        
        if (extendReport) {
            const ds = dataSets.map((dt, idx) => {
            return {label: dt.label, data: [...newData[idx], ...dt.data], backgroundColor: dt.backgroundColor, borderColor: dt.borderColor, borderWidth: 1}
            });
            setDataSets(ds);
            setLabels(curr => [...newLabels, ...curr]);
            setWrapperWidth(curr => curr + (12*60));
        }else {
            setWrapperWidth(1517);
            setLabels(newLabels);
            setDataSets([
                {label: 'Open', data: newData[0], backgroundColor:" #17A2B8", borderColor: '#17A2B8', borderWidth: 1},
                {label: 'Fully Paid', data: newData[1], backgroundColor:"#28A745", borderColor: '#28A745', borderWidth: 1},
                {label: 'Restructured', data: newData[2], backgroundColor:"#343A40", borderColor: '#343A40', borderWidth: 1},
                {label: 'Over Paid', data: newData[3], backgroundColor:"#FFC107", borderColor: '#FFC107', borderWidth: 1},
                {label: 'Early Settlement', data: newData[4], backgroundColor:"#637FEA", borderColor: '#637FEA', borderWidth: 1},
                {label: 'Defaulted', data: newData[5], backgroundColor:"#DC3545", borderColor: '#DC3545', borderWidth: 1}
            ]);
        }
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

                    <div className="chart-section">
                        <div className="chart-scroller header">
                            <h1 className="dashboard-section-title">No. of Open vs Restructured vs Fully Paid vs Over Paid vs Early Settlement vs Defaulted Loans</h1>
                        </div>
                        <div className="chart-container" style={{marginTop:"0"}}>
                            <div className='chart'>
                                {(labels===null || dataSets===null) ?
                                <div style={{display:"flex", justifyContent:"center", alignItems:"center", marginTop:"115px"}}>
                                    <Loader/>
                                </div> :
                                <BarChart wrapperWidth={wrapperWidth} data={{labels: labels, datasets: dataSets}}/>}
                            </div>
                        </div>
                        <div className="chart-scroller bottom">
                            <i onClick={loadMore} className="uil uil-arrow-circle-left" style={{cursor:"pointer"}}></i>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Status;