import React from 'react';

const DateSelect = ({
    selectedDate,
    setSelectedDate,
    fetch,
    reset,
    branchIds,
    currencies,
    currencyId,
    setCurrencyId
}) => {

    const changeCurrency = (evt) => {
        setCurrencyId(evt.target.value);
    }

    const disableFetch = selectedDate === '' || branchIds === '';

    return (
        <div>
            <form>

                <div className="view_search_container online__applications font-13" style={{border:"none", padding:"0", justifyContent:"normal", columnGap:"1rem"}}>
                    <div className="row-payments-container" style={{width:"35%"}}>
                        <label className="form-label row-label">Select the Date of the Balance Sheet</label>
                        <div className="input-group" style={{margin:"0"}}>
                            <i className="uil uil-calendar-alt"></i>
                            <input
                                type='date'
                                className='custom-select-form row-form input-background'
                                value={selectedDate}
                                onKeyDown={(e) => e.preventDefault()}
                                onChange={(date) => setSelectedDate(date.target.value)}
                                style={{width:"100%"}}
                            />
                        </div>
                    </div>
                    <div className="row-payments-container" style={{width:"35", display:"flex", justifyContent: "flex-end"}}>
                        <select className='custom-select-form row-form' value={currencyId} onChange={changeCurrency}>
                            {currencies.map(currency => {
                                return <option key={currency.id} value={currency.id}>{currency.shortname}</option>
                            })}
                        </select>
                    </div>
                    <div style={{width:"20%", display:"flex", alignItems:"flex-end"}}>
                        <div style={{display:"flex", columnGap:"10px"}}>
                            <button
                                type='submit'
                                className='btn btn-olive'
                                style={disableFetch ? {pointerEvents: 'none', opacity: '0.7'} : {}}
                                disabled={disableFetch}
                                onClick={fetch}
                            >Fetch!</button>
                            <button
                                type='submit'
                                className='btn btn-purple'
                                style={disableFetch ? {pointerEvents: 'none', opacity: '0.7'} : {}}
                                disabled={disableFetch}
                                onClick={reset}>Reset!
                            </button>
                        </div>
                    </div>
                </div>

            </form>
        </div>
    )
}

export default DateSelect;