// import React, { useEffect, useState } from 'react';
// import { makeRequest } from '../../../../utils/utils';
// import Select from 'react-select';

// const DateRange = (props) => {
//     const {
//         accType,
//         setAccType,
//         onSubmit, 
//         setMainAccounts, 
//         branches,
//         searching,
//         setBranchIds
//     } = props;

//     const style = {
//         control: base => ({
//           ...base,
//           border: '1px solid #dee2e6',
//           boxShadow: "none",
//           '&:hover':'1px solid #dee2e6',
//         })
//     };

//     const [optionSelected, setOptionSelected] = useState([]);
//     const selectorBranches = [...branches.map(result => ({...result, label: result.name, value:result.id}))];
  
//     const handleMultiSelect = selected => {
//       setOptionSelected(selected);
//       setBranchIds(selected.map(branch => branch.id));
//     }
  
//     return (

//         <div className="font-13 text-light">

//             <form onSubmit={onSubmit}>
//                 <div className="view_search_container online__applications font-13" style={{border:"none", padding:"0"}}>
//                     <div className="row-payments-container" style={{width:"72%"}}>
//                         <Select
//                             isMulti
//                             name='colors'
//                             options={[props.allOption, ...selectorBranches]}
//                             value={optionSelected}
//                             classNamePrefix='select'
//                             className='basic-multi-select'
//                             placeholder='Select Branches'
//                             onChange={selected => {
//                                 if (selected !== null && selected.length > 0 && selected[selected.length - 1].value === props.allOption.value) {
//                                 return handleMultiSelect(selectorBranches);
//                                 }
//                                 handleMultiSelect(selected);
//                             }}
//                             styles={style}
//                         />
//                     </div>
//                     <div className="row-payments-container" style={{width:"15%"}}>
//                         <select className='custom-select-form row-form' style={{margin:"0"}} onChange={(e) => setAccType(e.target.value)} value={accType}>
//                             <option value={''}>Select Account Type</option>
//                             <option value={'ASSET'}>ASSET</option>
//                             <option value={'LIABILITY'}>LIABILITY</option>
//                             <option value={'EQUITY'}>EQUITY</option>
//                             <option value={'INCOME'}>INCOME</option>
//                             <option value={'EXPENSE'}>EXPENSE</option>
//                         </select>
//                     </div>
//                     <div style={{display:"flex", flexDirection:"column", width:"10%"}}>
//                         {searching ?
//                             <button type="submit" className="btn btn-olive" style={{opacity:"0.7", cursor:"none"}}>Searching</button>:
//                             <button type="submit" className="btn btn-olive" >Apply_Filters_!</button>
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


import React from 'react';
import { Form, Formik } from 'formik';
import {
  NonFieldErrors,
} from '../../../../common';
import {
    CustomDatePickerFilter,
    CustomSelectFilter,
    CustomMultiSelectFilter,
    SubmitButtonFilter
} from '../../../../common';
import { useBranches } from '../../../../contexts/BranchesContext';
import axios from 'axios';
import { removeEmptyValues } from '../../../../utils/utils';

const DateRange = ({setMainAccounts, setParams}) => {
  const initialValues = {
    branch_ids: [],
    page_num: 1,
    acc_type: '',
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
      setParams(params);
      const response = await axios.get('/acc-api/main-accounts-list/', {params: params});
      setMainAccounts(response.data);
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
                            <div className="row-payments-container" style={{width:"80%"}}>
                                <CustomMultiSelectFilter
                                    label='Branches'
                                    name='branch_ids'
                                    options={branches.map(br => ({label: br.name, value:br.id}))}
                                    setFieldValue={setFieldValue}
                                    required
                                />
                            </div>
                            <div className="row-payments-container" style={{width:"10%"}}>
                                <CustomSelectFilter label='Account Type' name='acc_type' required>
                                    <option value=''>------</option>
                                    <option value={'ASSET'}>ASSET</option>
                                    <option value={'LIABILITY'}>LIABILITY</option>
                                    <option value={'EQUITY'}>EQUITY</option>
                                    <option value={'INCOME'}>INCOME</option>
                                    <option value={'EXPENSE'}>EXPENSE</option>
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

