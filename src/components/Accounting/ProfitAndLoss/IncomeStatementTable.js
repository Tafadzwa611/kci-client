import React from 'react';
import LoansAndAdvances from './income/LoansAndAdvances';
import Investments from './income/Investments';
import TotalInterestIncome from './income/TotalInterestIncome';
import NonInterestIncome from './income/NonInterestIncome';
import TotalOperatingIncome from './income/TotalOperatingIncome';
import NetInterestIncome from './income/NetInterestIncome';
import InterestExpenses from './expenses/InterestExpenses';
import Provision from './expenses/Provision';
import OperatingExpenses from './expenses/OperatingExpenses';
import NetIncome from './income/NetIncome';
import Donations from './income/Donations';
import IncomeBeforeTax from './income/IncomeBeforeTax';
import Taxation from './expenses/Taxation';
import IncomeAfterTax from './income/IncomeAfterTax';
import Dividend from './expenses/Dividend';
import RetainedEarnings from './income/RetainedEarnings';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

function IncomeStatementTable({ report }) {
  const loansAndAdvances = report.entries.filter(entry => entry.type === 'Interest Income from Loans and Advances');
  const investments = report.entries.filter(entry => entry.type === 'Interest Income and discounts received from investments');
  const nonInterestIncome = report.entries.filter(entry => entry.type === 'Non-Interest Income');
  const interestExpenses = report.entries.filter(entry => entry.type === 'Interest Expenses');
  const loanLosses = report.entries.filter(entry => entry.type === 'Provision for Loan losses');
  const operatingExpenses = report.entries.filter(entry => entry.type === 'Operating Expenses');

  return (
    <>
      <div style={{paddingTop: "2rem", marginBottom:"10px"}}>
        <ReactHTMLTableToExcel
          id='test-table-xls-button'
          className='download-table-xls-button btn btn-default'
          table='income-statement'
          filename='Income Statement'
          sheet='tablexls'
          buttonText='Download as XLS'
        />
      </div>
      <div>
        <table className='table income__statement' id='income-statement'>
          <thead>
            <tr className="income__statement-header">
              <td style={{fontWeight: 'bold'}}>Income Statement</td>
              <th className='text-right text-bold'></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <LoansAndAdvances currencyIso={report.currency} loansAndAdvances={loansAndAdvances} totalAmount={report.total_income_from_loans_and_advances}/>
            <Investments currencyIso={report.currency} investments={investments} totalInvestments={report.total_income_from_investments}/>
            <TotalInterestIncome currencyIso={report.currency} totalInterestIncome={report.total_interest_income}/>
            <NonInterestIncome currencyIso={report.currency} nonInterestIncome={nonInterestIncome} totalNonInterestIncome={report.total_non_interest_income}/>
            <TotalOperatingIncome currencyIso={report.currency} totalOperatingIncome={report.total_operating_income}/>
            <InterestExpenses currencyIso={report.currency} interestExpenses={interestExpenses} totalInterestExpenses={report.total_interest_expenses}/>
            <NetInterestIncome currencyIso={report.currency} netInterestIncome={report.net_interest_income}/>
            <Provision currencyIso={report.currency} loanLosses={loanLosses} totalLoanlosses={report.total_provision_for_loan_losses}/>
            <OperatingExpenses currencyIso={report.currency} operatingExpenses={operatingExpenses} totalOperatingExpenses={report.total_operating_expenses}/>
            <NetIncome currencyIso={report.currency} netIncomeFromOps={report.net_income_from_operations}/>
            <Donations currencyIso={report.currency} totalDonations={report.total_donations}/>
            <IncomeBeforeTax currencyIso={report.currency} totalIncomeBeforeTax={report.total_income_before_tax}/>
            <Taxation currencyIso={report.currency} totalTaxation={report.total_taxation}/>
            <IncomeAfterTax currencyIso={report.currency} netIncomeAfterTax={report.net_income_after_tax}/>
            <Dividend currencyIso={report.currency} totalDividend={report.total_dividend}/>
            <RetainedEarnings currencyIso={report.currency} retainedEarnings={report.retained_earnings_from_operations}/>
          </tbody>
        </table>
      </div>
    </>
  )
}

export default IncomeStatementTable;