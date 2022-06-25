import React from 'react';
import AssetList from './AssetList';
import Filter from './Filter';


const ViewAssets = () => {

    return (
        <div className="font-12">
            <div className="card">
                <Filter />
            </div>
            <div className="card">
                <AssetList />
                <div className="load-more-container card-body view_assets">
                    <p className="load-more-container-left">
                        Showing 10 of 1200
                    </p>
                    <button className="btn btn-info">Load More</button>
                </div>
            </div>
        </div>
    );
}

export default ViewAssets;