import React, { useEffect, useState } from 'react';
import { makeRequest } from '../../../../utils/utils';
import Select from 'react-select';

const DateRange = (props) => {
    const {
        accType,
        setAccType,
        onSubmit, 
        setMainAccounts, 
        branches,
        searching,
        setBranchIds
    } = props;

    const style = {
        control: base => ({
          ...base,
          border: '1px solid #dee2e6',
          boxShadow: "none",
          '&:hover':'1px solid #dee2e6',
        })
    };

    const [optionSelected, setOptionSelected] = useState([]);
    const selectorBranches = [...branches.map(result => ({...result, label: result.name, value:result.id}))];
  
    const handleMultiSelect = selected => {
      setOptionSelected(selected);
      setBranchIds(selected.map(branch => branch.id));
    }
  
    // useEffect(() => {
    //     fetchBranches();
    // }, []);
  
    // const handleMultiSelect = selected => {
    //     setOptionSelected(selected);
    //     setMainAccounts([]);
    //     updateSelectedBranchesId(selected.map(branch => branch.id));
    // }
  
    // const changeCurrency = (evt) => {
    //     setCurrencyId(evt.target.value);
    // }
  
    // async function fetchBranches() {
    //     try {
    //         const response = await makeRequest.get('/usersapi/get-branches/', {timeout: 8000});
    //         if (response.ok) {
    //             const data = await response.json();
    //             return setBranches([...data.results.map(result => ({...result, label: result.name, value:result.id}))]);
    //         }else {
    //             const error = await response.json();
    //             console.log(error);
    //         }
    //     }catch(error) {
    //         console.log(error);
    //     }
    // }
    return (

        <div className="font-13 text-light">

            <form onSubmit={onSubmit}>
                <div className="view_search_container online__applications font-13" style={{border:"none", padding:"0"}}>
                    <div className="row-payments-container" style={{width:"72%"}}>
                        {/* <label className="form-label row-label">Select Branch</label> */}
                        <Select
                            isMulti
                            name='colors'
                            options={[props.allOption, ...selectorBranches]}
                            value={optionSelected}
                            classNamePrefix='select'
                            className='basic-multi-select'
                            placeholder='Select Branches'
                            onChange={selected => {
                                if (selected !== null && selected.length > 0 && selected[selected.length - 1].value === props.allOption.value) {
                                return handleMultiSelect(selectorBranches);
                                }
                                handleMultiSelect(selected);
                            }}
                            styles={style}
                        />
                    </div>
                    <div className="row-payments-container" style={{width:"15%"}}>
                        {/* <label className="form-label row-label">Account Type</label> */}
                        <select className='custom-select-form row-form' style={{margin:"0"}} onChange={(e) => setAccType(e.target.value)} value={accType}>
                            <option value={''}>Select Account Type</option>
                            <option value={'ASSET'}>ASSET</option>
                            <option value={'LIABILITY'}>LIABILITY</option>
                            <option value={'EQUITY'}>EQUITY</option>
                            <option value={'INCOME'}>INCOME</option>
                            <option value={'EXPENSE'}>EXPENSE</option>
                            <option value={'CONTRA ASSET'}>CONTRA ASSET</option>
                        </select>
                    </div>
                    <div style={{display:"flex", flexDirection:"column", width:"10%"}}>
                        {/* <label className="form-label row-label">Filter</label> */}
                        {/* <button type="submit" className="btn btn-olive">Apply_Filters_!</button> */}
                        {searching ?
                            <button type="submit" className="btn btn-olive" style={{opacity:"0.7", cursor:"none"}}>Searching</button>:
                            <button type="submit" className="btn btn-olive" >Apply_Filters_!</button>
                        }
                    </div>

                    {/* <div className="row-payments-container" style={{width:"45%"}}>
                        <label className="form-label row-label">Currency</label>
                        <select className='custom-select-form row-form' style={{margin:"0"}} value={currencyId} onChange={changeCurrency}>
                            {currencies.map(currency => {
                                return <option key={currency.id} value={currency.id}>{currency.shortname}</option>
                            })}
                        </select>
                    </div> */}
                </div>

                {/* <div className="view_search_container online__applications font-13" style={{border:"none", padding:"0", marginTop:"1rem"}}>
                    <div className="row-payments-container" style={{width:"80%"}}>
                        <Select
                            isMulti
                            name='colors'
                            options={[props.allOption, ...selectorBranches]}
                            value={optionSelected}
                            classNamePrefix='select'
                            className='basic-multi-select'
                            placeholder='Select Branches'
                            onChange={selected => {
                                if (selected !== null && selected.length > 0 && selected[selected.length - 1].value === props.allOption.value) {
                                return handleMultiSelect(selectorBranches);
                                }
                                handleMultiSelect(selected);
                            }}
                            styles={style}
                        />
                    </div>
                    <div style={{display:"flex", flexDirection:"column"}}>
                        <button type="submit" className="btn btn-olive">Apply_Filters_!</button>
                    </div>
                </div> */}
            </form>

        </div>
        
    );
}

DateRange.defaultProps = {
    allOption: {
        label: 'Select all',
        value: '*'
    }
};

export default DateRange;