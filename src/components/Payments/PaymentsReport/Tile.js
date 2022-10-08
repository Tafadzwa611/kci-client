import React, { useState } from 'react';
import Select from 'react-select';
// import AgeingAnalysis from './AgeingAnalysis';


function Tile({
    total_payments_count,
    total_amount_paid,
    total_princpal_amnt_paid,
    total_interest_amnt_paid,
    total_penalty_amnt_paid,
    payment_name,
    currencyIso,
    currencyId,
    branches,
    limits
}) {
  const [openModal, setOpenModal] = useState(false);

  const handleClick = () => {
    // setOpenModal(true);
    console.log('yes')
  }

  return (
        <>
            {/* <AgeingAnalysis
                open={openModal}
                setOpen={setOpenModal}
                par_name={par_name}
                par_value={par_value}
                currencyIso={currencyIso}
                currencyId={currencyId}
                branches={branches}
                limits={limits}
                loans_in_arrears_count={loans_in_arrears_count}
                total_loan_count={total_loan_count}
                principal_at_risk={principal_at_risk}
                total_loan_portfolio={total_loan_portfolio}
            /> */}
            <div onClick={handleClick} style={{width:"100%", marginBottom:"1.5rem", cursor: 'grab'}}>
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
                        <span>Total principal payments value: <b>{currencyIso} {total_princpal_amnt_paid}</b></span>
                        <span>Total interest payments value: <b>{currencyIso} {total_interest_amnt_paid}</b></span>
                        <span>Total penalty payments value: <b>{currencyIso} {total_penalty_amnt_paid}</b></span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Tile