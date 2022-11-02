import React from 'react';
import Select from 'react-select';


function Tile({
    total_otherincome_count,
    total_otherincome_amount,
    otherincome_name,
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
                            <span>{currencyIso} {otherincome_name}</span>
                            <span>Total number of other income: {total_otherincome_count} </span>
                            <span>Total other income value: <b>{currencyIso} {total_otherincome_amount}</b></span>
                        </div>
                    </div>
                </div>
            </>
        )
    }

export default Tile