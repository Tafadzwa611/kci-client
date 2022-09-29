import React from 'react';
import DateRange from './DateRange';
import Empty from './Empty';
import AccountTransactions from './AccountTransactions';
import { makeRequest, getFormattedDate } from '../../../../../utils/utils';
import MiniLoader from '../../../../Loader/MiniLoader';

const AccountStatement = (
    {selectedSubAccID, 
    setAccStatement, 
    generalLedgerName, 
    generalLedgerCode, 
    generalLedgerAccCreationDate, 
    generalLedgerBalance,
    generalLedgerCurrency,
    transactions,
    setTransactions}
    ) => {

    const [account, setAccount] = React.useState({});
    const [transactionsLoading, setTransactionsLoading] = React.useState(false);
    const [loadingMoreTransactions, setLoadingMoreTransactions] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
    const [openingBalance, setOpeningBalance] = React.useState(null);
    const [emptyMessage, setEmptyMessage] = React.useState("Select date range to view transactions.");
    const [minDate, setMinDate] = React.useState("");
    const [maxDate, setMaxDate] = React.useState("");
    const urlRef = React.useRef("");
    const queryParams = React.useRef({});
    const isFirstRun = React.useRef(true);


    const fetchAccountDetails = React.useCallback(async function({selectedSubAccID}) {
        const response = await makeRequest.get(`/acc-api/sub-account-details/${selectedSubAccID}`, {timeout: 8000});
        if (response.ok) {
            let account = await response.json();
            setAccount(account);
        }
    }, []);

    const fetchAccountTxns = React.useCallback(async function() {
        const response = await makeRequest.get(urlRef.current, {timeout: 8000});
        if (response.ok) {
            let result = await response.json();
            urlRef.current = result.next;
            setTransactions(transactions => [...transactions, ...result.transactions]);
            if (isFirstRun.current) {
                isFirstRun.current = false;
                setOpeningBalance(result.opening_balance);
            }
            setTransactionsLoading(false);
            setLoadingMoreTransactions(false);
        }
    }, [])

    React.useEffect(() => {
        fetchAccountDetails({selectedSubAccID});
    }, [selectedSubAccID]);

    React.useEffect(() => {
        if (minDate !== '' && maxDate !== '') {
            if (minDate > maxDate) {
                setError(true);
                setErrorMessage("End Date should be greater than Start Date.");
                return
            }
            setError(false);
        }
    }, [minDate, maxDate]);

    React.useEffect(() => {
        if (isFirstRun.current){return}
        if (transactions.length === 0) {
            setEmptyMessage("No transactions were found in the selected date range.");
        }
    }, [transactions]);

    const fetchData = (e) => {
        e.preventDefault();
        setTransactionsLoading(true);
        setTransactions([]);
        isFirstRun.current = true;
        if (minDate !== "") {
            queryParams.current['minDate'] = getFormattedDate(minDate, 'mm/dd/yyyy');
        }

        if (maxDate !== "") {
            queryParams.current['maxDate'] = getFormattedDate(maxDate, 'mm/dd/yyyy');
        }

        const queryString = Object.keys(queryParams.current).map(key => key + '=' + queryParams.current[key]).join('&');
        urlRef.current = `/acc-api/account-transactions/${selectedSubAccID}?${queryString}`;
        fetchAccountTxns();
    }

    const viewMore = (e) => {
        e.preventDefault();
        setLoadingMoreTransactions(true);
        fetchAccountTxns();
    }

    const Reset = (evt) => {
        evt.preventDefault();
        setEmptyMessage("Select date range to view transactions.");
        setMinDate("");
        setMaxDate("");
        setTransactions([]);
        isFirstRun.current = true;
    }

    return (
        <div style={{maxHeight:"800px"}}>

            <div style={{position:"sticky", top:"0", width:"100%"}}>
                <div style={{display:"flex", flexDirection:"column"}} className="j-details-container">

                    <div className="row" style={{marginTop:"0"}}>
                        <div className="col-12" style={{display:"flex", justifyContent:"flex-end", padding:"1.5rem", paddingBottom:"0"}}>
                            <button><a onClick={e => setAccStatement(false)} className="btn btn-default" style={{borderRadius:"0"}}>Close</a></button>
                        </div>
                    </div>

                    <div className="journal-details header" style={{display:"flex", flexDirection:"row", justifyContent:"space-between", marginTop:"0"}}>
                        <div>
                            <b>{generalLedgerName} - {generalLedgerCode}</b>
                        </div>
                        <div>
                            <b style={{fontSize:"1rem"}}>{generalLedgerCurrency} {generalLedgerBalance}</b>
                        </div>
                    </div>

                    <DateRange 
                        minDate={minDate}
                        setMinDate={setMinDate}
                        maxDate={maxDate}
                        setMaxDate={setMaxDate}
                        buttonLabel1="Fetch"
                        buttonLabel2="Reset!"
                        fetchData={fetchData}
                        Reset={Reset}
                    />
                    {transactionsLoading ?
                        <div style={{margin:"0 1.5rem"}}><MiniLoader /> </div> :
                        transactions.length === 0 ? 
                            <Empty message={emptyMessage} /> :
                            <AccountTransactions
                                openingBalance={openingBalance}
                                transactions={transactions}
                                nextUrl={urlRef.current}
                                viewMore={viewMore}
                                loadingMoreTransactions={loadingMoreTransactions}
                                general_ledger_name={account.general_ledger_name}
                            />
                    }

                </div>
            </div>

        </div>
    )
}

export default AccountStatement;