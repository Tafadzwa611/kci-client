import React from 'react';

const Footer = () => {
    return (
        <div className="load-more-container card-body footer" style={{ borderTop:"0"}}>
            <p className="load-more-container-left">
                Showing 10 of 1200
            </p>
            <button className="btn btn-info">Load More</button>
        </div>
    );
}

export default Footer;