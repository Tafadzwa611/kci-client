import React from 'react';
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
import { useBranches } from '../../../contexts/BranchesContext';
import axios from 'axios';
import { removeEmptyValues } from '../../../utils/utils';

const Filter = ({setGroupsData, setGroupId, setGroupDetails}) => {
  const initialValues = {
    branch_ids: [],
    page_num: 1,
    search_str: '',
    min_reg_date: '',
    max_reg_date: '',
    min_grp_date: '',
    max_grp_date: '',
    approved: '',
  };
  const {branches} = useBranches();

  const changeApprovalStatus = (evt, setFieldValue) => {
    const {value} = evt.target;
    setGroupId(null);
    setGroupDetails(null);
    setGroupsData({count: 0, next_page_num: 0, groups: []});
    setFieldValue('approved', value);
  }

  const onSubmit = async (values, actions) => {
    try {
      const data = removeEmptyValues(values);
      const response = await axios.get('/clientsapi/groups/', {params: data});
      setGroupsData(response.data);
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
                          <div style={{width:"49%", display:"flex", justifyContent:"space-between"}}>
                            <div className="row-payments-container" style={{width:"49%"}}>
                                <CustomDatePickerFilter label='Min Reg Date' name='min_reg_date' setFieldValue={setFieldValue}/>
                            </div>
                            <div className="row-payments-container" style={{width:"49%"}}>
                                <CustomDatePickerFilter label='Max Reg Date' name='max_reg_date' setFieldValue={setFieldValue}/>
                            </div>
                          </div>
                          <div style={{width:"49%", display:"flex", justifyContent:"space-between"}}>
                            <div className="row-payments-container" style={{width:"49%"}}>
                                <CustomDatePickerFilter label='Min Group Date' name='min_grp_date' setFieldValue={setFieldValue}/>
                            </div>
                            <div className="row-payments-container" style={{width:"49%"}}>
                                <CustomDatePickerFilter label='Min Group Date' name='max_grp_date' setFieldValue={setFieldValue}/>
                            </div>
                          </div>
                        </div>
                        <div className="row row-payments" style={{marginTop:"1rem"}}>
                            <div className="row-payments-container" style={{width:"49%"}}>
                                <CustomInputFilter label='Group Name' name='search_str' type='text'/>
                            </div>
                            <div className="row-payments-container" style={{width:"49%"}}>
                                <CustomSelectFilter
                                    label='Approval Status'
                                    name='approved'
                                    onChange={(evt) => changeApprovalStatus(evt, setFieldValue)}
                                    >
                                    <option value='1'>Approved</option>
                                    <option value='0'>Pending Approval</option>
                                </CustomSelectFilter>
                            </div>
                        </div>
                        <div style={{marginTop:"1rem", display:"flex", justifyContent:"space-between"}}>
                            <div style={{width:"85%"}}>
                                <CustomMultiSelectFilter
                                    label='Branches'
                                    name='branch_ids'
                                    options={branches.map(br => ({label: br.name, value:br.id}))}
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

export default Filter;

