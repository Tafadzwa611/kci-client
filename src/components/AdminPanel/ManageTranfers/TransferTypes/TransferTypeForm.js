import React from 'react';
import { Form, Formik } from 'formik';
import {
  CustomMultiSelect,
  CustomInput,
  NonFieldErrors,
  SubmitButton,
  CustomSelect
} from '../../../../common';
import { Fetcher } from '../../../../common';
import { useCurrencies } from '../../../../contexts/CurrenciesContext';


function TransferTypeForm({initialValues, onSubmit}) {
  const {currencies} = useCurrencies();

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({values, isSubmitting, errors, setFieldValue }) => (
        <Form>
          <NonFieldErrors errors={errors}>
            <div className='divider divider-info'><span>Transfer Type Information</span></div>
            <CustomInput label='Transfer Type Name' name='name' type='text' required/>
            <div style={{marginBottom:'1.5rem', marginTop:'1.5rem'}}>
              <CustomSelect label='Currency' name='currency_id' required>
                <option value=''>------</option>
                {currencies.map(currency => <option key={currency.id} value={currency.id}>{currency.fullname}</option>)}
              </CustomSelect>
            </div>
            {values.currency_id && (
              <Fetcher urls={[
                `/acc-api/cash-accounts-by-currency-list/?currency_id=${values.currency_id}`
                ]}
              >
                {({data}) => (
                  <div>
                    <CustomMultiSelect
                        label='Receiving Accounts'
                        initVals={[]}
                        options={data[0].accounts.map(account => (
                          {label: `${account.general_ledger_name} - ${account.general_ledger_code}`, value: account.id}
                        ))}
                        setFieldValue={setFieldValue}
                        name='receiving_accounts_ids'
                        required
                    />
                    <CustomMultiSelect
                        label='Sending Accounts'
                        initVals={[]}
                        options={data[0].accounts.map(account => (
                          {label: `${account.general_ledger_name} - ${account.general_ledger_code}`, value: account.id}
                        ))}
                        setFieldValue={setFieldValue}
                        name='sending_accounts_ids'
                        required
                        />
                  </div>
                )}
              </Fetcher>
            )}
            <div className='divider divider-default' style={{padding: '1.25rem'}}></div>
            <div style={{display:'flex', justifyContent: 'flex-end'}}>
              <SubmitButton isSubmitting={isSubmitting}/>
            </div>
          </NonFieldErrors>
        </Form>
      )}
    </Formik>
  )
}

export default TransferTypeForm;