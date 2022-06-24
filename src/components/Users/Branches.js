import React from 'react';
import { NavLink } from 'react-router-dom';

const Branches = () => {
    return (
		<div className="card slide">
			<div className="card-body">
				<h5 className="table-heading">Branches</h5>

				<div style={{margin:"20px 0"}}>
					<NavLink className="btn btn-success" to="/addbranch">Add Branch</NavLink><br/>
				</div>

				<div className="table-responsive font-12">

					<table className="table table-hover">
						<tbody>
							<tr className="bg-gray">
								<th>Branch_Name</th>
								<th>Location</th>
								<th>Date_Added</th>
								<th>Action</th>
							</tr>
						
							<tr className="table-row">
								<td>
									<NavLink to="/branchdetails" className="link">Branch 2</NavLink><br/>
								</td>
								<td>
									Masvingo
								</td>
								<td>
									03/31/2021 
								</td>
								<td>
									<div className="btn-group-vertical">
										<a type="button" className="btn btn-default" href="">Edit</a>
										<a type="button" className="btn btn-default" href="">Add Employee</a>
									</div>
								</td>
							</tr>
						
							<tr className="table-row">
								<td>
									<NavLink to="/branchdetails" className="link">Branch 3</NavLink><br/>
								</td>
								<td>
									Marondera
								</td>
								<td>
									03/31/2021 
								</td>
								<td>
									<div className="btn-group-vertical">
										<a type="button" className="btn btn-default" href="">Edit</a>
										<NavLink className="btn btn-default" to="/addstaff">Add Employee </NavLink>
									</div>
								</td>
							</tr>
						
						</tbody>
					</table>
				</div>
				<div className="btn-flex-space-btwn">
					<NavLink className="btn btn-default" to="/admin"><i class="uil uil-arrow-left"></i>Back</NavLink>
				</div>

			</div>
		</div>
    );
}

export default Branches;