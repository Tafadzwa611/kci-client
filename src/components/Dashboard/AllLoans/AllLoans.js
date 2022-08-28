import React, {useState, useEffect, useRef} from 'react';
import Select from 'react-select';
import { makeRequest } from '../../../utils/utils';

const AllLoans = ({div1, showDiv1, branches, currencies}) => {
    const [selectedBranchesIds, setSelectedBranchesIds] = useState([]);
    const [currency, setCurrency] = useState('ZWL');
    const zwlId = currencies.filter(currency => currency.shortname === 'ZWL')[0].id;
    const [currencyId, setCurrencyId] = useState(zwlId);
    const [optionSelected, setOptionSelected] = useState([]);
    const [allloans, setAllLoans] = useState([])

    const handleMultiSelect = selected => {
        setOptionSelected(selected);
        setSelectedBranchesIds(selected.map(branch => branch.id));
    }

    const changeCurrency = (evt) => {
        setCurrencyId(evt.target.value);
    }

    useEffect(() => {
        geAllLoansData();
    }, [selectedBranchesIds, currencyId]);

    const geAllLoansData = async () => {
        const data = await fetchData();
        const newCurrency = currencies.filter(currency => currency.id == currencyId)[0].shortname;
        setCurrency(newCurrency);
        setAllLoans(data);
    };

    async function fetchData() {
        try {
          let url = `/dashboardapi/dashboard-allloans/?currency_id=${currencyId}`;
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
        <div className="loans_clients_summary_container">

            <div className="loans_clients_summary_container-header" onClick={showDiv1}>
                <div>
                    <h1 className="dashboard-section-title">All Loans</h1>
                    <span className="dashboard-section-amount-or-number">2789</span>
                </div>

                <i className={div1 ? 'uil uil-angle-down arrow_rotate loans_clients_summary-arrow' : 'uil uil-angle-down loans_clients_summary-arrow'}></i>
            </div>

            <div className={div1 ? 'loan_client_item_list grid showDiv' : 'loan_client_item_list grid'}>

                <div style={{display:"flex", justifyContent:"space-between", marginBottom:"1rem"}}>
                    <div style={{width:"10%"}}>
                        <select value={currencyId} onChange={changeCurrency} className="custom-select-form select_width" style={{width:"100%", padding:"0.5125rem 0.9rem"}}>
                            {currencies.map(currency => {
                                return <option key={currency.id} value={currency.id}>{currency.shortname}</option>
                            })}
                        </select>
                    </div>
                    <div style={{width:"88%"}}>
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

                <div className="loans__clients__data">
                    <div className="loan_client_summary__titles">
                        <h3 className="loan_client_item_name">Open Loans</h3>
                        <span className="loan_client_item_number">{allloans['arrears_loans_count']} ( 90% )</span>
                    </div>
                    <div className="loan_client_item__bar">
                        <span className="loan_client_item__percentage" style={{width:"90%"}}></span>
                    </div>
                </div>

                <div className="loans__clients__data">
                    <div className="loan_client_summary__titles">
                        <h3 className="loan_client_item_name">Loans In Arrears</h3>
                        <span className="loan_client_item_number">789 ( 80% )</span>
                    </div>
                    <div className="loan_client_item__bar">
                        <span className="loan_client_item__percentage in_arrears" style={{width:"80%"}}></span>
                    </div>
                </div>

                <div className="loans__clients__data">
                    <div className="loan_client_summary__titles">
                        <h3 className="loan_client_item_name">Fully Paid Loans</h3>
                        <span className="loan_client_item_number">657 ( 60% )</span>
                    </div>
                    <div className="loan_client_item__bar">
                        <span className="loan_client_item__percentage fully_paid" style={{width:"60%"}}></span>
                    </div>
                </div>

                <div className="loans__clients__data">
                    <div className="loan_client_summary__titles">
                        <h3 className="loan_client_item_name">Over Paid Loans</h3>
                        <span className="loan_client_item_number">878 ( 85% )</span>
                    </div>
                    <div className="loan_client_item__bar">
                        <span className="loan_client_item__percentage over_paid_loans" style={{width:"85%"}}></span>
                    </div>
                </div>

                <div className="loans__clients__data">
                    <div className="loan_client_summary__titles">
                        <h3 className="loan_client_item_name">Defaulted Loans</h3>
                        <span className="loan_client_item_number">678 ( 45% )</span>
                    </div>
                    <div className="loan_client_item__bar">
                        <span className="loan_client_item__percentage defaulted_loans" style={{width:"45%"}}></span>
                    </div>
                </div>

                <div className="loans__clients__data">
                    <div className="loan_client_summary__titles">
                        <h3 className="loan_client_item_name">Written Off Loans</h3>
                        <span className="loan_client_item_number">356 ( 10% )</span>
                    </div>
                    <div className="loan_client_item__bar">
                        <span className="loan_client_item__percentage written_off_loans" style={{width:"10%"}}></span>
                    </div>
                </div>

                <div className="loans__clients__data">
                    <div className="loan_client_summary__titles">
                        <h3 className="loan_client_item_name">Processing Loans</h3>
                        <span className="loan_client_item_number">109 ( 5% )</span>
                    </div>
                    <div className="loan_client_item__bar">
                        <span className="loan_client_item__percentage processing_loans" style={{width:"5%"}}></span>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AllLoans;