import React from 'react';

const Header = ({
    changeOrder,
    order,
    disableSelect,
    numberOfLoansLoaded,
    loanCount
  }) => {
    return (
        <div className="header-container font-12" style={{padding:"0", border:"none", marginTop:"0", display:"flex", alignItems:"center", columnGap:"10px"}}>
            <select onChange={changeOrder} value={order} disabled={disableSelect} style={{margin:"0"}}>
                <option value={'-id'}>Show newest first</option>
                <option value={'id'}>Show oldest first</option>
            </select>
            <div style={{margin:"0"}}>
                Showing {numberOfLoansLoaded} of {loanCount} loans.
            </div>
        </div>
    );
}

export default Header;