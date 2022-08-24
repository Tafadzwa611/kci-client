import React from 'react';

const Header = ({ dateOfReport }) => {
    return (
        <div className="header-container font-12" style={{border:"none", padding:"0"}}>
            <div>
                Daily Report {dateOfReport != '' && `on ${(new Date(dateOfReport)).toDateString()}`}
            </div>
            <div style={{display:"none"}}>
                Showing 1 of 100 loans
            </div>
        </div>
    );
}

export default Header;