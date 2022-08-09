import React, { useEffect, useState } from 'react';
import Select from 'react-select';

const LiabilitiesDateRange = (props) => {
    const {
        onSubmit, 
        setSubAccounts, 
        changeCurrency,
        branches,
        setBranchIds,
        currency,
        currencyId,
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

    console.log(currencyId)
  

    return (

        <div className="font-13 text-light">

            <form onSubmit={onSubmit}>
                <div className="view_search_container online__applications font-13" style={{border:"none", padding:"0", marginBottom:'1.5rem'}}>
                    <div className="row-payments-container" style={{width:"72%"}}>
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
                        <select className='custom-select-form row-form' style={{margin:"0"}} value={currencyId} onChange={changeCurrency}>
                            {currency.map(crncy => {
                                return <option key={crncy.id} value={crncy.id}>{crncy.shortname}</option>
                            })}
                        </select>
                    </div>
                    <div style={{display:"flex", flexDirection:"column", width:"10%"}}>
                        <button type="submit" className="btn btn-olive" >Apply_Filters_!</button>
                    </div>
                </div>
            </form>

        </div>
        
    );
}

LiabilitiesDateRange.defaultProps = {
    allOption: {
        label: 'Select all',
        value: '*'
    }
};

export default LiabilitiesDateRange;