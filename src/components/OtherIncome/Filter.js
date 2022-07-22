import React from 'react';
import CreateOtherIncomeModal from './CreateOtherIncomeModal';

const Filter = (props) => {

        const {
            othInName,
            setOthInName,
            currency,
            currencyId,
            setCurrencyId,
            minDateCreated,
            setMinDateCreated,
            maxDateCreated,
            setMaxDateCreated,
            onSubmit,
            open,
            setOpen,
            setOtherIncomes,
            changeCurrency,
            searching,
            setSearching
        } = props;    

        return (
            <div className="card-body">
                <CreateOtherIncomeModal open={open} setOpen={setOpen} setOtherIncomes={setOtherIncomes} />
                <div style={{marginBottom:"1.5rem"}}>
                    <button type='button' className='btn btn-success' onClick={(e) => setOpen(curr => !curr)}>Add Other Income</button>
                </div>
                <form onSubmit={onSubmit}>

                    <div className="text-light">

                        <div className="disbursement_date_range">

                            <div className="disbursement-report-fields">
                                <div style={{width:"100%"}}>
                                    <label className="form-label">Min Date Created</label>
                                    <div className="reports-input-group" style={{margin:"10px 0 0"}}>
                                        <i className="uil uil-calendar-alt"></i>
                                        <input 
                                            className="reports-form-control" 
                                            type="date" 
                                            value={minDateCreated}
                                            onKeyDown={(e) => e.preventDefault()}
                                            onChange={(e) => setMinDateCreated(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div style={{width:"100%"}}>
                                    <label className="form-label">Max Date Created</label>
                                    <div className="reports-input-group" style={{margin:"10px 0 0"}}>
                                        <i className="uil uil-calendar-alt"></i>
                                        <input 
                                            className="reports-form-control" 
                                            type="date" 
                                            value={maxDateCreated}
                                            onKeyDown={(e) => e.preventDefault()}
                                            onChange={(e) => setMaxDateCreated(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div style={{marginTop:"20px"}}>
                                <div className="disbursement-report-fields">
                                    <input 
                                        className="report-custom-form-control normal-input" 
                                        placeholder="Enter Expense Name..."
                                        autoComplete='off'
                                        type="text"
                                        value={othInName}
                                        onChange={(e) => setOthInName(e.target.value)}
                                    />
                                    <select className="report-custom-form-control currency" value={currencyId} onChange={changeCurrency}>
                                        {currency.map(cur => {
                                            return <option key={cur.id} value={cur.id}>{cur.shortname}</option>
                                        })}
                                    </select>
                                    {searching ?
                                        <button type="submit" className="btn btn-info" style={{opacity:"0.7", cursor:"none"}}>Searching</button>:
                                        <button type="submit" className="btn btn-info" >Search</button>
                                    }
                                </div>
                            </div>

                        </div>

                    </div>
                </form>
            </div>
        );
    }

export default Filter;