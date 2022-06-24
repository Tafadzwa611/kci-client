import React from 'react';

const Footer = () => {
    return (
        <div className="footer-container font-12">

            <div className="text">
                <i class="uil uil-exclamation-triangle"></i> 
                <span>Showing summary of loans created between 01 April 2022 and 07 April 2022.</span>
            </div>

            {/* when loading more uncomment the code below and comment the div with className text above  */}

            {/* <div className="load-btn">
                <button className="btn btn-olive">Load More</button>
            </div> */}
            
        </div>
    );
}

export default Footer;