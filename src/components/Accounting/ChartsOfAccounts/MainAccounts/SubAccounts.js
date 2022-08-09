import React from 'react';
import { makeRequest } from '../../../../utils/utils';
import { convertDate } from '../../Journals/utils';

const SubAccounts = ({selectedMainAccID, setAccDetails, generalLedgerName}) => {

    const [subAccounts, setSubAccounts] = React.useState([]);
    const [mainAcc, setMainAcc] = React.useState({});

    const fetchMainAcc = React.useCallback(async function() {
        const response = await makeRequest.get(`/acc-api/account-details/${selectedMainAccID}/`, {timeout: 8000});
        if (response.ok) {
            let account = await response.json();
            setMainAcc(account);
        }
    }, []);

    const fetchSubAccounts = React.useCallback(async function({selectedMainAccID}) {
        let url = `/acc-api/sub_accounts_api/?main_acc=${selectedMainAccID}`;
        const response = await makeRequest.get(url, {timeout: 8000});
        if (response.ok) {
            let result = await response.json();
            setSubAccounts(result);
        }
    }, [])

    React.useEffect(() => {
        fetchMainAcc();
        fetchSubAccounts({selectedMainAccID});
    }, [selectedMainAccID]);

    return (
        <div style={{maxHeight:"800px"}}>

            <div style={{position:"sticky", top:"0", width:"100%"}}>
                <div style={{display:"flex", flexDirection:"column"}} className="j-details-container">
                    <div className="row" style={{marginTop:"0"}}>
                        <div className="col-12" style={{display:"flex", justifyContent:"flex-end", padding:"1.5rem"}}>
                            <button><a onClick={e => setAccDetails(false)} className="btn btn-default" style={{borderRadius:"0"}}>Close</a></button>
                        </div>
                    </div>
                    {subAccounts != "" &&
                        <div className="callout callout-info" style={{margin:"1.5rem", marginTop:"0"}}>
                            To view more on <b>{generalLedgerName}</b> sub accounts click the Sub Accounts tab above and filter the main account.
                        </div>
                    }
                    {subAccounts != "" &&
                        <table className="table" style={{marginBottom:"1.5rem"}}>
                            <thead>
                                <tr className="journal-details header" style={{position:"sticky", top:"0"}}>
                                    <th>Date Created</th>
                                    <th>GL Code</th>
                                    <th>Sub Account Name</th>
                                    <th>Currency</th>
                                    <th>Balance</th>
                                </tr>
                            </thead>
                            <tbody>
                                {subAccounts.map(account => {
                                    return (
                                        <tr key={account.id}>
                                            <td>{convertDate(account.date_created)}</td>
                                            <td>{account.general_ledger_code}</td>
                                            <td>{account.general_ledger_name}</td>
                                            <td>{account.currency_shortname}</td>
                                            <td>{account.account_balance}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    }

                    {subAccounts == "" && 
                        <div style={{textAlign:"center", marginBottom:"1.5rem"}} className="text-light">
                            <span>Main account has no sub accounts.</span>
                        </div>
                    }
                </div>
            </div>

        </div>

    )
}

export default SubAccounts;