import React, {useState, useEffect } from 'react';
import Select from 'react-select';
import { makeRequest } from '../../../utils/utils';

const AllClients = ({showDiv2, div2, branches}) => {
    const [selectedBranchesIds, setSelectedBranchesIds] = useState([]);
    const [optionSelected, setOptionSelected] = useState([]);
    const [allclients, setAllClients] = useState([])

    const handleMultiSelect = selected => {
        setOptionSelected(selected);
        setSelectedBranchesIds(selected.map(branch => branch.id));
    }

    useEffect(() => {
        geAllClientsData();
    }, [selectedBranchesIds]);

    const geAllClientsData = async () => {
        const data = await fetchData();
        setAllClients(data);
    };

    async function fetchData() {
        try {
          let url = '/dashboardapi/dashboard-allclients/';
          selectedBranchesIds.forEach(id => (url += `?branch_ids=${id}`));
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

        <div className="loans_clients_summary_container" style={{marginTop:"20px"}}>

            <div className="loans_clients_summary_container-header" onClick={showDiv2}>
                <div>
                    <h1 className="dashboard-section-title">All Clients</h1>
                    <span className="dashboard-section-amount-or-number">{allclients['all_clients_count']}</span>
                </div>

                <i className={div2 ? 'uil uil-angle-down arrow_rotate loans_clients_summary-arrow' : 'uil uil-angle-down loans_clients_summary-arrow'}></i>
            </div>

            <div className={div2 ? 'loan_client_item_list grid showDiv' : 'loan_client_item_list grid'}>

                <div style={{marginBottom:"1rem"}}>
                    <div style={{width:"100%"}}>
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
                        <h3 className="loan_client_item_name">Female Individual Clients</h3>
                        <span className="loan_client_item_number">{allclients['all_female_clients_count']} ( {allclients['all_female_clients_percentage']}% )</span>
                    </div>
                    <div className="loan_client_item__bar">
                        <span className="loan_client_item__percentage" style={{width:`${allclients['all_female_clients_percentage']}%`}}></span>
                    </div>
                </div>

                <div className="loans__clients__data">
                    <div className="loan_client_summary__titles">
                        <h3 className="loan_client_item_name">Male Individual Clients</h3>
                        <span className="loan_client_item_number">{allclients['all_male_clients_count']} ( {allclients['all_male_clients_percentage']}% )</span>
                    </div>
                    <div className="loan_client_item__bar">
                        <span className="loan_client_item__percentage" style={{width:`${allclients['all_male_clients_percentage']}%`}}></span>
                    </div>
                </div>

                <div className="loans__clients__data">
                    <div className="loan_client_summary__titles">
                        <h3 className="loan_client_item_name"> Company/Co-operative Clients</h3>
                        <span className="loan_client_item_number">{allclients['all_group_clients_count']} ( {allclients['all_group_clients_percentage']}% )</span>
                    </div>
                    <div className="loan_client_item__bar">
                        <span className="loan_client_item__percentage" style={{width:`${allclients['all_group_clients_percentage']}%`}}></span>
                    </div>
                </div>

            </div>
            
        </div>
    )
}

export default AllClients;