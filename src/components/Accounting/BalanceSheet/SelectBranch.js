
import React from 'react';

const SelectBranch = ({
    branches,
    setBranches,
}) => {

    const handleChange = (evt) => {
        setBranches(prev => {
            let branches = {};
            if (evt.target.name === 'All Branches') {
                for (const [branchName, data] of Object.entries(prev)) {
                    branches[branchName] = [{...data[0], checked: evt.target.checked}];
                }
            }else {
                if (!evt.target.checked) {
                    branches['All Branches'] = [{...prev['All Branches'][0], checked: false}];
                }else {
                    let keys = Object.keys(prev);
                    const indexOfAllBranches = keys.indexOf('All Branches');
                    keys.splice(indexOfAllBranches, 1);
                    const indexOfBranch = keys.indexOf(evt.target.name);
                    keys.splice(indexOfBranch, 1);
                    const checkedStatusArry = keys.map(key => {
                        return prev[key][0].checked
                    })
                    branches['All Branches'] = [{...prev['All Branches'][0], checked: checkedStatusArry.every(v => v === true)}];
                }
                branches[evt.target.name] = [{...prev[evt.target.name][0], checked: evt.target.checked}];
                branches = {...prev, ...branches};
            }
            return branches
        });
    }


    return (
        <div className="text-light">
            <span>Select Branches</span>
            <form>
                <div className='row'>
                    {Object.keys(branches).map(key => {
                        const checked = branches[key][0].checked;
                        return (
                            <div key={key} className='custom-control-list' style={{position:'relative',display:'flex',flexDirection:"row", columnGap:"5px",minHeight:'1.5rem'}}>
                                <input name={key} onChange={handleChange} type='checkbox' checked={checked}/>
                                <label style={{marginTop:"10px", marginRight:"10px"}}>{key}</label>
                            </div>
                        )
                    })}
                </div>
            </form>
        </div>
    )
}

export default SelectBranch;