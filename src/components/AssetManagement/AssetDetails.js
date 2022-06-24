import React from 'react';
import { NavLink } from 'react-router-dom';

const AssetDetails = () => {
    return (
		<div className="card text-light slide">
			<div className="card-body">
				<h5 className="table-heading">Asset Details</h5>

				<div class="row font-13">

					<div class="col-6">
						<ul>
							<li>Asset Name: GTEL PHONE</li>
							<li>Asset Type: COMPUTER AND EQUIPMENT</li>
							<li>Asset Cost: <span> ZWL </span><em class="currency"></em>23000.00</li>
							<li>Salvage Cost: <span> ZWL </span><em class="currency"></em>0.00</li>
							<li>Useful Life: 5.00</li>
							<li>Date Created: Nov. 8, 2021</li>
						</ul>
					</div>

					<div class="col-6">
						<ul>
							<li>Created By: theresa chikwinya</li>
							<li>Description: GTEL PHONE TANAKA  $190USD</li>
							<li>Purchase Date: Nov. 1, 2021</li>
							<li>Bought From: GTEL</li>
							<li>Serial Number: None</li>
						</ul>
					</div>

				</div>
				<div className="btn-flex-space-btwn">
					<NavLink className="btn btn-default" to="/viewassets"><i class="uil uil-arrow-left"></i>Back</NavLink>
				</div>

			</div>
		</div>
    );
}

export default AssetDetails;