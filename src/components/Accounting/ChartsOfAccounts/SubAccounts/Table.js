import React from 'react';
import { convertDate } from '../../Journals/utils';
import AccountStatement from './AccountStatement/AccountStatement';

const Table = ({ subaccounts, accStatement, setAccStatement, selectedSubAccID, setSelectedSubAccID }) => {

    const [generalLedgerName, setGeneralLedgerName] = React.useState(null)
    const [generalLedgerCode, setGeneralLedgerCode] = React.useState(null)
    const [generalLedgerAccCreationDate, setGeneralLedgerAccCreationDate] = React.useState(null)
    const [generalLedgerBalance, setGeneralLedgerBalance] = React.useState(null)
    const [transactions, setTransactions] = React.useState([]);

    const handleClickSubAcc = (evt) => {
        setSelectedSubAccID(evt.target.id)
        if (evt.target.id != selectedSubAccID){
            setAccStatement(true)
            setTransactions([])
        }else{
            setAccStatement(curr => !curr)
        }
    }

    const getGLN = async () => {
        const subacc = await subaccounts.filter(acc => acc.id == selectedSubAccID)
        if (subacc.length == 1){
            setGeneralLedgerName(subacc[0].general_ledger_name)
            setGeneralLedgerCode(subacc[0].general_ledger_code)
            setGeneralLedgerAccCreationDate(subacc[0].date_created)
            setGeneralLedgerBalance(subacc[0].account_balance)
        }
    }

    React.useEffect(() => {
        getGLN();
    }, [selectedSubAccID])

    return (
        <div style={{padding:"0", border:"none", marginTop:"2rem"}} className={accStatement ? 'table-container journal__table font-12' :'table-container full__width font-12'}>
            <div className={accStatement ? "table-responsive journal__table-container acc__statement" : "table-responsive full__table"}>
                <div style={{position:"sticky", top:"0"}}>

                    {subaccounts != "" && 
                        <table className="table">
                            <thead>
                                {accStatement ?
                                    <tr className="journal-details header" style={{position:"sticky", top:"0"}}>
                                        <th>GL Code</th>
                                    </tr>:
                                    <tr className="journal-details header" style={{position:"sticky", top:"0"}}>
                                        <th>Date Created</th>
                                        <th>GL Code</th>
                                        <th>Sub Account Name</th>
                                        <th>Currency</th>
                                        <th>Balance</th>
                                    </tr>
                                }
                            </thead>
                            <tbody>
                                {subaccounts.map(account => {
                                    if (accStatement){
                                        if (selectedSubAccID == account.id) {
                                            return (
                                                <tr key={account.id}>
                                                    <td>
                                                        <span 
                                                            onClick={handleClickSubAcc} 
                                                            id={account.id} 
                                                            style={{fontSize:"0.75rem",color:"red", cursor:"pointer"}} 
                                                            className="link">
                                                            {account.general_ledger_code}
                                                        </span>
                                                    </td>
                                                </tr>
                                            )
                                        }else{
                                            return (
                                                <tr key={account.id}>
                                                    <td>
                                                        <span 
                                                            onClick={handleClickSubAcc} 
                                                            id={account.id} 
                                                            style={{fontSize:"0.75rem", cursor:"pointer"}} 
                                                            className="link">
                                                            {account.general_ledger_code}
                                                        </span>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    }else {
                                        return (
                                            <tr key={account.id}>
                                                <td>{convertDate(account.date_created)}</td>
                                                <td>
                                                     <span 
                                                         onClick={handleClickSubAcc} 
                                                         id={account.id} 
                                                         style={{fontSize:"0.75rem", cursor:"pointer"}} 
                                                         className="link">
                                                         {account.general_ledger_code}
                                                     </span>
                                                 </td>
                                                <td>{account.general_ledger_name}</td>
                                                <td>{account.currency_shortname}</td>
                                                <td>{account.account_balance}</td>
                                            </tr>
                                        )
                                    }
                                })}
                            </tbody>
                        </table>
                    }

                    {subaccounts == "" && 
                        <div style={{textAlign:"center"}} className="text-light">
                            <span>Account type has no sub accounts.</span>
                        </div>
                    }
                    
                </div>
                {accStatement && (
                    <AccountStatement 
                        selectedSubAccID={selectedSubAccID} 
                        setAccStatement={setAccStatement} 
                        generalLedgerName={generalLedgerName} 
                        generalLedgerCode={generalLedgerCode}
                        generalLedgerAccCreationDate={generalLedgerAccCreationDate}
                        generalLedgerBalance={generalLedgerBalance}
                        transactions={transactions}
                        setTransactions={setTransactions}
                    />
                )}
            </div>
        </div>
    )
}

export default Table;