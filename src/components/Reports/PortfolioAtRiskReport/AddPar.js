import React from 'react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import {
  NonFieldErrors,
  CustomInputFilter,
  CustomSelectFilter,
  CustomMultiSelectFilter,
  SubmitButtonFilter,
  Modal,
  Fetcher
} from '../../../common';
import { useCurrencies } from '../../../contexts/CurrenciesContext';
import { useBranches } from '../../../contexts/BranchesContext';
import axios from 'axios';
import { removeEmptyValues, getParams } from '../../../utils/utils';

const AddPar = ({open, setOpen, setPars}) => {
  const initialValues = {branch_ids: [], currency_id: '', lower_limit: '', upper_limit: '', client_type: '', group_type: '', reason: '', unit_id: ''};
  const {currencies} = useCurrencies();
  const {branches} = useBranches();

  const onSubmit = async (values, actions) => {
    try {
      const data = removeEmptyValues(values);
      const params = getParams(data);
      const response = await axios.get('/reportsapi/par-report/', {params: params});
      const par = {
        ...response.data,
        selectedBIds: values.branch_ids,
        currency_id: values.currency_id,
        lower_limit: values.lower_limit,
        upper_limit: values.upper_limit,
        client_type: values.client_type,
        group_type: values.group_type,
        reason: values.reason,
        unit_id: values.unit_id
      };
      setPars(curr => [...curr, par]);
      setOpen(false);
    } catch (error) {
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
    <Modal open={open} setOpen={setOpen} title={'Add Par'}>
      <Fetcher urls={['/clientsapi/client_types/', '/clientsapi/group_types/', '/usersapi/list_units/']}>
        {({data}) => (
          <Formik initialValues={initialValues} validationSchema={addSchema} onSubmit={onSubmit}>
            {({ isSubmitting, setFieldValue, errors }) => (
              <Form>
                <NonFieldErrors errors={errors}>
                  <div className='create_modal_container'>
                    <div style={{display:'flex', flexDirection:'column', rowGap:'10px'}}>
                      <CustomMultiSelectFilter
                        label='Branches'
                        name='branch_ids'
                        options={branches.map(br => ({label: br.name, value:br.id}))}
                        setFieldValue={setFieldValue}
                        required
                      />
                      <CustomSelectFilter label='Currency' name='currency_id' required>
                        <option value=''>------</option>
                        {currencies.map(currency => <option key={currency.id} value={currency.id}>{currency.fullname}</option>)}
                      </CustomSelectFilter>
                      <CustomInputFilter label='Lower Limit' name='lower_limit' type='text'/>
                      <CustomInputFilter label='Upper Limit' name='upper_limit' type='text'/>
                      <CustomSelectFilter label='Client Type' name='client_type'>
                        <option value=''>------</option>
                        {data[0].map(clienttype => <option key={clienttype.id} value={clienttype.name}>{clienttype.name}</option>)}
                      </CustomSelectFilter>
                      <CustomSelectFilter label='Group Type' name='group_type'>
                        <option value=''>------</option>
                        {data[1].map(grouptype => <option key={grouptype.id} value={grouptype.name}>{grouptype.name}</option>)}
                      </CustomSelectFilter>
                      <CustomSelectFilter label='Reason For Borrowing' name='reason'>
                        <option value=''>------</option>
                        <option value='CONSUMER'>CONSUMER</option>
                        <option value='COMMERCIAL'>COMMERCIAL</option>
                        <option value='OTHER'>OTHER</option>
                      </CustomSelectFilter>
                      <CustomSelectFilter label='Units' name='unit_id'>
                        <option value=''>------</option>
                        {data[2].map(ut => <option key={ut.id} value={ut.id}>{ut.name}</option>)}
                      </CustomSelectFilter>
                    </div>
                    <div style={{display:'flex', justifyContent:'flex-end'}}>
                      <SubmitButtonFilter isSubmitting={isSubmitting}/>
                    </div>
                  </div>
                </NonFieldErrors>
              </Form>
            )}
          </Formik>
        )}
      </Fetcher>
    </Modal>
  )
}

export const addSchema = yup.object().shape({
  lower_limit: yup.number(),
  upper_limit: yup.number().moreThan(yup.ref('lower_limit'), 'Upper limit should be greater than lower limit'),
});

export default AddPar;