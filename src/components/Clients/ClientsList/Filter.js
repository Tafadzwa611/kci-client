import React from 'react';
import { useBranches } from '../../../contexts/BranchesContext';
import { Form, Formik } from 'formik';
import {
  CustomMultiSelectFilter,
  CustomDatePickerFilter,
  CustomSelectFilter,
  SubmitButtonFilter,
  CustomInputFilter,
  NonFieldErrors
} from '../../../common';
import { removeEmptyValues, getParams } from '../../../utils/utils';
import axios from 'axios';

const Filter = ({ setClientsData, clientTypes, setParams }) => {
  const initialValues = {
    page_num: 1,
    branch_ids: [],
    search_str: '',
    min_reg_date: '',
    max_reg_date: '',
    min_dob: '',
    max_dob: '',
    client_type_id: '',
    gender: '',
    status: '',
  };
  const {branches} = useBranches();

  const onSubmit = async (values, actions) => {
    try {
      const data = removeEmptyValues(values);
      const params = getParams(data);
      setParams(params);
      const response = await axios.get('/clientsapi/clients/', {params: params});
      setClientsData(response.data);
    } catch (error) {
      console.log(error);
      if (error.message === 'Network Error') {
        actions.setErrors({responseStatus: 'Network Error'});
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
        <div className='search_background'>
          <div className='row-containers' style={{border:'none'}}>
            <Form>
              <NonFieldErrors errors={errors}>
                <div style={{display:'flex', justifyContent:'space-between'}}>
                  <div className='row-payments-container' style={{width:'24%'}}>
                    <CustomDatePickerFilter label='Min Reg Date' name='min_reg_date' setFieldValue={setFieldValue}/>
                  </div>
                  <div className='row-payments-container' style={{width:'24%'}}>
                    <CustomDatePickerFilter label='Max Reg Date' name='max_reg_date' setFieldValue={setFieldValue}/>
                  </div>
                  <div className='row-payments-container' style={{width:'24%'}}>
                    <CustomDatePickerFilter label='Min Date Of Birth' name='min_dob' setFieldValue={setFieldValue}/>
                  </div>
                  <div className='row-payments-container' style={{width:'24%'}}>
                    <CustomDatePickerFilter label='Max Date Of Birth' name='max_dob' setFieldValue={setFieldValue}/>
                  </div>
                </div>
                <div className='row row-payments row-loans' style={{marginTop:'1rem'}}>
                  <div className='row-payments-container' style={{width:'24%'}}>
                    <CustomSelectFilter label='Client Type' name='client_type_id'>
                      <option value=''>------</option>
                      {clientTypes.map(ct => (<option key={ct.id} value={ct.id}>{ct.name}</option>))}
                    </CustomSelectFilter>
                  </div>
                  <div className='row-payments-container' style={{width:'24%'}}>
                    <CustomInputFilter label='Search Client' name='search_str'/>
                  </div>
                  <div className='row-payments-container' style={{width:'24%'}}>
                    <CustomSelectFilter label='Gender' name='gender'>
                      <option value=''>------</option>
                      <option value='MALE'>Male</option>
                      <option value='FEMALE'>Female</option>
                    </CustomSelectFilter>
                  </div>
                  <div className='row-payments-container' style={{width:'24%'}}>
                    <CustomSelectFilter label='Status' name='status'>
                      <option value=''>------</option>
                      <option value='Pending Approval'>Pending Approval</option>
                      <option value='Inactive'>Inactive</option>
                      <option value='Active'>Active</option>
                      <option value='Rejected'>Rejected</option>
                      <option value='Blacklisted'>Blacklisted</option>
                      <option value='Left'>Left</option>
                    </CustomSelectFilter>
                  </div>
                </div>
                <div style={{marginTop:'1rem', display:'flex', justifyContent:'space-between'}}>
                  <div style={{width:'85%'}}>
                    <CustomMultiSelectFilter
                      label='Branches'
                      name='branch_ids'
                      setFieldValue={setFieldValue}
                      options={branches.map(br => ({value: br.id, label: br.name}))}
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

// function getUrl() {
//   if (searchType === 'advanced') {
//     return '/clientsapi/advanced_search/'
//   }

//   let url = `/clientsapi/clients/?page_num=${pageNum.current}`;
//   if (branchIds !== null) {
//     branchIds.forEach(id => (url += `&branch_ids=${id}`));
//   }
//   if (searchStr !== '') {
//     url += `&search_str=${searchStr}`;
//   }
//   if (minRegDate !== '') {
//     url += `&min_reg_date=${minRegDate}`;
//   }
//   if (maxRegDate !== '') {
//     url += `&max_reg_date=${maxRegDate}`;
//   }
//   if (minDob !== '') {
//     url += `&min_dob=${minDob}`;
//   }
//   if (maxDob !== '') {
//     url += `&max_dob=${maxDob}`;
//   }
//   if (typeOfClient !== '') {
//     url += `&type_of_client=${typeOfClient}`;
//   }
//   if (gender !== '') {
//     url += `&gender=${gender}`;
//   }
//   if (approved !== '') {
//     url += `&approved=${approved}`;
//   }
//   return url
// }

export default Filter;

{/* <div className="search_background">
            <form onSubmit={onSubmit}>
                <div className="row-containers" style={{border:"none"}}>
                    <div className="row row-payments">
                        <div className="row-payments-container">
                            <label className="form-label row-label">Min Reg Date</label>
                            <div className="input-group search_input" style={{margin:"10px 0 0"}}>
                                <i className="uil uil-calendar-alt"></i>
                                <input
                                    type='date'
                                    value={minRegDate}
                                    onKeyDown={(e) => e.preventDefault()}
                                    onChange={(e) => setMinRegDate(e.target.value)}
                                    className='custom-select-form row-form input-background'
                                    disabled={details ? "disabled": ""}
                                />
                            </div>
                        </div>
                        <div className="row-payments-container">
                            <label className="form-label row-label">Max Reg Date</label>
                            <div className="input-group search_input" style={{margin:"10px 0 0"}}>
                                <i className="uil uil-calendar-alt"></i>
                                <input
                                    type='date'
                                    value={maxRegDate}
                                    onKeyDown={(e) => e.preventDefault()}
                                    onChange={(e) => setMaxRegDate(e.target.value)}
                                    className='custom-select-form row-form input-background'
                                    disabled={details ? "disabled": ""}
                                />
                            </div>
                        </div>
                        <div className="row-payments-container">
                            <label className="form-label row-label">Min Date Of Birth</label>
                            <div className="input-group search_input" style={{margin:"10px 0 0"}}>
                                <i className="uil uil-calendar-alt"></i>
                                <input
                                    type='date'
                                    value={minDob}
                                    onKeyDown={(e) => e.preventDefault()}
                                    onChange={(e) => setMinDob(e.target.value)}
                                    className='custom-select-form row-form input-background'
                                    disabled={details ? "disabled": ""}
                                />
                            </div>
                        </div>
                        <div className="row-payments-container">
                            <label className="form-label row-label">Max Date Of Birth</label>
                            <div className="input-group search_input" style={{margin:"10px 0 0"}}>
                                <i className="uil uil-calendar-alt"></i>
                                <input
                                    type='date'
                                    value={maxDob}
                                    onKeyDown={(e) => e.preventDefault()}
                                    onChange={(e) => setMaxDob(e.target.value)}
                                    className='custom-select-form row-form input-background'
                                    disabled={details ? "disabled": ""}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row row-payments" style={{marginTop:"1rem"}}>
                        <div className="row-payments-container" style={{width:"22%"}}>
                            <div className="input-group" style={{margin:"0"}}>
                                <input
                                    type='text'
                                    name='search'
                                    autoComplete='off'
                                    className='custom-select-form row-form input-background'
                                    placeholder='Search client...'
                                    value={searchStr}
                                    onChange={(e) => setSearchStr(e.target.value)}
                                    disabled={details ? "disabled": ""}
                                />
                            </div>
                        </div>
                        <div className="row-payments-container" style={{width:"22%"}}>
                            <select className='custom-select-form row-form' onChange={(e) => setTypeOfClient(e.target.value)} value={typeOfClient} disabled={details ? "disabled": ""}>
                                <option value={''}>Select Client Type</option>
                                <option value={'Individual'}>Individual</option>
                                <option value={'Company'}>Company</option>
                            </select>
                        </div>
                        <div className="row-payments-container" style={{width:"22%"}}>
                            <select className='custom-select-form row-form' onChange={(e) => setGender(e.target.value)} value={gender} disabled={details ? "disabled": ""}>
                                <option value={''}>Select Gender</option>
                                <option value={'MALE'}>Male</option>
                                <option value={'FEMALE'}>Female</option>
                            </select>
                        </div>
                        <div className="row-payments-container" style={{width:"22%"}}>
                            <select className='custom-select-form row-form' onChange={(e) => setApproved(e.target.value)} value={approved} disabled={details ? "disabled": ""}>
                                <option value={''}>Approval Status</option>
                                <option value={'1'}>Approved</option>
                                <option value={'0'}>Pending Approval</option>
                            </select>
                        </div>
                    </div>

                    <div className="row row-payments" style={{marginTop:"1rem"}}>
                        <div className="row-payments-container" style={{width:"90%"}}>
                            <Select
                                isMulti
                                name='colors'
                                options={[props.allOption, ...selectorBranches]}
                                value={optionSelected}
                                classNamePrefix='select'
                                className='basic-multi-select'
                                placeholder='Select Branches'
                                onChange={selected => {
                                    if (selected !== null && selected.length > 0 && selected[selected.length - 1].value === props.allOption.value) {
                                    return handleMultiSelect(selectorBranches);
                                    }
                                    handleMultiSelect(selected);
                                }}
                                styles={style}
                                isDisabled={details ? true: false}
                            />
                        </div>
                        <button type='submit' className='btn btn-olive' style={details ? {pointerEvents: 'none', opacity: '0.7'}: {}}>Search</button>
                    </div>

                </div>

            </form>
        </div> */}