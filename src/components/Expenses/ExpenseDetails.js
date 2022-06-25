import React from 'react';
import { NavLink } from 'react-router-dom';

const ExpenseDetails = () => {
    return (
		<div className="card text-light slide">
			<div className="card-body">
				<h5 className="table-heading">Expense Details</h5>

				<div class="row font-13">

					<div class="col-6">
						<ul>
							<li>Expense Name:  0776109687 sms</li>
							<li>Expense Type: Administration expenses</li>
							<li>Expense Amount: <span> ZWL </span><em class="currency"></em>23000.00</li>
							<li>Reference: None</li>
						</ul>
					</div>

					<div class="col-6">
						<ul>
							<li>Date Created: April 28, 2021</li>
							<li>Created By: Theresa</li>
							<li>Purchase Date: Nov. 1, 2021</li>
							<li>Description: </li>
						</ul>
					</div>

				</div>
				<div className="btn-flex-space-btwn">
					<NavLink className="btn btn-default" to="/viewexpenses"><i class="uil uil-arrow-left"></i>Back</NavLink>
				</div>

			</div>
		</div>
    );
}

export default ExpenseDetails;