import React from 'react';
import { makeRequest } from '../../../../utils/utils';
import MiniLoader from '../../../Loader/MiniLoader';
import { convertDate } from '../../Journals/utils';
import CreateSubAccountModal from './CreateSubAccount/CreateSubAccountModal';
import { AddCashAccountForm, AddAccountForm } from './CreateSubAccount/Forms';

const SubAccounts = ({selectedMainAccID, setAccDetails, generalLedgerName, generalLedgerCode}) => {

    const [subAccounts, setSubAccounts] = React.useState([]);
    const [currencies, setCurrencies] = React.useState(null);
    const [open, setOpen] = React.useState(false);

    const fetchSubAccounts = React.useCallback(async function({selectedMainAccID}) {
        let url = `/acc-api/sub_accounts_api/?main_acc=${selectedMainAccID}`;
        const response = await makeRequest.get(url, {timeout: 8000});
        if (response.ok) {
            let result = await response.json();
            setSubAccounts(result);
        }
    }, [])

    React.useEffect(() => {
        fetchCurrencies();
        fetchSubAccounts({selectedMainAccID});
    }, [selectedMainAccID]);

    const fetchCurrencies = React.useCallback(async function() {
        const response = await makeRequest.get('/usersapi/list_currencies/', {timeout: 8000});
        if (response.ok) {
            let currencies = await response.json();
            setCurrencies(currencies);
        }
    }, []);

    if (currencies===null) {
        return <MiniLoader />
    }


    return (
        <div style={{maxHeight:"800px"}}>
            {generalLedgerCode == '2100' ?
                <CreateSubAccountModal open={open} setOpen={setOpen} modalContent={<AddCashAccountForm  setSubAccounts={setSubAccounts} currencies={currencies} mainAccountId={selectedMainAccID} setOpen={setOpen}/>} /> :
                <CreateSubAccountModal open={open} setOpen={setOpen} modalContent={<AddAccountForm  setSubAccounts={setSubAccounts} currencies={currencies} mainAccountId={selectedMainAccID} setOpen={setOpen}/>} />
            }
            <div style={{position:"sticky", top:"0", width:"100%"}}>
                <div style={{display:"flex", flexDirection:"column"}} className="j-details-container">
                    <div style={{padding:"1.5rem", display:"flex", justifyContent:"space-between"}}>
                        <div>
                            <button type='button' className='btn btn-success' onClick={(e) => setOpen(curr => !curr)} 
                                id="add-sub-account">Add Sub Account
                            </button>
                        </div>
                        <div >
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