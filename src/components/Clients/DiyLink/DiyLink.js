import React from 'react';
import { useBranches } from '../../../contexts/BranchesContext';
import { Fetcher, CustomSelect, CustomInput } from '../../../common';
import { Formik, Form } from 'formik';

function DiyLink() {
  const {branches} = useBranches();

  function copyFunc() {
    const copyText = document.getElementById('diy-link');
    navigator.clipboard.writeText(copyText.value);
  }

  return (
    <Fetcher urls={['/clientsapi/client_types/']}>
      {({data}) => (
        <Formik initialValues={{client_type_id: '', branch_id: ''}}>
          {({ values }) => (
            <Form autoComplete='off'>
              <CustomSelect label='Client Type' name='client_type_id'>
                <option value=''>------</option>
                {data[0].map(ct => <option key={ct.id} value={ct.id}>{ct.name}</option>)}
              </CustomSelect>
              <CustomSelect label='Branch' name='branch_id'>
                <option value=''>------</option>
                {branches.map(br => <option key={br.id} value={br.id}>{br.name}</option>)}
              </CustomSelect>
              {values.client_type_id && values.branch_id ?
              <>
                <div className='row custom-background'>
                  <label className='form-label'>Link</label>
                  <div className='col-9'>
                    <input
                      type='text'
                      value={`${window.location.origin}/self_reg/?type_id=${values.client_type_id}&branch_id=${values.branch_id}`}
                      className='custom-select-form'
                      id='diy-link'
                      readOnly
                    />
                    <button onClick={copyFunc}>Copy Link</button>
                  </div>
                </div>
              </> :
              null}
            </Form>
          )}
        </Formik>
      )}
    </Fetcher>
  )
}

export default DiyLink;