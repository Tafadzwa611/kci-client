import React from 'react';
import { Form, Formik } from 'formik';
import {
  CustomInput,
  NonFieldErrors,
  SubmitButton,
  ButtonDefault,
  CustomTextField,
  CustomSelect,
  CustomCheckbox,
  CustomMultiSelect,
  CustomSortableSelect
} from '../../../../../common';
import { useBranches } from '../../../../../contexts/BranchesContext';
import { useCurrencies } from '../../../../../contexts/CurrenciesContext';
import { scheduleStrategies } from './data';
import {Fee, AddFee} from './Fees';

function ProductForm({loanFees, initialValues, validationSchema, onSubmit, back}) {
  const {branches} = useBranches();
  const selectBranches = branches.map(br => ({label: br.name, value:br.id}));
  initialValues.allowed_branches_ids = selectBranches.filter(br => initialValues.allowed_branches_ids.includes(br.value))
  const {currencies} = useCurrencies();

  return (
    <>
      <ButtonDefault value={'Back'} handler={back} />
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ isSubmitting, errors, setFieldValue, values }) => (
          <Form>
            <NonFieldErrors errors={errors}>
              <div className='divider divider-info'>
                <span>Name & Description</span>
              </div>
              <CustomInput label='Name' name='name' type='text' required/>
              {initialValues.ext_name ?
                <CustomInput label='External Name' name='ext_name' type='text' required/> :
                <CustomInput label='External Name' name='ext_name' type='text'/>}
              <CustomInput label='Product ID' name='loan_product_id' type='text'/>
              <CustomTextField label='Description' name='description'/>
              <CustomSelect label='Product Type' name='product_type' required>
                <option value=''>------</option>
                <option value='Fixed Term Loan'>Fixed Term Loan</option>
                <option value='Interest-Free Loan'>Interest-Free Loan</option>
              </CustomSelect>
              <CustomCheckbox label='Is Active' name='is_active'/>
              <div className='divider divider-info'>
                <span>Principal Settings</span>
              </div>
              <CustomSelect label='Currency' name='currency_id' required>
                <option value=''>------</option>
                {currencies.map(currency => <option key={currency.id} value={currency.id}>{currency.fullname}</option>)}
              </CustomSelect>
              <CustomInput label='Minimum Principal Amount' name='minimum_principal_amount' type='number' required/>
              <CustomInput label='Maximum Principal Amount' name='maximum_principal_amount' type='number' required/>
              <div className='divider divider-info'>
                <span>Interest Settings</span>
              </div>
              <CustomSelect label='Interest Method' name='interest_method' required>
                <option value=''>------</option>
                <option value='Flat Rate'>Flat Rate</option>
                <option value='Reducing Balance - Equal Installments'>Reducing Balance - Equal Installments</option>
                <option value='Reducing Balance - Equal Principal'>Reducing Balance - Equal Principal</option>
              </CustomSelect>
              <CustomSelect label='Interest Interval' name='interest_interval' required>
                <option value=''>------</option>
                <option value='/Day'>Per Day</option>
                <option value='/Week'>Per Week</option>
                <option value='/Month'>Per Month</option>
                <option value='/Year'>Per Year</option>
              </CustomSelect>
              <CustomInput label='Minimum Loan Interest' name='minimum_interest_rate' type='number' required/>
              <CustomInput label='Maximum Loan Interest' name='maximum_interest_rate' type='number' required/>
              <div className='divider divider-info'>
                <span>Top-Up Settings</span>
              </div>
              <CustomInput label='Topup Window Period In Days' name='topup_window_period' type='number' required/>
              <CustomInput label='Number Of Topups Allowed Per Loan' name='number_of_topups_allowed' type='number' required/>
              <CustomInput label='Maximum Top-Up Amount As A Percentage' name='topup_limit' type='number' required/>
              <div className='divider divider-info'>
                <span>Tenure Settings</span>
              </div>
              <CustomSelect label='Non Working Days Rescheduling' name='action_on_holiday'>
                <option value=''>------</option>
                <option value='NXT'>Move ahead to next working day</option>
                <option value='PREV'>Move backwards to previous working day</option>
                <option value='EXT'>Extend Schedule</option>
              </CustomSelect>
              <CustomSelect label='Repayment Cycle' name='loan_duration_time_unit' required>
                <option value=''>------</option>
                <option value='Days'>Daily</option>
                <option value='Weeks'>Weekly</option>
                <option value='2 Weeks'>Biweekly</option>
                <option value='Months'>Monthly</option>
                <option value='2 Months'>Bimonthly</option>
                <option value='3 Months'>Quarterly</option>
                <option value='4 Months'>Every 4 Months</option>
                <option value='6 Months'>Semi-annually</option>
                <option value='Years'>Annually</option>
              </CustomSelect>
              <CustomInput label='Minimum Number of Repayments' name='minimum_loan_duration' type='number' required/>
              <CustomInput label='Maximum Number of Repayments' name='maximum_loan_duration' type='number' required/>
              <CustomSelect label='Default Loan Schedule Strategy' name='schedule_strategy' required>
                <option value=''>------</option>
                {scheduleStrategies[values.loan_duration_time_unit].map(strategy => <option key={strategy} value={strategy}>{strategy}</option>)}
              </CustomSelect>
              <div className='divider divider-info'>
                <span>Decimal Places, Rounding Off and Repayment Order</span>
              </div>
              <CustomSelect label='Decimal Places' name='number_of_decimal_places' required>
                <option value=''>------</option>
                <option value='0.01'>Round Off to Two Decimal Places</option>
                <option value='0.1'>Round Off to One Decimal Place</option>
                <option value='1'>Round Off to Integer</option>
              </CustomSelect>
              <CustomSelect label='Rounding Scheme' name='rounding_scheme' required>
                <option value=''>------</option>
                <option value='ROUND_HALF_UP'>Round Half Up</option>
                <option value='ROUND_UP'>Round Up</option>
                <option value='ROUND_DOWN'>Round Down</option>
              </CustomSelect>
              <CustomSortableSelect
                label='Repayment Order'
                setFieldValue={(name, items) => setFieldValue(name, {first: items[0], second: items[1], third: items[2], fourth: items[3]})}
                name='repayment_order'
                options={[
                  values.repayment_order.first,
                  values.repayment_order.second,
                  values.repayment_order.third,
                  values.repayment_order.fourth
                ]}
              />
              <div className='divider divider-info'>
                <span>Product Availability</span>
              </div>
              <CustomSelect label='Client Type' name='client_type' required>
                <option value=''>------</option>
                <option value='Clients'>Clients</option>
                <option value='Groups'>Groups</option>
                <option value='Groups (solidarity)'>Groups (solidarity)</option>
              </CustomSelect>
              <CustomMultiSelect
                label='Branches'
                initVals={values.allowed_branches_ids}
                options={selectBranches}
                setFieldValue={setFieldValue}
                name='allowed_branches_ids'
              />
              <div className='divider divider-info'>
                <span>Fees</span>
              </div>
              {values.fees.map((fee, index) => {
                return(
                  <React.Fragment key={index}>
                    <Fee fee={fee} index={index} fees={values.fees} setFieldValue={setFieldValue} loanFees={loanFees} />
                  </React.Fragment>
                )
              })}
              <AddFee fees={values.fees} setFieldValue={setFieldValue} />
              <div className='divider divider-info'>
                <span>Defaults & Penalties</span>
              </div>
              <CustomCheckbox label='Allow Early Settlement On Loans With Unpaid Penalties' name='allow_early_settlement_on_penalties'/>
              <CustomCheckbox label='Send SMS Alert On Loan Default' name='send_sms_on_default'/>
              <CustomSelect label='Action On Default' name='action_on_loan_default'>
                <option value='Do Nothing'>Do Nothing</option>
                <option value='Add Penalty'>Add Penalty</option>
              </CustomSelect>
              {values.action_on_loan_default === 'Add Penalty' &&
                <>
                  <CustomSelect label='Apply Penalty On' name='apply_late_repayment_penalty_on' required>
                    <option value=''>------</option>
                    <option value='Principal'>Principal</option>
                    <option value='Principal + Interest'>Principal + Interest</option>
                  </CustomSelect>
                  <CustomSelect label='Penalty Rate Interval' name='penalty_charged_per' required>
                    <option value=''>------</option>
                    <option value='/Day'>Per Day</option>
                    <option value='/Week'>Per Week</option>
                    <option value='/Month'>Per Month</option>
                    <option value='/Year'>Per Year</option>
                  </CustomSelect>
                  <CustomInput label='Penalty Rate' name='late_repayment_penalty_percentage' type='number' required/>
                  <CustomInput label='Penalty Tolerance Period In Days' name='grace_period' type='number' required/>
                </>
              }
              <div className='divider divider-default' style={{padding: '1.25rem'}}></div>
              <div style={{display:'flex', justifyContent: 'flex-end'}}> 
              <SubmitButton isSubmitting={isSubmitting}/>
              </div>
            </NonFieldErrors>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default ProductForm;