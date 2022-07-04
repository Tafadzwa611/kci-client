import React, { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { makeRequest } from '../../utils/utils';
import OtherIncomeDetailsSkeleton from '../Skeletons/Charts/OtherIncomeDetailsSkeleton';

const ExpenseDetails = () => {

	const {expenseId} = useParams();
	const [expense, setExpense] = useState(null);

	useEffect(() => {
		getExpense()
	}, [])

	useEffect(() => {
        document.title = 'Expense Details';
    }, []);

	const getExpense = async () => {
		const response = await makeRequest.get(`/expensesapi/get_expense/${expenseId}/`, {timeout:8000})
		const data = await response.json()
		setExpense(data)
	}

	if (expense === null) {
		return <div><OtherIncomeDetailsSkeleton/></div>
	}

    return (
		<div className="card text-light slide">
			<div className="card-body">
				<h5 className="table-heading">Expense Details</h5>

				<div class="row font-13">

					<div class="col-6">
						<ul>
							<li>Expense Name: {expense.expense_name}</li>
							<li>Expense Type: {expense.expense_type.name}</li>
							<li>Expense Amount: <span> ZWL </span><em class="currency"></em>{expense.expense_amount}</li>
							<li>Reference: {expense.reference}</li>
						</ul>
					</div>

					<div class="col-6">
						<ul>
							<li>Date Created: {expense.date_created}</li>
							<li>Created By: {expense.created_by.first_name} {expense.created_by.last_name}</li>
							<li>Expense Date: {expense.expense_date}</li>
							<li>Description: {expense.description}</li>
						</ul>
					</div>

				</div>
				<div className="btn-flex-space-btwn">
					<NavLink className="btn btn-default" to="/app/expenses/viewexpenses"><i class="uil uil-arrow-left"></i>Back</NavLink>
				</div>

			</div>
		</div>
    );
}

export default ExpenseDetails;