import React from 'react';

const Header = () => {
    return (
        <div className="header-container font-12">
            <select disabled>
                <option value="-id">Show newest first</option>
                <option value="id">Show oldest first</option>
            </select>
            <div>
                Showing 1 of 100 loans
            </div>
        </div>
    );
}

export default Header;