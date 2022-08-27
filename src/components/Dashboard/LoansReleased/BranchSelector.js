import React, { useState } from 'react';
import Select from 'react-select';

function BranchSelector({ branches, setSelectedBranchesIds }) {
    const [optionSelected, setOptionSelected] = useState([]);

    const handleMultiSelect = selected => {
        setOptionSelected(selected);
        setSelectedBranchesIds(selected.map(branch => branch.id));
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
        <div className='col-6'>
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
    )
}

export default BranchSelector;