// import React from 'react';

// function DateRange(props) {
//   const disableFetch = props.rDate === '' || props.accountId === '';

//   return (
//     <div className="col-12 font-12 balance_sheet_date_range text-light" style={{border:"none", padding:"0"}}>
//       <form onSubmit={props.onSubmit}>
//         <div className="row" style={{display:"flex", columnGap:"1px", alignItems:"center", marginTop:"0"}}>
//           <div className="input-group" style={{margin:"0"}}>
//               <i className="uil uil-calendar-alt"></i>
//               <input
//                 type='date'
//                 className='form-control input-background'
//                 max={props.currentDate}
//                 value={props.rDate}
//                 onKeyDown={(e) => e.preventDefault()}
//                 onChange={(e) => props.setRDate(e.target.value)}
//                 style={{width:"400px", height:"auto"}}
//               />
//           </div>
//           <div style={{width:"400px", margin:"10px"}}>
//             <select className='report-custom-form-control currency' style={{width:"100%"}} value={props.accountId} onChange={e => props.setAccountId(e.target.value)}>
//               <option value={''}></option>
//               {props.accounts.map(account => {
//                 return (
//                   <option key={account.id} value={account.id}>
//                   {account.currency} {account.label} {account.branch}
//                   </option>
//                 )
//               })}
//             </select>
//           </div>
//           <div style={{display:"flex", columnGap:"10px", margin:"10px"}}>
//             {props.loading ? <button type='submit' className='btn btn-olive' style={{pointerEvents: 'none', opacity: '0.7'}}>
//               Please wait..
//             </button> :
//             <button type='submit' className='btn btn-olive' style={disableFetch ? {pointerEvents: 'none', opacity: '0.7'} : {}} disabled={disableFetch}>
//               Apply_filters_!
//             </button>}
//           </div>
//         </div>
//       </form>
//     </div>
//   )
// }

// export default DateRange;

import React from 'react';
import { Form, Formik } from 'formik';
import {
  NonFieldErrors,
} from '../../../common';
import {
    CustomDatePickerFilter,
    CustomSelectFilter,
    SubmitButtonFilter
} from '../../../common';
import axios from 'axios';
import { removeEmptyValues } from '../../../utils/utils';

const DateRange = ({setStatement, setParams, setIntValues, setReconciled, accounts}) => {
  const initialValues = {
    account_id: '',
    report_date: '',
  };

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
      const response = await axios.get('/acc-api/cash-report/', {params: params});
      setStatement(response.data);
      setReconciled(response.data.reconciled);
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
                            <div className="row-payments-container" style={{width:"45%"}}>
                                <CustomDatePickerFilter label='Report Date' name='report_date' setFieldValue={setFieldValue} required/>
                            </div>
                            <div className="row-payments-container" style={{width:"45%"}}>
                                <CustomSelectFilter label='Account' name='account_id' required>
                                    <option value=''>------</option>
                                    {accounts.accounts.map(account => <option key={account.id} value={account.id}>{account.currency} {account.label} {account.branch}</option>)}
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

export default DateRange;

