import React from 'react';
import FileUploader from './FileUploader';
import { Fetcher } from '../../../common';
import { useCurrencies } from '../../../contexts/CurrenciesContext';

const SYSREFS = [
  {name: 'Loan Number', value: 'loan_id'},
  {name: 'Client Number', value: 'client__client_id'},
  {name: 'Client ID Number', value: 'client__identification_number__icontains'}
];

const ORDERARRAY = [
  {name: 'Start with oldest loan', value: 'loan_added_on'},
  {name: 'Start with newest loan', value: '-loan_added_on'},
];

function Filter({params, setParams, onSubmit, disableFetch, loading}) {
  const fetchStyles = disableFetch ? {pointerEvents: 'none', opacity: '0.7', width:'100%'} : {width:'100%'};
  const {currencies} = useCurrencies();

  const handleChange = (evt) => {
    evt.preventDefault();
    const name = evt.target.name;
    const value = evt.target.value;
    setParams(curr => ({...curr, [name]: value}));
  }

  return (
    <Fetcher urls={['/acc-api/cash-accounts-list/']}>
      {({data}) => (
        <div className='search_background'>
          <form onSubmit={onSubmit}>
            <div className='text-light'>
              <div className='disbursement_date_range' style={{border:'none'}}>
                <div className='disbursement-report-fields'>
                  <div style={{width:'100%'}}>
                    <label className='form-label'>Excel Amount Column<span style={{color: 'red'}}>*</span></label>
                    <div className='reports-input-group search_input' style={{margin:'10px 0 0'}}>
                      <input className='reports-form-control' type='text' name='amount_col' value={params.amount_col} onChange={handleChange} required/>
                    </div>
                  </div>
                  <div style={{width:'100%'}}>
                    <label className='form-label'>Excel Reference Column<span style={{color: 'red'}}>*</span></label>
                    <div className='reports-input-group search_input' style={{margin:'10px 0 0'}}>
                      <input className='reports-form-control' type='text' name='ref_col' value={params.ref_col} onChange={handleChange} required/>
                    </div>
                  </div>
                  <div style={{width:'100%'}}>
                    <label className='form-label'>System Reference Column<span style={{color: 'red'}}>*</span></label>
                    <div className='reports-input-group search_input' style={{margin:'10px 0 0', border:'none'}}>
                      <select className='report-custom-form-control currency' style={{width:'100%'}} name='field_name' value={params.field_name} onChange={handleChange}>
                        {SYSREFS.map(ref => <option key={ref.value} value={ref.value}>{ref.name}</option>)}
                      </select>
                    </div>
                  </div>
                  {params.field_name.includes('client') ?
                  <>
                    <div style={{width:'100%'}}>
                      <label className='form-label'>Start with<span style={{color: 'red'}}>*</span></label>
                      <div className='reports-input-group search_input' style={{margin:'10px 0 0', border:'none'}}>
                        <select className='report-custom-form-control currency' style={{width:'100%'}} name='order' value={params.order} onChange={handleChange}>
                          {ORDERARRAY.map(order => <option key={order.value} value={order.value}>{order.name}</option>)}
                        </select>
                      </div>
                    </div>
                  </> : null}
                </div>

                <div className='disbursement-report-fields' style={{marginTop:'1.5rem'}}>
                  <div style={{width:'100%'}}>
                    <label className='form-label' style={{marginBottom:'0'}}>Select Currency<span style={{color: 'red'}}>*</span></label>
                    <div className='reports-input-group search_input' style={{margin:'10px 0 0', border:'none'}}>
                      <select className='report-custom-form-control currency' style={{width:'100%'}} name='currencyId' value={params.currencyId} onChange={handleChange} required>
                        <option value=''>Select Currency</option>
                        {currencies.map(currency => <option key={currency.id} value={currency.id}>{currency.shortname}</option>)}
                      </select>
                    </div>
                  </div>
                  <div style={{width:'100%'}}>
                    <label className='form-label' style={{marginBottom:'0'}}>Channel<span style={{color: 'red'}}>*</span></label>
                    <div className='reports-input-group search_input' style={{margin:'10px 0 0', border:'none'}}>
                      <select className='report-custom-form-control currency' style={{width:'100%'}} name='cash_account_id' value={params.cash_account_id} onChange={handleChange} required>
                        <option value=''>Select Account</option>
                        {data[0].accounts.filter(acc => acc.currency_id == params.currencyId).map(acc => (
                          <option key={acc.id} value={acc.id}>
                            {acc.general_ledger_code} {acc.general_ledger_name}- {acc.branch}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div style={{width:'100%'}}>
                    <label className='form-label' style={{marginBottom:'0'}}>Payment Date<span style={{color: 'red'}}>*</span></label>
                    <div className='reports-input-group search_input' style={{margin:'10px 0 0'}}>
                      <input className='reports-form-control' type='date' name='payment_date' value={params.payment_date} onKeyDown={(e) => e.preventDefault()} onChange={handleChange} required/>
                    </div>
                  </div>
                </div>

                <div style={{marginTop:'1.5rem'}}>
                  <label className='form-label'>Select File<span style={{color: 'red'}}>*</span></label>
                  <div>
                    <FileUploader setFileName={(fileName) => setParams(curr => ({...curr, file_name: fileName}))}/>
                    <input className='file-uploader-input' type='text' name='file_name' value={params.file_name} onKeyDown={(e) => e.preventDefault()} onChange={handleChange} required/>
                  </div>
                </div>
                
                <div className='disbursement-report-fields' style={{marginTop:'1.5rem'}}>
                  <div style={{width:'100%'}}>
                    <label className='form-label' style={{marginBottom:'0'}}>Include Fully and Over Paid loans<span style={{color: 'red'}}>*</span></label>
                    <div className='reports-input-group search_input' style={{margin:'10px 0 0', border:'none', width:'20%'}}>
                      <select className='report-custom-form-control currency' style={{width:'100%'}} name='include_fp_op' value={params.include_fp_op} onChange={handleChange}>
                        <option value={false}>No</option>
                        <option value={true}>Yes</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className='form-label' style={{marginBottom:'0'}}></label>
                    <div className='reports-input-group search_input' style={{margin:'10px 0 0', width:'150px'}}>
                      {loading ?
                      <button type='submit' className='btn btn-olive' style={{width:'100%'}}><i className='fa fa-spinner fa-spin'></i> Please wait..</button> :
                      <button type='submit' className='btn btn-olive' style={fetchStyles} disabled={disableFetch}>Process file!</button>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </Fetcher>
  )
}

export default Filter;
