import React from 'react';
import OnlineApplications from './OnlineApplications';
import TableSearchForm from '../TableSearchForm';
import OnlineApplicationSearchForm from './OnlineApplicationSearchForm';


const ViewOnlineApplications = () => {

    const heading = 'View Online Applications';

    return (
        <div className="font-12 slide">
            <div className="card">
                <OnlineApplicationSearchForm heading={heading}/>
            </div>
            <div className="card">
                <OnlineApplications />
                <div className="load-more-container card-body onlineapplications">
                    <p className="load-more-container-left">
                        Showing 10 of 1200
                    </p>
                    <button className="btn btn-info">Load More</button>
                </div>
            </div>

        </div>
    );
}

export default ViewOnlineApplications;