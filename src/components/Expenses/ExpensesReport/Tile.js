import React from 'react';
import Select from 'react-select';


function Tile({
    total_expenses_count,
    total_expenses_amount,
    expense_name,
    currencyIso,
    currencyId,
    branches,
    limits
    }) {

    return (
            <>
                <div style={{width:"100%", marginBottom:"1.5rem"}}>
                    <div style={{display:"flex", flexDirection:"column", rowGap:"1rem", padding:"1.5rem"}} className="par-card">
                        <div>
                            <span>
                                <Select
                                    isMulti
                                    name='branches'
                                    options={branches}
                                    value={branches}
                                    classNamePrefix='select'
                                    className='basic-multi-select'
                                    placeholder='Select Branches'
                                    isDisabled={true}
                                />
                            </span>
                        </div>
                        <div style={{display:"flex", flexDirection:"column", rowGap:"5px"}}>
                            <span>{currencyIso} {expense_name}</span>
                            <span>Total number of expenses: {total_expenses_count} </span>
                            <span>Total expenses value: <b>{currencyIso} {total_expenses_amount}</b></span>
                        </div>
                    </div>
                </div>
            </>
        )
    }

export default Tile