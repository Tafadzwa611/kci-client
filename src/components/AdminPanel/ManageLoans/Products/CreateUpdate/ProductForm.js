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
import {CustomLoanForm, AddCustomLoanForm} from './Forms';
import { AddSchedulePenalty, SchedulePenalty } from './SchedulePenalties';
import axios from 'axios';

function ProductForm({loanFees, fieldSets, initialValues, validationSchema, onSubmit, back}) {
  const {branches} = useBranches();
  const selectBranches = branches.map(br => ({label: br.name, value:br.id}));
  initialValues.allowed_branches_ids = selectBranches.filter(br => initialValues.allowed_branches_ids.includes(br.value))
  const {currencies} = useCurrencies();
  const [accounts, setAccounts] = React.useState(null);

  React.useEffect(() => {
    const fetch = async () => {
      const response = await axios.get('/acc-api/sub_accounts_api/?page_num=1');
      setAccounts(response.data);
    }
    fetch();
  }, []);

  if (!accounts) {
    return <div>Loading...</div>
  }

  return (
    <>
      <ButtonDefault value={'Back'} handler={back} />
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ isSubmitting, errors, setFieldValue, values }) => {
          const buildAccountOptions = (type) =>
            accounts.accounts
            .filter(
              acc =>
                acc.account_type === type &&
                acc.currency_id == values.currency_id
            )
            .map(acc => ({
              label: `${acc.general_ledger_name} - ${acc.general_ledger_code} ${acc.account_type}`,
              value: acc.id,
          }));
    
          const assetOptions = buildAccountOptions('ASSET');
          const liabilityOptions = buildAccountOptions('LIABILITY');
          const expenseOptions = buildAccountOptions('EXPENSE');
          const incomeOptions = buildAccountOptions('INCOME');

          return (
            <Form>
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
                <option value='Dynamic Term Loan'>Dynamic Term Loan</option>
                <option value='Interest-Free Loan'>Interest-Free Loan</option>
              </CustomSelect>
              <CustomCheckbox label='Is Active' name='is_active'/>
              <CustomCheckbox label='Calculate Using Installment' name='calculate_using_installment'/>
              <div className='divider divider-info'>
                <span>Principal Settings</span>
              </div>
              <CustomSelect label='Currency' name='currency_id' required>
                <option value=''>------</option>
                {currencies.map(currency => <option key={currency.id} value={currency.id}>{currency.fullname}</option>)}
              </CustomSelect>
              <CustomInput label='Minimum Principal Amount' name='minimum_principal_amount' step='0.00001' type='number' required/>
              <CustomInput label='Maximum Principal Amount' name='maximum_principal_amount' step='0.00001' type='number' required/>
              <div className='divider divider-info'>
                <span>Interest Settings</span>
              </div>
              <CustomSelect label='Interest Method' name='interest_method' required>
                <option value=''>------</option>
                <option value='Flat Rate'>Flat Rate</option>
                <option value='Interest-Only'>Flat Rate (Interest-Only)</option>
                <option value='Reducing Balance - Equal Installments'>Reducing Balance - Equal Installments</option>
                <option value='Reducing Balance - Equal Principal'>Reducing Balance - Equal Principal</option>
              </CustomSelect>
              {values.product_type === 'Fixed Term Loan' && (
                <CustomSelect label='Interest Application' name='interest_application' required>
                  <option value=''>------</option>
                  <option value='Daily'>Daily</option>
                  <option value='Upfront'>Upfront</option>
                </CustomSelect>
              )}
              <CustomSelect label='Interest Interval' name='interest_interval' required>
                <option value=''>------</option>
                <option value='/Day'>Per Day</option>
                <option value='/Week'>Per Week</option>
                <option value='/Month'>Per Month</option>
                <option value='/Year'>Per Year</option>
                {values.interest_method === 'Flat Rate' && (
                  <option value='Total'>Total</option>
                )}
              </CustomSelect>
              <CustomInput label='Minimum Loan Interest' name='minimum_interest_rate' min='0' step='0.00001' type='number' required/>
              <CustomInput label='Maximum Loan Interest' name='maximum_interest_rate' min='0' step='0.00001' type='number' required/>
              <CustomInput label='Default Loan Interest' name='default_interest_rate' min='0' step='0.00001' type='number'/>
              {values.product_type === 'Dynamic Term Loan' && (
                <>
                  <CustomSelect label='Apply Dynamic Interest On' name='dynamic_interest_applied_on' required>
                    <option value=''>------</option>
                    <option value='Principal'>Missed Installment Principal Balance</option>
                    <option value='Org Principal'>Original Principal</option>
                    <option value='Interest'>Missed Installment Interest Balance</option>
                    <option value='Org Interest'>Original Balance</option>
                    <option value='Principal + Interest'>Missed Installment Principal + Interest</option>
                    <option value='Principal + Penalty'>Missed Installment Principal + Penalty</option>
                    <option value='Principal + Interest + Fees + Penalty'>Missed Installment Principal + Interest + Fees + Penalty</option>
                  </CustomSelect>
                  <CustomCheckbox label='Add Interest After Maturity' name='add_interest_after_maturity'/>
                  {values.add_interest_after_maturity && <CustomInput label='Interest rate after maturity' name='dynamic_default_interest_rate' type='number' required/>}
                </>
              )}
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
              <CustomInput label='Default Number of Repayments' name='default_loan_duration' type='number'/>
              <CustomInput label='Grace period' name='days_to_first_repayment' type='number'/>
              <CustomSelect label='Default Loan Schedule Strategy' name='schedule_strategy' required>
                <option value=''>------</option>
                {scheduleStrategies[values.loan_duration_time_unit].map(strategy => <option key={strategy} value={strategy}>{strategy}</option>)}
              </CustomSelect>
              <CustomCheckbox label='Allow Changing Schedule Strategy On Loan Creation' name='allow_editing_schedule_strategy_on_loan_creation'/>
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
              <CustomCheckbox label='Apply Overpayment To Future Installments' name='apply_overpayment_to_future_installments'/>
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
              <CustomCheckbox label='Allow Editing Fees On Loan Creation' name='allow_editing_fees_on_loan_creation'/>
              {values.fees.map((fee, index) => {
                return(
                  <React.Fragment key={index}>
                    <Fee fee={fee} index={index} fees={values.fees} setFieldValue={setFieldValue} loanFees={loanFees} />
                  </React.Fragment>
                )
              })}
              <AddFee fees={values.fees} setFieldValue={setFieldValue} />
              <div className='divider divider-info'>
                <span>Custom Forms</span>
              </div>
              {values.custom_forms.map((customForm, index) => {
                return(
                  <React.Fragment key={index}>
                    <CustomLoanForm
                      customForm={customForm}
                      index={index}
                      custom_forms={values.custom_forms}
                      setFieldValue={setFieldValue}
                      fieldSets={fieldSets}
                    />
                  </React.Fragment>
                )
              })}
              <AddCustomLoanForm custom_forms={values.custom_forms} setFieldValue={setFieldValue}/>
              <div className='divider divider-info'>
                <span>Recalculate Settings</span>
              </div>
              <CustomCheckbox label='Enable Auto Restructure' name='auto_restructure'/>
              {values.auto_restructure && (
                <>
                  <CustomInput label='Recalculate Interest' name='auto_restructure_interest' type='number' required/>
                  <CustomInput label='Recalculate Installments' name='auto_restructure_installments' type='number' required/>
                </>
              )}
              <div className='divider divider-info'>
                <span>Defaults & Penalties</span>
              </div>
              <CustomCheckbox label='Allow Early Settlement On Loans With Unpaid Penalties' name='allow_early_settlement_on_penalties'/>
              <CustomCheckbox label='Send SMS Alert On Loan Default/Installment Reminders' name='send_sms_on_default'/>
              <CustomSelect label='Action On Default' name='action_on_loan_default'>
                <option value='Do Nothing'>Do Nothing</option>
                <option value='Add Penalty'>Add Penalty</option>
                <option value='Add Scheduled Penalties After Maturity'>Add Scheduled Penalties After Maturity</option>
                <option value='Add Scheduled Penalties After Default'>Add Scheduled Penalties After Default</option>
                <option value='Add Fixed Penalty'>Add Fixed Penalty</option>
                <option value='Add Interest'>Add Interest Fees</option>
              </CustomSelect>
              {values.action_on_loan_default === 'Add Scheduled Penalties After Maturity' && (
                <>
                  <CustomSelect label='Apply Interest On' name='apply_late_repayment_penalty_on' required>
                    <option value=''>------</option>
                    <option value='Total Loan Balance'>Total Loan Balance In Arrears</option>
                    <option value='Org Principal'>Original Principal</option>
                    <option value='Principal Balance'>Principal Balance In Arrears</option>
                    <option value='Interest'>Interest Balance In Arrears</option>
                    <option value='Principal + Interest'>Principal Balance In Arrears + Interest Balance In Arrears</option>
                    <option value='Principal + Penalty'>Principal Balance In Arrears + Penalty Balance In Arrears</option>
                  </CustomSelect>
                  <CustomCheckbox label='Auto Apply Scheduled Penalties When Backdating' name='auto_apply_scheduled_penalties_on_backdating'/>
                  <CustomCheckbox label='Recalculate Scheduled Penalties' name='recalculate_scheduled_penalties'/>
                  {values.schedule_penalties.map((schedule_penalty, index) => {
                    return(
                      <React.Fragment key={index}>
                        <SchedulePenalty
                          schedule_penalty={schedule_penalty}
                          index={index}
                          setFieldValue={setFieldValue}
                          schedule_penalties={values.schedule_penalties}
                        />
                      </React.Fragment>
                    )
                  })}
                  <AddSchedulePenalty schedule_penalties={values.schedule_penalties} setFieldValue={setFieldValue}/>
                </>
              )}
              {values.action_on_loan_default === 'Add Scheduled Penalties After Default' && (
                <>
                  <CustomSelect label='Apply Interest On' name='apply_late_repayment_penalty_on' required>
                    <option value=''>------</option>
                    <option value='Total Loan Balance'>Total Loan Balance In Arrears</option>
                    <option value='Principal Balance'>Principal Balance In Arrears</option>
                    <option value='Interest'>Interest Balance In Arrears</option>
                    <option value='Principal + Interest'>Principal Balance In Arrears + Interest Balance In Arrears</option>
                    <option value='Principal + Penalty'>Principal Balance In Arrears + Penalty Balance In Arrears</option>
                  </CustomSelect>
                  {values.schedule_penalties.map((schedule_penalty, index) => {
                    return(
                      <React.Fragment key={index}>
                        <SchedulePenalty
                          schedule_penalty={schedule_penalty}
                          index={index}
                          setFieldValue={setFieldValue}
                          schedule_penalties={values.schedule_penalties}
                        />
                      </React.Fragment>
                    )
                  })}
                  <AddSchedulePenalty schedule_penalties={values.schedule_penalties} setFieldValue={setFieldValue}/>
                </>
              )}
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
                </>}
              {values.action_on_loan_default === 'Add Interest' &&
                <>
                  <CustomSelect label='Apply Interest On' name='apply_late_repayment_penalty_on' required>
                    <option value=''>------</option>
                    <option value='Principal'>Missed Installment Principal Balance</option>
                    <option value='Org Principal'>Original Principal</option>
                    <option value='Interest'>Missed Installment Interest Balance</option>
                    <option value='Org Interest'>Original Balance</option>
                    <option value='Principal + Interest'>Missed Installment Principal + Interest</option>
                    <option value='Principal + Penalty'>Missed Installment Principal + Penalty</option>
                    <option value='Principal + Interest + Fees + Penalty'>Missed Installment Principal + Interest + Fees + Penalty</option>
                  </CustomSelect>
                  <CustomInput label='Default Interest Rate' name='on_default_rate' type='number' required/>
                  <CustomCheckbox label='Is recurring' name='is_default_interest_recurring'/>
                  <CustomCheckbox label='Add On Last Installment Only' name='add_on_last_installment_only'/>
                </>}
              {values.action_on_loan_default === 'Add Fixed Penalty' && (
                <>
                  <CustomInput label='Fixed Penalty Amount' name='fixed_penalty_amount' type='number' required/>
                  <CustomSelect label='Penalty Rate Interval' name='penalty_charged_per' required>
                    <option value=''>------</option>
                    <option value='/Day'>Per Day</option>
                  </CustomSelect>
                </>
              )}
              <CustomCheckbox label='Enable Auto Write-Off' name='allow_auto_write_off'/>
              {values.allow_auto_write_off && (
                <CustomInput
                  label='Auto Write-Off Grace Period In Days'
                  name='auto_write_off_grace_period'
                  type='number'
                  required
                />
              )}
              <div className='divider divider-info'>
                <span>Accounting</span>
              </div>
              <CustomMultiSelect
                label='Portfolio Control Asset (Optional)'
                name='accounting.portfolio_control'
                isMulti={false}
                setFieldValue={setFieldValue}
                options={assetOptions}
              />
              <CustomMultiSelect
                label='Interest Income (Optional)'
                name='accounting.interest_income'
                isMulti={false}
                setFieldValue={setFieldValue}
                options={incomeOptions}
              />
              <CustomMultiSelect
                label='Interest Receivable Asset (Optional)'
                name='accounting.interest_receivable'
                isMulti={false}
                setFieldValue={setFieldValue}
                options={assetOptions}
              />
              <CustomMultiSelect
                label='Penalty Income (Optional)'
                name='accounting.penalty_income'
                isMulti={false}
                setFieldValue={setFieldValue}
                options={incomeOptions}
              />
              <CustomMultiSelect
                label='Penalty Receivable Asset (Optional)'
                name='accounting.penalty_receivable'
                isMulti={false}
                setFieldValue={setFieldValue}
                options={assetOptions}
              />
              <CustomMultiSelect
                label='Fees Income (Optional)'
                name='accounting.fee_income'
                isMulti={false}
                setFieldValue={setFieldValue}
                options={incomeOptions}
              />
              <CustomMultiSelect
                label='Fees Receivable Asset (Optional)'
                name='accounting.fee_receivable'
                isMulti={false}
                setFieldValue={setFieldValue}
                options={assetOptions}
              />
              <CustomMultiSelect
                label='Refunds Payable Liability (Optional)'
                name='accounting.refunds_payable'
                isMulti={false}
                setFieldValue={setFieldValue}
                options={liabilityOptions}
              />
              <CustomMultiSelect
                label='Write Off Expense (Optional)'
                name='accounting.write_off'
                isMulti={false}
                setFieldValue={setFieldValue}
                options={expenseOptions}
              />
              <CustomMultiSelect
                label='Bad Debts Recovery Income (Optional)'
                name='accounting.bad_debts_recovery'
                isMulti={false}
                setFieldValue={setFieldValue}
                options={incomeOptions}
              />
              <div className='divider divider-default' style={{padding: '1.25rem'}}></div>
              <div style={{display:'flex', justifyContent: 'flex-end'}}> 
                <SubmitButton isSubmitting={isSubmitting}/>
              </div>
              <NonFieldErrors errors={errors}/>
            </Form>
          )
        }}
      </Formik>
    </>
  )
}

export default ProductForm;