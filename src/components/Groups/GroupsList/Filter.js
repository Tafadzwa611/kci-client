import React, {useState} from 'react';
import Select from 'react-select';

const Filter = (props) => {

    const {
        minRegDate,
        maxRegDate,
        setMinRegDate,
        setMaxRegDate,
        searchStr,
        setSearchStr,
        branches,
        setBranchIds,
        minGrpDate,
        setMinGrpDate,
        maxGrpDate,
        setMaxGrpDate,
        approved,
        setApproved,
        onSubmit,
        details
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

    return (
        <div className="search_background">
            <form onSubmit={onSubmit}>
                <div className="row-containers" style={{border:"none"}}>
                    <div className="row row-payments">
                        <div className="row-payments-container">
                            <label className="form-label row-label">Min Reg Date</label>
                            <div className="input-group search_input" style={{margin:"10px 0 0"}}>
                                <i className="uil uil-calendar-alt"></i>
                                <input
                                    type='date'
                                    value={minRegDate}
                                    onKeyDown={(e) => e.preventDefault()}
                                    onChange={(e) => setMinRegDate(e.target.value)}
                                    className='custom-select-form row-form input-background'
                                    disabled={details ? "disabled": ""}
                                />
                            </div>
                        </div>
                        <div className="row-payments-container">
                            <label className="form-label row-label">Max Reg Date</label>
                            <div className="input-group search_input" style={{margin:"10px 0 0"}}>
                                <i className="uil uil-calendar-alt"></i>
                                <input
                                    type='date'
                                    value={maxRegDate}
                                    onKeyDown={(e) => e.preventDefault()}
                                    onChange={(e) => setMaxRegDate(e.target.value)}
                                    className='custom-select-form row-form input-background'
                                    disabled={details ? "disabled": ""}
                                />
                            </div>
                        </div>
                        <div className="row-payments-container">
                            <label className="form-label row-label">Min Group Date</label>
                            <div className="input-group search_input" style={{margin:"10px 0 0"}}>
                                <i className="uil uil-calendar-alt"></i>
                                <input
                                    type='date'
                                    value={minGrpDate}
                                    onKeyDown={(e) => e.preventDefault()}
                                    onChange={(e) => setMinGrpDate(e.target.value)}
                                    className='custom-select-form row-form input-background'
                                    disabled={details ? "disabled": ""}
                                />
                            </div>
                        </div>
                        <div className="row-payments-container">
                            <label className="form-label row-label">Max Group Date</label>
                            <div className="input-group search_input" style={{margin:"10px 0 0"}}>
                                <i className="uil uil-calendar-alt"></i>
                                <input
                                    type='date'
                                    value={maxGrpDate}
                                    onKeyDown={(e) => e.preventDefault()}
                                    onChange={(e) => setMaxGrpDate(e.target.value)}
                                    className='custom-select-form row-form input-background'
                                    disabled={details ? "disabled": ""}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row row-payments" style={{marginTop:"1rem"}}>
                        <div className="row-payments-container" style={{width:"48%"}}>
                            <div className="input-group" style={{margin:"0"}}>
                                <input
                                    type='text'
                                    name='search'
                                    autoComplete='off'
                                    className='custom-select-form row-form input-background'
                                    placeholder='Search Group Name...'
                                    value={searchStr}
                                    onChange={(e) => setSearchStr(e.target.value)}
                                    disabled={details ? "disabled": ""}
                                />
                            </div>
                        </div>
                        <div className="row-payments-container" style={{width:"48%"}}>
                            <select className='custom-select-form row-form' onChange={(e) => setApproved(e.target.value)} value={approved} disabled={details ? "disabled": ""}>
                                <option value={''}>Approval Status</option>
                                <option value={'1'}>Approved</option>
                                <option value={'0'}>Pending Approval</option>
                            </select>
                        </div>
                    </div>

                    <div className="row row-payments" style={{marginTop:"1rem"}}>
                        <div className="row-payments-container" style={{width:"90%"}}>
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
                                isDisabled={details ? true: false}
                            />
                        </div>
                        <button type='submit' className='btn btn-olive' style={details ? {pointerEvents: 'none', opacity: '0.7'}: {}}>Search</button>
                    </div>

                </div>

            </form>
        </div>
        );
    }

    Filter.defaultProps = {
        allOption: {
            label: 'Select all',
            value: '*'
        }
    };

export default Filter;