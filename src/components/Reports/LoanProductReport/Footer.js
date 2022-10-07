import React from 'react';
import { convertDate } from '../../Accounting/Journals/utils';

const Footer = ({ minDate, maxDate }) => {
    return (
        <div className="footer-container font-12 text-light">

            <div className="text" style={{borderLeft:"none", borderRight:"none"}}>
                <i className="uil uil-exclamation-triangle"></i> 
                <span>Showing summary of loans created between {convertDate(minDate)} and {convertDate(maxDate)}.</span>
            </div>
            
        </div>
    );
}

export default Footer;