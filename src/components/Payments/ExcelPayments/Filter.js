
import React from 'react';
import FileUploader from './FileUploader';


const SYSREFS = [
    {name: 'Loan Number', value: 'loan_id'},
    {name: 'Client Number', value: 'client__client_id'},
    {name: 'Client EC Number', value: 'client__ec_number'},
    {name: 'Client ID Number', value: 'client__identification_number'}
];

const ORDERARRAY = [
    {name: 'Start with oldest loan', value: 'loan_added_on'},
    {name: 'Start with newest loan', value: '-loan_added_on'},
];

function Filter({
    amountCol,
    setAmountCol,
    refCol,
    setRefCol,
    fieldName,
    setFieldName,
    order,
    setOrder,
    currencyId,
    setCurrencyId,
    currencies,
    cashAccountId,
    setCashAccountId,
    accounts,
    paymentDate,
    setPaymentDate,
    setFileName,
    onSubmit,
    loading,
    disableFetch,
    includeFP,
    setIncludeFP
    }) {
    const fetchStyles = disableFetch ? {pointerEvents: 'none', opacity: '0.7', width:"100%"} : {width:"100%"};
    return (

        <div className="search_background">
            <form>
                <div className="text-light">

                    <div className="disbursement_date_range" style={{border:"none"}}>

                        <div className="disbursement-report-fields">

                            <div style={{width:"100%"}}>
                                <label className="form-label">Excel Amount Column<span style={{color: 'red'}}>*</span></label>
                                <div className="reports-input-group search_input" style={{margin:"10px 0 0"}}>
                                    <input 
                                        className="reports-form-control" 
                                        type='text'
                                        value={amountCol}
                                        onChange={(e) => setAmountCol(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div style={{width:"100%"}}>
                                <label className="form-label">Excel Reference Column<span style={{color: 'red'}}>*</span></label>
                                <div className="reports-input-group search_input" style={{margin:"10px 0 0"}}>
                                    <input 
                                        className="reports-form-control" 
                                        type='text'
                                        value={refCol}
                                        onChange={(e) => setRefCol(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div style={{width:"100%"}}>
                                <label className="form-label">System Reference Column<span style={{color: 'red'}}>*</span></label>
                                <div className="reports-input-group search_input" style={{margin:"10px 0 0", border:"none"}}>
                                    <select className="report-custom-form-control currency" style={{width:"100%"}} value={fieldName} onChange={e => setFieldName(e.target.value)}>
                                        {SYSREFS.map(ref => <option key={ref.value} value={ref.value}>{ref.name}</option>)}
                                    </select>
                                </div>
                            </div>


                            {fieldName.includes('client') && <>
                            <div style={{width:"100%"}}>
                                <label className='form-label'>Start with<span style={{color: 'red'}}>*</span></label>
                                <div className="reports-input-group search_input" style={{margin:"10px 0 0", border:"none"}}>
                                    <select className="report-custom-form-control currency" style={{width:"100%"}} value={order} onChange={e => setOrder(e.target.value)}>
                                        {ORDERARRAY.map(order => <option key={order.value} value={order.value}>{order.name}</option>)}
                                    </select>
                                </div>
                            </div>
                            </>}
                            
                        </div>

                        <div className="disbursement-report-fields" style={{marginTop:"1.5rem"}}>

                            <div style={{width:"100%"}}>
                                <label className="form-label" style={{marginBottom:"0"}}>Select Currency<span style={{color: 'red'}}>*</span></label>
                                <div className="reports-input-group search_input" style={{margin:"10px 0 0", border:"none"}}>
                                    <select className="report-custom-form-control currency" style={{width:"100%"}} value={currencyId} onChange={e => setCurrencyId(e.target.value)}>
                                        <option value=''>Select Currency</option>
                                        {currencies.map(currency => <option key={currency.id} value={currency.id}>{currency.shortname}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div style={{width:"100%"}}>
                                <label className="form-label" style={{marginBottom:"0"}}>Channel<span style={{color: 'red'}}>*</span></label>
                                <div className="reports-input-group search_input" style={{margin:"10px 0 0", border:"none"}}>
                                    <select className="report-custom-form-control currency" style={{width:"100%"}} value={cashAccountId} onChange={e => setCashAccountId(e.target.value)}>
                                        <option value=''>Select Account</option>
                                        {accounts.filter(acc => acc.currency_id == currencyId).map(acc => <option key={acc.id} value={acc.id}>{acc.general_ledger_code} {acc.general_ledger_name}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div style={{width:"100%"}}>
                                <label className="form-label" style={{marginBottom:"0"}}>Payment Date<span style={{color: 'red'}}>*</span></label>
                                <div className="reports-input-group search_input" style={{margin:"10px 0 0"}}>
                                    <input 
                                        className="reports-form-control" 
                                        type='date'
                                        value={paymentDate}
                                        onKeyDown={(e) => e.preventDefault()}
                                        onChange={(e) => setPaymentDate(e.target.value)}
                                    />
                                </div>
                            </div>

                        </div>

                        <div style={{marginTop:"1.5rem"}}>
                            <label className="form-label">Select File<span style={{color: 'red'}}>*</span></label>
                            <div>
                                <FileUploader setFileName={setFileName}/>
                            </div>
                        </div>

                        <div className="disbursement-report-fields" style={{marginTop:"1.5rem"}}>

                            <div style={{width:"100%"}}>
                                <label className="form-label" style={{marginBottom:"0"}}>Include Fully and Over Paid loans<span style={{color: 'red'}}>*</span></label>
                                <div className="reports-input-group search_input" style={{margin:"10px 0 0", border:"none", width:"20%"}}>
                                    <select className="report-custom-form-control currency" style={{width:"100%"}} value={includeFP} onChange={e => setIncludeFP(e.target.value)}>
                                        <option value={false}>No</option>
                                        <option value={true}>Yes</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="form-label" style={{marginBottom:"0"}}></label>
                                <div className="reports-input-group search_input" style={{margin:"10px 0 0", width:"150px"}}>
                                {
                                    loading ?
                                        <button type='submit' className='btn btn-olive' style={{width:"100%"}}><i className='fa fa-spinner fa-spin'></i> Please wait..</button> :
                                        <button type='submit' className='btn btn-olive' onClick={onSubmit} style={fetchStyles} disabled={disableFetch}>Process file!</button>
                                }
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </form>
        </div>
    )
}

export default Filter;