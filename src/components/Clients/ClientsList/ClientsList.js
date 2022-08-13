import React from 'react';
import ClientList from '../ClientList';
import ClientSearchForm from '../ClientSearchForm';


const ClientsList = () => {

    return (
        <div className="font-12">
                <ClientSearchForm/>

                <ClientList />
                <div className="table-footer-container card-body clients_table">
                    <div className="table-footer-up">
                        <p className="load-more-container-left">
                            Showing 10 of 1200
                        </p>
                        <button className="btn btn-info">Load More</button>
                    </div>
                    {/* <div className="all-data-loaded">
                        <i class="uil uil-exclamation-triangle"></i> 
                        <span>All clients have been loaded</span>
                    </div> */}
                </div>


        </div>
    );
}

export default ClientsList;