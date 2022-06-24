import React from 'react';

const Header = () => {
    return (
        <div className="header-container font-12">
            <select disabled>
                <option value="-id">Show top borrowers first</option>
                <option value="id">Show old borrowers last</option>
            </select>
            <div style={{display:"none"}}>
                Showing 1 of 100 loans
            </div>
        </div>
    );
}

export default Header;