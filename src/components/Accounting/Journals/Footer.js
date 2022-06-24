import React from 'react';

const Footer = () => {
    return (
        <div className="footer-container font-12">

            <div className="text">
                <i class="uil uil-exclamation-triangle"></i> 
                <span>All journals have been loaded</span>
            </div>

            {/* when loading more uncomment the code below and comment the div with className text above  */}

            {/* <div className="load-btn">
                <button className="btn btn-olive">Load More</button>
            </div> */}
            
        </div>
    );
}

export default Footer;