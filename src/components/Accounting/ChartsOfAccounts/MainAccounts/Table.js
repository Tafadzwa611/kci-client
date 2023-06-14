import React from 'react';
import { convertDate } from '../../Journals/utils';
import SubAccounts from './SubAccounts';
import Pager from './Pager';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const Table = ({ mainaccounts, selectedMainAccID, setSelectedMainAccID, accDetails, setAccDetails, params, setMainAccounts }) => {

    const [generalLedgerName, setGeneralLedgerName] = React.useState(null)
    const [generalLedgerCode, setGeneralLedgerCode] = React.useState(null)

    const handleClickMainAcc = (evt) => {
        setSelectedMainAccID(evt.target.id)
        if (evt.target.id != selectedMainAccID){
            setAccDetails(true)
        }else{
            setAccDetails(curr => !curr)
        }
    }

    const getGLN = async () => {
        if (mainaccounts.mainaccounts != null){
            const main_account = await mainaccounts.mainaccounts.filter(acc => acc.id == selectedMainAccID)
            if (main_account.length == 1){
                setGeneralLedgerName(main_account[0].general_ledger_name)
                setGeneralLedgerCode(main_account[0].general_ledger_code)
            }
        }
    }

    React.useEffect(() => {
        getGLN();
    }, [selectedMainAccID])

    return (
        <>
            <TableHeader mainaccounts={mainaccounts} params={params} setMainAccounts={setMainAccounts}/>
            <div style={{padding:"0", border:"none"}} className={accDetails ? 'table-container journal__table font-12' :'table-container full__width font-12'}>
                <div className={accDetails ? "table-responsive journal__table-container" : "table-responsive full__table"}>
                    <div style={{width:'100%', overflowX:'auto'}}>
                        <div className='table__height'>
                            <table className="table" id='accounts'>
                                <thead>
                                    {accDetails ?
                                        <tr className="journal-details header" style={{position:"sticky", top:"0"}}>
                                            <th>GL Code</th>
                                            <th>Main Account Name</th>
                                        </tr>:
                                        <tr className="journal-details header" style={{position:"sticky", top:"0"}}>
                                            <th>GL Code</th>
                                            <th>Main Account Name</th>
                                            <th>Type</th>
                                            <th>Branch</th>
                                            <th>Date Created</th>
                                        </tr>
                                    }
                                </thead>
                                <tbody>
                                    {mainaccounts.mainaccounts.map(account => {
                                        if (accDetails) {
                                            if (selectedMainAccID == account.id) {
                                                return (
                                                    <tr key={account.id}>
                                                        <td>
                                                            <span 
                                                                onClick={handleClickMainAcc} 
                                                                id={account.id} 
                                                                style={{fontSize:"0.75rem",color:"red", cursor:"pointer"}} 
                                                                className="link">
                                                                {account.general_ledger_code}
                                                            </span>
                                                        </td>
                                                        <td><span style={{color:"red"}} >{account.general_ledger_name}</span></td>
                                                    </tr>
                                                )
                                            }else{
                                                return (
                                                    <tr key={account.id}>
                                                        <td>
                                                            <span 
                                                                onClick={handleClickMainAcc} 
                                                                id={account.id} 
                                                                style={{fontSize:"0.75rem", cursor:"pointer"}} 
                                                                className="link">
                                                                {account.general_ledger_code}
                                                            </span>
                                                        </td>
                                                        <td>{account.general_ledger_name}</td>
                                                    </tr>
                                                )
                                            }
                                        }else { 
                                            return (
                                                <tr key={account.id}>
                                                    <td>
                                                        <span 
                                                            onClick={handleClickMainAcc} 
                                                            id={account.id} 
                                                            style={{fontSize:"0.75rem", cursor:"pointer"}} 
                                                            className="link">
                                                            {account.general_ledger_code}
                                                        </span>
                                                    </td>
                                                    <td>{account.general_ledger_name}</td>
                                                    <td>{account.account_type}</td>
                                                    <td>{account.branch}</td>
                                                    <td>{convertDate(account.date_created)}</td>
                                                </tr>
                                            )
                                        }
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {accDetails && (
                        <SubAccounts 
                            selectedMainAccID={selectedMainAccID} 
                            setAccDetails={setAccDetails} 
                            generalLedgerName={generalLedgerName} 
                            generalLedgerCode={generalLedgerCode}
                        />
                    )}
                </div>
            </div>
        </>
    )
}

const TableHeader = ({mainaccounts, params, setMainAccounts}) => {
    return (
        <div className='table-header'>
            <div style={{display:'flex', columnGap:'10px', alignItems:'center'}}>
                <Pager
                    nextPageNumber={mainaccounts.next_page_num}
                    params={params}
                    loadMoreAccounts={() => console.log('loadMoreAccounts')}
                    loadingMore={false}
                    prevPageNumber={mainaccounts.prev_page_num}
                    setMainAccounts={setMainAccounts}
                />
                <div style={{marginTop:'6px'}}>Showing {mainaccounts.mainaccounts.length} of {mainaccounts.count} accounts.</div>
            </div>
            <div style={{display:'flex', columnGap:'10px', alignItems:'center'}}>
                <div style={{marginTop:'6px'}}>Page {mainaccounts.number} of {mainaccounts.num_of_pages}</div>
                <div>
                    <ReactHTMLTableToExcel
                        id='test-table-xls-button'
                        className='btn btn-default'
                        table='accounts'
                        filename='Main Accounts'
                        sheet='tablexls'
                        buttonText='Download as XLS'
                    />
                </div>
            </div>
        </div>
    )
}

export default Table;