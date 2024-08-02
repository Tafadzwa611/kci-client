const updateLoanList = (newLoan, setLoanData) => {
  setLoanData(curr => {
    return {
      ...curr,
      loans: curr.loans.map(loan => {
        if (loan.id === newLoan.id) {
          return {
            ...loan,
            total_amount_paid: newLoan.total_amount_paid,
            principal_amount_due: newLoan.principal_amount_due,
            interest_amount_due: newLoan.interest_amount_due,
            penalty: newLoan.penalty,
            non_deductable_fees: newLoan.non_deductable_fees,
            status: newLoan.status,
            total_loan_penalty: newLoan.penalty_reference_settlement || newLoan.penalty_reference,
            total_loan_non_deduc_fees: newLoan.non_deductable_fees_reference_settlement || newLoan.non_deductable_fees_reference,
            db_date: newLoan.db_date
          }
        }
        return loan
      })
    }
  })
}

export {updateLoanList}