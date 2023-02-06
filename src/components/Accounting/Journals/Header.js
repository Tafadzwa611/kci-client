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
                    <select onChange={changeOrder} value={order} disabled={disableSelect}>
                        <option value={'-date_created'}>Show newest first</option>
                        <option value={'date_created'}>Show oldest first</option>
                    </select>
            }
            <div>
                Showing {numberOfJournalsLoaded} of {journalCount} journals.
                {accountId != '' && <>View As Account Statement <input type='checkbox' value={asStatement} onChange={e => setAsStatement(curr => !curr)}/></>}
            </div>
        </div>
    );
}

export default Header;