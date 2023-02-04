import React from 'react';

const Header = ({
    changeOrder,
    order,
    disableSelect
  }) => {
    return (
        <div className="header-container font-12" style={{padding:"0", border:"none", marginTop:"0"}}>
            <select onChange={changeOrder} value={order} disabled={disableSelect} style={{margin:"0"}}>
                <option value={'-id'}>Show newest first</option>
                <option value={'id'}>Show oldest first</option>
            </select>
        </div>
    );
}

export default Header;