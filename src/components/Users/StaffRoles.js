import React from 'react';
import { NavLink } from 'react-router-dom';

const StaffRoles = () => {
    return (
		<div className="card slide">
			<div className="card-body">
				<h5 className="table-heading">Staff Roles</h5>

				<div style={{margin:"20px 0"}}>
					<NavLink className="btn btn-success" to="/addstaffrole">Add Staff Role</NavLink><br/>
				</div>

				<div className="table-responsive font-12">
					<table className="table table-hover">
						<tbody>
							<tr className="bg-gray">
								<th>Staff_Role_Name</th>
								<th>Permissions</th>
								<th>Edit</th>
							</tr>
						
							<tr className="table-row">
								<td>
									Admin
								</td>
								<td>
									<NavLink className="btn btn-info" to="/addstaffrole">Permissions</NavLink><br/>
								</td>
								<td>
										<a type="button" className="btn btn-default" href="">Edit</a>
								</td>
							</tr>
						
							<tr className="table-row">
								<td>
									Loans Officer
								</td>
								<td>
									<NavLink className="btn btn-info" to="/addstaffrole">Permissions</NavLink><br/>
								</td>
								<td>
										<a type="button" className="btn btn-default" href="">Edit</a>
								</td>
							</tr>
						
						</tbody>
					</table>
				</div>
				<div className="btn-flex-space-btwn">
					<NavLink className="btn btn-default" to="/staff"><i class="uil uil-arrow-left"></i>Back</NavLink>
				</div>

			</div>
		</div>
    );
}

export default StaffRoles;