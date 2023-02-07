import React from 'react';

const Header = ({
    order,
    changeOrder,
    journalCount,
    disableSelect,
    numberOfJournalsLoaded,
    asStatement,
    setAsStatement,
    accountId,
  }) => {
    return (
        <div className="header-container font-12" style={{padding:"0", border:"none"}}> 
            {
                !asStatement && 
                    <select onChange={changeOrder} value={order} disabled={disableSelect} style={{margin:"0"}}>
                        <option value={'-date_created'}>Show newest first</option>
                        <option value={'date_created'}>Show oldest first</option>
                    </select>
            }
            <div style={{margin:"0", display:"flex", columnGap:"10px"}}>
                <div style={{margin:"0"}}>{accountId != '' && <>View As Account Statement <input type='checkbox' value={asStatement} onChange={e => setAsStatement(curr => !curr)}/></>}</div>
                <div style={{margin:"0"}}>Showing {numberOfJournalsLoaded} of {journalCount} journals.</div>
            </div>
        </div>
    );
}

export default Header;