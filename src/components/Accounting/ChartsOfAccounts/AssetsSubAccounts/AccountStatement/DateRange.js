import React from 'react';

const DateRange = ({    
    minDate,
    setMinDate,
    maxDate,
    setMaxDate,
    buttonLabel1,
    buttonLabel2,
    fetchData,
    Reset}) => {

    let fetchStyles = {};
    let resetStyles = {};

    let disableFetch = false;
    let disableReset = false;

    if (minDate === "" && maxDate === "") {
        fetchStyles = {pointerEvents: "none", opacity: "0.7"};
        resetStyles = {pointerEvents: "none", opacity: "0.7"};
        disableFetch = true;
        disableReset = true;
    }

    if (minDate !== '' && maxDate !== '') {
        if (minDate > maxDate) {
            fetchStyles = {pointerEvents: "none", opacity: "0.7"};
            disableFetch = true;
        }
    }

    return (
        <div className="col-12 font-12 balance_sheet_date_range text-light" style={{border:"none", padding:"0 1.5rem"}}>
            <form>
                <div className="view_search_container online__applications font-13 acc__statement-search" style={{border:"none", padding:"0", marginBottom:'1.5rem', display:"grid", gridTemplateColumns:"80% auto", columnGap:"10px"}}>
                    
                    <div style={{display:"flex", justifyContent:"space-between"}}>
                        <div className="row-payments-container" style={{width:"45%"}}>
                            <input
                                type='date'
                                className='custom-select-form row-form'
                                value={minDate}
                                onKeyDown={(e) => e.preventDefault()}
                                onChange={(date) => setMinDate(date.target.value)}
                                style={{width:"100%"}}
                            />
                        </div>

                        <div className="row-payments-container" style={{width:"45%"}}>
                            <input
                                type='date'
                                className='custom-select-form row-form'
                                value={maxDate}
                                onKeyDown={(e) => e.preventDefault()}
                                onChange={(date) => setMaxDate(date.target.value)}
                                style={{width:"100%"}}
                            />
                        </div>
                    </div>

                    <div style={{width:"20%"}}>
                        <div style={{display:"flex", columnGap:"10px"}}>
                            <button type='submit' className='btn btn-olive' onClick={fetchData} style={fetchStyles} disabled={disableFetch} name='fetch'>{buttonLabel1}</button>
                            <button type='submit' className='btn btn-purple' onClick={Reset} style={resetStyles} disabled={disableReset} name='reset'>{buttonLabel2}</button>
                        </div>
                    </div>

                </div>
            </form>
        </div>
    )
}

export default DateRange;