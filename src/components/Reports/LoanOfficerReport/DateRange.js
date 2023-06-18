// import React, { useEffect, useState } from 'react';
// import Select from 'react-select';
// import { makeRequest } from '../../../utils/utils';

// const DateRange = (props) => {
//     const [optionSelected, setOptionSelected] = useState([]);
//     const [branches, setBranches] = useState([]);
//     const {currencies, currencyId, setCurrencyId, minDate, maxDate, setMinDate, 
//         setMaxDate, onSubmit, disableFetch, updateSelectedBranchesId, setSelectedBranches} = props;
//     const fetchStyles = disableFetch ? {pointerEvents: 'none', opacity: '0.7'} : {};
  
//     useEffect(() => {
//         fetchBranches();
//     }, []);
  
//     const handleMultiSelect = selected => {
//         setOptionSelected(selected);
//         setSelectedBranches(selected);
//         updateSelectedBranchesId(selected.map(branch => branch.id));
//     }
  
//     const changeCurrency = (evt) => {
//         setCurrencyId(evt.target.value);
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

//     const style = {
//         control: base => ({
//             ...base,
//             border: '1px solid #dee2e6',
//             boxShadow: "none",
//             '&:hover':'1px solid #dee2e6',
//         })
//     };

//     return (
//         <form onSubmit={onSubmit}>
//             <div className="view_search_container online__applications font-13" style={{padding:"0", border:"none"}}>
//                 <div className="row-payments-container" style={{width:"30%"}}>
//                     <label className="form-label row-label">Start Date</label>
//                     <div className="input-group" style={{margin:"10px 0 0"}}>
//                         <i className="uil uil-calendar-alt"></i>
//                         <input
//                             type='date'
//                             value={minDate}
//                             onKeyDown={(e) => e.preventDefault()}
//                             onChange={(e) => setMinDate(e.target.value)}
//                             className='custom-select-form row-form input-background'
//                         />
//                     </div>
//                 </div>
//                 <div className="row-payments-container" style={{width:"30%"}}>
//                     <label className="form-label row-label">End Date</label>
//                     <div className="input-group" style={{margin:"10px 0 0"}}>
//                         <i className="uil uil-calendar-alt"></i>
//                         <input
//                             type='date'
//                             value={maxDate}
//                             onKeyDown={(e) => e.preventDefault()}
//                             onChange={(e) => setMaxDate(e.target.value)}
//                             className='custom-select-form row-form input-background'
//                         />
//                     </div>
//                 </div>
//                 <div className="row-payments-container" style={{width:"30%"}}>
//                     <label className="form-label row-label">Select Currency</label>
//                     <select className='custom-select-form row-form' value={currencyId} onChange={changeCurrency} style={{margin:"10px 0 0"}}>
//                         {currencies.map(currency => {
//                             return <option key={currency.id} value={currency.id}>{currency.shortname}</option>
//                         })}
//                     </select>
//                 </div>
//             </div>

//             <div className="view_search_container online__applications font-13" style={{padding:"0", border:"none", marginTop:"1rem"}}>
//                 <div className="row-payments-container" style={{width:"85%"}}>
//                     <Select
//                         isMulti
//                         name='colors'
//                         options={[props.allOption, ...branches]}
//                         value={optionSelected}
//                         classNamePrefix='select'
//                         className='basic-multi-select'
//                         placeholder='Select Branches'
//                         onChange={selected => {
//                             if (selected !== null && selected.length > 0 && selected[selected.length - 1].value === props.allOption.value) {
//                             return handleMultiSelect(branches);
//                             }
//                             handleMultiSelect(selected);
//                         }}
//                         styles={style}
//                     />
//                 </div>
//                 <div style={{display:"flex", flexDirection:"column"}}>
//                     <button className="btn btn-olive" style={{margin:"10px 0 0"}} style={fetchStyles} disabled={disableFetch}>Apply_filters_!</button>
//                 </div>
//             </div>
//         </form>
//     )
// }

// DateRange.defaultProps = {
//     allOption: {
//         label: 'Select all',
//         value: '*'
//     }
// };

// export default DateRange;


import React from 'react';
import { Form, Formik } from 'formik';
import {
  NonFieldErrors,
} from '../../../common';
import {
    CustomDatePickerFilter,
    CustomSelectFilter,
    CustomMultiSelectFilter,
    SubmitButtonFilter
} from '../../../common';
import { useCurrencies } from '../../../contexts/CurrenciesContext';
import { useBranches } from '../../../contexts/BranchesContext';
import axios from 'axios';
import { removeEmptyValues } from '../../../utils/utils';

const Filter = ({setReport, setParams, setIntValues, setCurrency}) => {
  const initialValues = {
    branch_ids: [],
    page_num: 1,
    min_date: '',
    max_date: '',
  };
  const {currencies} = useCurrencies();
  const {branches} = useBranches();

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
      const response = await axios.get('/reportsapi/loan-officer-report/', {params: params});
      setReport(response.data.report);
      setCurrency(response.data.currency)
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
                            <div className="row-payments-container" style={{width:"32%"}}>
                                <CustomDatePickerFilter label='Start Date' name='min_date' setFieldValue={setFieldValue} required/>
                            </div>
                            <div className="row-payments-container" style={{width:"32%"}}>
                                <CustomDatePickerFilter label='End Date' name='max_date' setFieldValue={setFieldValue} required/>
                            </div>
                            <div className="row-payments-container" style={{width:"32%"}}>
                                <CustomSelectFilter label='Currency' name='currency_id' required>
                                    <option value=''>------</option>
                                    {currencies.map(currency => <option key={currency.id} value={currency.id}>{currency.fullname}</option>)}
                                </CustomSelectFilter>
                            </div>
                        </div>
                        <div style={{marginTop:"1rem", display:"flex", justifyContent:"space-between"}}>
                            <div style={{width:"90%"}}>
                                <CustomMultiSelectFilter
                                    label='Branches'
                                    name='branch_ids'
                                    options={branches.map(br => ({label: br.name, value:br.id}))}
                                    setFieldValue={setFieldValue}
                                    required
                                />
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

