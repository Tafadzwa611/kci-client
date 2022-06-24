import React from 'react';
import { NavLink } from 'react-router-dom';

const Staff = () => {
    return (
		<div className="card slide">
			<div className="card-body">
				<h5 className="table-heading">Staff</h5>

				<div style={{margin:"20px 0"}}>
					<NavLink className="btn btn-success" to="/addstaff">Add Staff</NavLink><br/>
				</div>

				<div className="table-responsive font-12">

					<table className="table table-hover">
						<tbody>
							<tr className="bg-gray">
								<th>Name</th>
								<th>Contact_Info</th>
								<th>Role</th>
								<th>Branch </th>
								<th>Branch_Access</th>
								<th>Action</th>
							</tr>
						
							<tr className="table-row">
								<td>
									<NavLink className="link" to="/userprofile">Ivy Chimhini</NavLink><br/>
								</td>
								<td>
								<b>Email: </b>chimhiniivy@gmail.com
								</td>
								<td>
									<NavLink className="link" to="/staffroles">Loans Officer</NavLink><br/>
								</td>
								<td>Main Branch
								</td>
								<td>All Branches
								</td>
								<td>
									<div className="btn-group-vertical">
										<a type="button" className="btn btn-default" href="">Reset Password</a>
										<a type="button" className="btn btn-default" href="">Edit</a>
									</div>
								</td>
							</tr>
						
							<tr className="table-row">
								<td>
									<NavLink className="link" to="/userprofile">theresa chikwinya</NavLink><br/>
								</td>
								<td>
								<b>Email: </b>levitheoctheresa@gmail.com
								</td>
								<td>
									<NavLink className="link" to="/staffroles">Admin</NavLink><br/>
								</td>
								<td>Main Branch
								</td>
								<td>All Branches
								</td>
								<td>
									<div className="btn-group-vertical">
										<a type="button" className="btn btn-default" href="">Reset Password</a>
										<a type="button" className="btn btn-default" href="">Edit</a>
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

export default Staff;