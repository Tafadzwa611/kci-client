// import React, { useEffect, useState } from 'react';
// import Select from 'react-select';
// import { makeRequest } from '../../../utils/utils';

// const DateRange = (props) => {
//     const [optionSelected, setOptionSelected] = useState([]);
//     const [branches, setBranches] = useState([]);
//     const {currencies, currencyId, setCurrencyId, minDate, maxDate, setMinDate, loading, accounts, accountId, setAccountId, 
//         setMaxDate, onSubmit, disableFetch, setJournals, staff, staffId, setStaffId, updateSelectedBranchesId, details} = props;
//     const fetchStyles = disableFetch ? {pointerEvents: 'none', opacity: '0.7', margin:'0'} : {margin:'0', cursor:'pointer'};

//     const style = {
//         control: base => ({
//           ...base,
//           border: '1px solid #dee2e6',
//           boxShadow: "none",
//           '&:hover':'1px solid #dee2e6',
//         })
//     };
  
//     useEffect(() => {
//         fetchBranches();
//     }, []);
  
//     const handleMultiSelect = selected => {
//         setOptionSelected(selected);
//         setJournals([]);
//         updateSelectedBranchesId(selected.map(branch => branch.id));
//     }
  
//     const changeCurrency = (evt) => {
//         setCurrencyId(evt.target.value);
//     }

//     const changeStaff = (evt) => {
//         setStaffId(evt.target.value);
//     }

//     const changeAccount = (evt) => {
//         setAccountId(evt.target.value);
//     }
    
  
//     async function fetchBranches() {
//         try {
//             const response = await makeRequest.get('/usersapi/get-branches/', {timeout: 8000});
//             if (response.ok) {
//                 const data = await response.json();
//                 return setBranches([...data.results.map(result => ({...result, label: result.name, value:result.id}))]);
//             }else {
//                 const error = await response.json();
//                 console.log(error);
//             }
//         }catch(error) {
//             console.log(error);
//         }
//     }

//     return (
//         <div className="font-13 text-light">

//             <form onSubmit={onSubmit}>
//                 <div className="view_search_container online__applications font-13" style={{border:"none", padding:"0"}}>
//                     <div className="row-payments-container" style={{width:"22%"}}>
//                         <label className="form-label row-label">From</label>
//                         <div className="input-group" style={{margin:"0"}}>
//                             <i className="uil uil-calendar-alt"></i>
//                             <input
//                                 type='date'
//                                 value={minDate}
//                                 onKeyDown={(e) => e.preventDefault()}
//                                 onChange={(e) => {
//                                     setMinDate(e.target.value);
//                                     setJournals([]);
//                                 }}
//                                 className='custom-select-form row-form input-background'
//                                 disabled={details ? "disabled": ""}
//                             />
//                         </div>
//                     </div>
//                     <div className="row-payments-container" style={{width:"22%"}}>
//                         <label className="form-label row-label">To</label>
//                         <div className="input-group" style={{margin:"0"}}>
//                             <i className="uil uil-calendar-alt"></i>
//                             <input
//                                 type='date'
//                                 value={maxDate}
//                                 onKeyDown={(e) => e.preventDefault()}
//                                 onChange={(e) => {
//                                     setMaxDate(e.target.value);
//                                     setJournals([]);
//                                 }}
//                                 className='custom-select-form row-form input-background'
//                                 disabled={details ? "disabled": ""}
//                             />
//                         </div>
//                     </div>
//                     <div className="row-payments-container" style={{width:"22%"}}>
//                         <label className="row-payments-container">Select Account</label>
//                         <Select
//                             name='accounts'
//                             options={accounts.filter(acc => acc.currency == currencyId && optionSelected.some(br => br.name == acc.branch))}
//                             classNamePrefix='select'
//                             className='basic-single'
//                             isClearable={true}
//                             placeholder='Select Account'
//                             onChange={selected => {
//                                 if (selected == null) {
//                                     setAccountId('');
//                                 }else {
//                                     setAccountId(selected.value);
//                                 }
//                             }}
//                             styles={style}
//                             isDisabled={details ? true: false}
//                         />
//                     </div>

//                     <div className="row-payments-container" style={{width:"22%"}}>
//                         <label className="form-label row-label">Select User</label>
//                         <select className='custom-select-form row-form' style={{margin:"0"}} value={staffId} onChange={changeStaff}>
//                             <option value=''>Select User</option>
//                             {staff.map(s => {
//                                 return <option key={s.id} value={s.id}>{`${s.first_name} ${s.last_name}`}</option>
//                             })}
//                         </select>
//                     </div>
//                 </div>

//                 <div className="view_search_container online__applications font-13" style={{border:"none", padding:"0", marginTop:"1rem"}}>
//                     <div className="row-payments-container" style={{width:"80%"}}>
//                         <Select
//                             isMulti
//                             name='colors'
//                             options={[props.allOption, ...branches]}
//                             value={optionSelected}
//                             classNamePrefix='select'
//                             className='basic-multi-select'
//                             placeholder='Select Branches'
//                             onChange={selected => {
//                                 if (selected !== null && selected.length > 0 && selected[selected.length - 1].value === props.allOption.value) {
//                                 return handleMultiSelect(branches);
//                                 }
//                                 handleMultiSelect(selected);
//                             }}
//                             styles={style}
//                             isDisabled={details ? true: false}
//                         />
//                     </div>
//                     <div className="row-payments-container" style={{width:"10%"}}>
//                         <select className='custom-select-form row-form' style={{margin:"0"}} value={currencyId} onChange={changeCurrency} disabled={details ? "disabled": ""}>
//                             {currencies.map(currency => {
//                                 return <option key={currency.id} value={currency.id}>{currency.shortname}</option>
//                             })}
//                         </select>
//                     </div>
//                     <div style={{display:"flex", flexDirection:"column"}}>
//                         {details ? 
//                             <button type="submit" className="btn btn-olive" style={{pointerEvents: 'none', opacity: '0.7', margin:'0'}} disabled="disabled">Apply_filter_!</button>:
//                             <button type="submit" className="btn btn-olive" style={fetchStyles} disabled={disableFetch}>Apply_filter_!</button>
//                         }
//                     </div>
//                 </div>
//             </form>

//         </div>
//     );
// }

// DateRange.defaultProps = {
//     allOption: {
//         label: 'Select all',
//         value: '*'
//     }
// };

// export default DateRange;


import React, {useState} from 'react';
import { Form, Formik } from 'formik';
import {
  NonFieldErrors,
} from '../../../common';
import {
    CustomInputFilter,
    CustomDatePickerFilter,
    CustomSelectFilter,
    CustomMultiSelectFilter,
    SubmitButtonFilter
} from '../../../common';
import { useCurrencies } from '../../../contexts/CurrenciesContext';
import { useBranches } from '../../../contexts/BranchesContext';
import axios from 'axios';
import { removeEmptyValues } from '../../../utils/utils';

const Filter = ({setJournals, setParams, setIntValues, accounts, staff, setAccountId, setOpenBal}) => {
    const initialValues = {
        branch_ids: [],
        page_num: 1,
        min_date: '',
        max_date: '',
        order: '',
        account_id: '',
        user_id: '',
    };
    const {currencies} = useCurrencies();
    const {branches} = useBranches();

    const [currencyId, seCurrencyId] = useState('');
    const onChange = (setFieldValue, newValue) => {
        setFieldValue('currency_id', newValue);
        seCurrencyId(newValue)
    }

    const onChangeAccount = (setFieldValue, newValue) => {
        setFieldValue('account_id', newValue);
        setAccountId(newValue)
    }

    const newaccounts = accounts.filter(acc => acc.currency == currencyId);

    const getParams = (values) => {
        const params = new URLSearchParams();
        for (const [key, value] of Object.entries(values)) {
        if (Array.isArray(value)) {
            value.forEach(el => params.append(key, el));
        }else {
            params.append(key, value);
        }
        }
        return params
    }

    const onSubmit = async (values, actions) => {
        try {
            const data = removeEmptyValues(values);
            const params = getParams(data);
            setParams(params);
            setIntValues(values);
            const response = await axios.get('/acc-api/journals-list/', {params: params});
            setJournals(response.data.journals);
            setOpenBal(response.data.account_opening_balance);
        } catch (error) {
            if (error.message === "Network Error") {
                actions.setErrors({responseStatus: "Network Error"});
            } else if (error.response.status >= 400 && error.response.status < 500) {
                actions.setErrors({responseStatus: error.response.status, ...error.response.data});
            } else {
                actions.setErrors({responseStatus: error.response.status});
            }
        }
    }

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({isSubmitting, setFieldValue, errors}) => (
                <div className="search_background">
                    <div className="row-containers" style={{border:"none"}}>
                        <Form>
                            <NonFieldErrors errors={errors}>
                                <div className="row row-payments row-loans" style={{marginTop:"1rem"}}>
                                    <div className="row-payments-container" style={{width:"19%"}}>
                                    <CustomSelectFilter 
                                                label='Currency' 
                                            name='currency_id' 
                                            onChange={evt => onChange(setFieldValue, evt.target.value)}
                                            required
                                        >
                                            <option value=''>------</option>
                                            {currencies.map(currency => <option key={currency.id} value={currency.id}>{currency.shortname}</option>)}
                                        </CustomSelectFilter>
                                    </div>
                                    <div className="row-payments-container" style={{width:"19%"}}>
                                        <CustomDatePickerFilter label='Min Date' name='min_date' setFieldValue={setFieldValue} required/>
                                    </div>
                                    <div className="row-payments-container" style={{width:"19%"}}>
                                        <CustomDatePickerFilter label='Max Date' name='max_date' setFieldValue={setFieldValue} required/>
                                    </div>
                                    <div className="row-payments-container" style={{width:"19%"}}>
                                        <CustomSelectFilter 
                                            label='Account' 
                                            name='account_id'
                                            onChange={evt => onChangeAccount(setFieldValue, evt.target.value)}
                                            required
                                        >
                                            <option value=''>------</option>
                                            {newaccounts.map(acc => <option key={acc.id} value={acc.id}>{acc.general_ledger_code} {acc.general_ledger_name}</option>)}
                                        </CustomSelectFilter>
                                    </div>
                                    <div className="row-payments-container" style={{width:"19%"}}>
                                        <CustomSelectFilter label='User' name='user_id'>
                                            <option value=''>------</option>
                                            {staff.map(mbr => <option key={mbr.id} value={mbr.id}>{mbr.first_name} {mbr.last_name}</option>)}
                                        </CustomSelectFilter>
                                    </div>
                                </div>
                                <div style={{marginTop:"1rem", display:"flex", justifyContent:"space-between"}}>
                                    <div style={{width:"80%"}}>
                                        <CustomMultiSelectFilter
                                            label='Branches'
                                            name='branch_ids'
                                            options={branches.map(br => ({label: br.name, value:br.id}))}
                                            setFieldValue={setFieldValue}
                                            required
                                        />
                                    </div>
                                    <div className="row-payments-container" style={{width:"10%"}}>
                                        <CustomSelectFilter label='Order' name='order' required>
                                            <option value=''>------</option>
                                            <option value={'date_created'}>Show oldest first</option>
                                            <option value={'-date_created'}>Show newest first</option>
                                        </CustomSelectFilter>
                                    </div>
                                    <SubmitButtonFilter isSubmitting={isSubmitting}/>
                                </div>
                            </NonFieldErrors>
                        </Form>
                    </div>
                </div>
            )}
        </Formik>
    );
}

export default Filter;

