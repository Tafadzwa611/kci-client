import React from 'react';
import Select from 'react-select';


function Tile({
    total_payments_count,
    total_amount_paid,
    total_princpal_amnt_paid,
    total_interest_amnt_paid,
    total_penalty_amnt_paid,
    principal_per_of_total_paid,
    interest_per_of_total_paid,
    penalty_per_of_total_paid,
    payment_name,
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
                            <span>{currencyIso} {payment_name}</span>
                            <span>Total number of payments: {total_payments_count} </span>
                            <span>Total payments value: <b>{currencyIso} {total_amount_paid}</b></span>
                            <span>Total principal payments value: <b>{currencyIso} {total_princpal_amnt_paid}</b> <em>({principal_per_of_total_paid}% of total payments)</em></span>
                            <span>Total interest payments value: <b>{currencyIso} {total_interest_amnt_paid}</b> <em>({interest_per_of_total_paid}% of total payments)</em></span>
                            <span>Total penalty payments value: <b>{currencyIso} {total_penalty_amnt_paid}</b> <em>({penalty_per_of_total_paid}% of total payments)</em></span>
                        </div>
                    </div>
                </div>
            </>
        )
    }

export default Tile