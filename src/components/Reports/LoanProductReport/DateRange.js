// import React from 'react';
// import Select from 'react-select';

// const DateRange = (props) => {
//     const [optionSelected, setOptionSelected] = React.useState([]);
//     const {currencies, currencyId, setCurrencyId, minDate, maxDate, setMinDate, options, setMaxDate, onSubmit, disableFetch, updateSelected, setSelectedBranches} = props;
//     const fetchStyles = disableFetch ? {pointerEvents: 'none', opacity: '0.7'} : {};
  
//     const handleSelect = selected => {
//       setOptionSelected(selected);
//       setSelectedBranches(selected);
//       updateSelected(selected.map(branch => branch.id));
//     }
  
//     const changeCurrency = (evt) => {
//       setCurrencyId(evt.target.value);
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
//         <div className="font-13 text-light">

//             <div className="disbursement_date_range" style={{padding:"0", border:"none"}}>
//                 <form onSubmit={onSubmit}>
//                     <div className="disbursement-report-fields">
//                         <div style={{width:"100%"}}>
//                             <label className="form-label">Min Date</label>
//                             <div className="reports-input-group" style={{margin:"10px 0 0"}}>
//                                 <i className="uil uil-calendar-alt"></i>
//                                 <input 
//                                     type='date' 
//                                     value={minDate} 
//                                     onKeyDown={(e) => e.preventDefault()} 
//                                     onChange={(e) => setMinDate(e.target.value)} 
//                                     className='reports-form-control'
//                                 />
//                             </div>
//                         </div>
//                         <div style={{width:"100%"}}>
//                             <label className="form-label">Max Date</label>
//                             <div className="reports-input-group" style={{margin:"10px 0 0"}}>
//                                 <i className="uil uil-calendar-alt"></i>
//                                 <input 
//                                     type='date' 
//                                     value={maxDate} 
//                                     onKeyDown={(e) => e.preventDefault()} 
//                                     onChange={(e) => setMaxDate(e.target.value)} 
//                                     className='reports-form-control'
//                                 />
//                             </div>
//                         </div>
//                     </div>

//                     <div style={{marginTop:"1rem"}}>
//                         <div className="disbursement-report-fields">
//                             <div style={{width:"85%"}}>
//                             <Select
//                                 isMulti
//                                 name='colors'
//                                 options={[props.allOption, ...options]}
//                                 value={optionSelected}
//                                 classNamePrefix='select'
//                                 className='basic-multi-select'
//                                 placeholder='Select loan products'
//                                 onChange={selected => {
//                                     if (selected !== null && selected.length > 0 && selected[selected.length - 1].value === props.allOption.value) {
//                                     return handleSelect(options);
//                                     }
//                                     handleSelect(selected);
//                                 }}
//                                 styles={style}
//                             />
//                             </div>
//                             <button type="submit" className="btn btn-olive" style={fetchStyles} disabled={disableFetch}>Apply_Filter_!</button>
//                         </div>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     )
// }

// DateRange.defaultProps = {
//     allOption: {
//       label: 'Select all',
//       value: '*'
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
    CustomMultiSelectFilter,
    SubmitButtonFilter
} from '../../../common';
import { useCurrencies } from '../../../contexts/CurrenciesContext';
import { useBranches } from '../../../contexts/BranchesContext';
import axios from 'axios';
import { removeEmptyValues } from '../../../utils/utils';

const DateRange = ({setLoanProductsReportData, setParams, setIntValues, products}) => {
  const initialValues = {
    loan_product_ids: [],
    page_num: 1,
    min_date: '',
    max_date: '',
  };
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
      console.log(params)
      setParams(params);
      setIntValues(values);
      const response = await axios.get('/reportsapi/loan-product-report/', {params: params});
      setLoanProductsReportData(response.data);
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
                            <div className="row-payments-container" style={{width:"49%"}}>
                                <CustomDatePickerFilter label='Min Date' name='min_date' setFieldValue={setFieldValue}/>
                            </div>
                            <div className="row-payments-container" style={{width:"49%"}}>
                                <CustomDatePickerFilter label='Max Date' name='max_date' setFieldValue={setFieldValue}/>
                            </div>
                        </div>
                        <div style={{marginTop:"1rem", display:"flex", justifyContent:"space-between"}}>
                            <div style={{width:"90%"}}>
                                <CustomMultiSelectFilter
                                    label='Loan Products'
                                    name='loan_product_ids'
                                    options={products.map(br => ({label: br.name, value:br.id}))}
                                    setFieldValue={setFieldValue}
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

export default DateRange;

