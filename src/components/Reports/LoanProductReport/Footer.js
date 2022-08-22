import React from 'react';
import { convertDate } from '../../Accounting/Journals/utils';

const Footer = ({ minDate, maxDate }) => {
    return (
        <div className="footer-container font-12">

            <div className="text">
                <i class="uil uil-exclamation-triangle"></i> 
                <span>Showing summary of loans created between {convertDate(minDate)} and {convertDate(maxDate)}.</span>
            </div>
            
        </div>
    );
}

export default Footer;