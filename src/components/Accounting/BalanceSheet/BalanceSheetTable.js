
import React from 'react';
import Error from './Error';
import MiniLoader from '../../Loader/MiniLoader';
import Empty from './Empty';
import Export from '../ChartsOfAccounts/SubAccounts/AccountStatement/Export';
import BalanceSheetAssetsTable from './BalanceSheetAssetsTable';
import BalanceSheetEquityLiabs from './BalanceSheetEquityLiabs';
import { makeRequest, getFormattedDate } from '../../../utils/utils';
import BalanceSheetModal from './BalanceSheetModal';

const BalanceSheetTable = ({
    balanceSheet,
    loading,
    errorloading,
    errorMessage,
    asAtDate,
    branchIds
}) => {
    const [modalHeader, setModalHeader] = React.useState('');
    const [modalAccounts, setModalAccounts] = React.useState([]);
    const [glCodes, setGlCodes] = React.useState('');
    const [glName, setGlName] = React.useState('');
    const [reason, setReason] = React.useState('');
    const [cat, setCat] = React.useState('');
    const [accountType, setAccountType] = React.useState('');
    const [loadingModalAccounts, setLoadingModalAccounts] = React.useState(false);
    const [open, setOpen] = React.useState(false);


    React.useEffect(() => {
        console.log('working')
        console.log(glCodes)
        if (glCodes !== '') {
            fetchModalAccounts();
        }
        // setGlCodes('');
    }, [glCodes])

    // React.useEffect(async function() {
    //     if (glCodes !== '') {
    //         await fetchModalAccounts();
    //     }
    //     setGlCodes('');
    // }, [glCodes]);

    async function fetchModalAccounts() {
        try {
            setLoadingModalAccounts(true);
            const url = getUrl();
            const response = await makeRequest.get(url, {timeout: 8000});
            console.log(response)
            if (response.ok) {
                const data = await response.json();
                setModalAccounts(data);
                return setLoadingModalAccounts(false);
            }
        }catch (error) {
            if (error.name === 'AbortError') {
                console.log('Network error please try again!');
            }else {
                console.log(error);
                console.log('Unexpected error please contact support!');
            }
        }
    }

    const getUrl = () => {
        if (accountType === 'ASSET') {
            if (glCodes.includes('2100')) {
                return `/acc-api/balance-sheet-summary/?branchIds=${branchIds}&asAtDate=${getFormattedDate(asAtDate, 'mm/dd/yyyy')}&glCodes=${glCodes}&cat=${cat}`
            }
            if (glCodes.includes('2300')) {
                return `/acc-api/balance-sheet-loan-portfolio-accounts/?branchIds=${branchIds}&asAtDate=${getFormattedDate(asAtDate, 'mm/dd/yyyy')}&reason=${reason}`
            }
            return `/acc-api/balance-sheet-summary/?branchIds=${branchIds}&asAtDate=${getFormattedDate(asAtDate, 'mm/dd/yyyy')}&glCodes=${glCodes}`
        }else {
            return `/acc-api/balance-sheet-liab-summary/?branchIds=${branchIds}&asAtDate=${getFormattedDate(asAtDate, 'mm/dd/yyyy')}&glCode=${glCodes}&glName=${glName}`
        }
    }

    if (errorloading) {
        return (
            <Error errorMessage={errorMessage}/>
        )
    }

    if (loading) {
        return (
            <MiniLoader />
        )
    }

    if (Object.keys(balanceSheet).length === 0) {
        return (
            <Empty message='Select date of balance sheet and at least one branch'/>
        )
    }

    const getExportData = () => {
        let data = [
            {
                'Account Name' : 'Total Cash',
                'Account Balance': null,
                'Total': Number(balanceSheet.cash_on_hand) + Number(balanceSheet.cash_in_bank)
            },
            {
                'Account Name' : 'Cash on hand',
                'Account Balance': balanceSheet.cash_on_hand,
                'Total': null
            },
            {
                'Account Name' : 'Cash in bank',
                'Account Balance': balanceSheet.cash_in_bank,
                'Total': null
            },
            {
                'Account Name' : 'Financial assets held for trading',
                'Account Balance': null,
                'Total': Number(balanceSheet.financial_assets_total)
            },
        ]

        const financialAssetsHeldForTrading = balanceSheet.financial_assets.map(asset => {
            return {
                'Account Name' : asset.general_ledger_name,
                'Account Balance' : asset.account_balance,
                'Total': null
            }
        })

        data = [...data, ...financialAssetsHeldForTrading];

        data.push({
            'Account Name' : 'Total Loans-Gross',
            'Account Balance' : null,
            'Total' : Number(balanceSheet.loan_portfolio_total_value),
        });

        const loanPortfolio = balanceSheet.loan_portfolio.map(reason => {
            return {
                'Account Name' : reason.reason_for_borrowing,
                'Account Balance' : reason.loans_total_value,
                'Total': null
            }
        })

        data = [...data, ...loanPortfolio];

        data.push({
            'Account Name' : 'Other short-term assets',
            'Account Balance' : balanceSheet.other_current_assets,
            'Total' : null,
        });

        data.push(
            {
                'Account Name' : 'Total Current Assets',
                'Account Balance' : null,
                'Total' : Number(balanceSheet.total_current_assets),
            },
            {
                'Account Name' : 'Fixed assets',
                'Account Balance' : balanceSheet.total_fixed_assets,
                'Total' : null,
            },
            {
                'Account Name' : 'Total Assets',
                'Account Balance' : null,
                'Total' : Number(balanceSheet.total_assets)
            },
            {
                'Account Name' : 'Short term debt',
                'Account Balance' : null,
                'Total' : Number(balanceSheet.total_short_term_liabilities)
            }
        );

        const shortTermDebt = balanceSheet.short_term_liabilities.map(liab => {
            return {
                'Account Name' : liab.general_ledger_name,
                'Account Balance' : liab.account_balance,
                'Total': null
            }
        })

        data = [...data, ...shortTermDebt];

        data.push({
            'Account Name' : 'Long term debt',
            'Account Balance' : null,
            'Total' : Number(balanceSheet.total_long_term_liabilities)
        });

        const longTermDebt = balanceSheet.long_term_liabilities.map(liab => {
            return {
                'Account Name' : liab.general_ledger_name,
                'Account Balance' : liab.account_balance,
                'Total': null
            }
        })

        data = [...data, ...longTermDebt];

        data.push({
            'Account Name' : 'Total liabilities',
            'Account Balance' : null,
            'Total' : Number(balanceSheet.total_liabilities)
        });

        data.push({
            'Account Name' : 'EQUITY',
            'Account Balance' : null,
            'Total' : Number(balanceSheet.total_equity)
        });

        const equity = balanceSheet.equity.map(acc => {
            return {
                'Account Name' : acc.general_ledger_name,
                'Account Balance' : acc.account_balance,
                'Total': null
            }
        });

        data = [...data, ...equity];

        return data
    }

    return (
        <div style={{marginTop:"2rem"}}>
            <Export csvData={getExportData()} fileName='Balance Sheet'/>
            <BalanceSheetModal 
                modalHeader={modalHeader} 
                modalAccounts={modalAccounts} 
                loadingModalAccounts={loadingModalAccounts}
                setModalAccounts={setModalAccounts}
                open={open}
                setOpen={setOpen}
            />
            <div>
                <form className='form-horizontal'>
                    <div style={{display:"flex", justifyContent:"space-between"}}>
                        <BalanceSheetAssetsTable
                            setCat={setCat}
                            setReason={setReason}
                            setGlCodes={setGlCodes}
                            balanceSheet={balanceSheet}
                            setModalHeader={setModalHeader}
                            fetchModalAccounts={fetchModalAccounts}
                            setAccountType={setAccountType}
                            setOpen={setOpen}
                        />
                        <BalanceSheetEquityLiabs
                            setGlName={setGlName}
                            setGlCodes={setGlCodes}
                            balanceSheet={balanceSheet}
                            setModalHeader={setModalHeader}
                            setAccountType={setAccountType}
                            setOpen={setOpen}
                        />
                    </div>

                    <div style={{display:"flex", justifyContent:"space-between"}}>
                        <div className='col-sm-6'>
                            <table className='table table-bordered table-condensed table-hover'>
                                <tbody>
                                    <tr className='info'>
                                        <td><b>TOTAL ASSETS</b></td>
                                        <td style={{textAlign: 'right'}} className='text-bold'>
                                            <input
                                                type='text'
                                                value={balanceSheet.total_assets}
                                                className='custom-select-form row-form input-background'
                                                readOnly={true}
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className='col-sm-6'>
                            <table className='table table-bordered table-condensed table-hover'>
                                <tbody>
                                    <tr className='info'>
                                        <td><b>TOTAL LIABILITIES AND EQUITY</b></td>
                                        <td style={{textAlign: 'right'}} className='text-bold'>
                                            <input
                                                type='text'
                                                value={balanceSheet.total_liabilities_and_equity}
                                                className='custom-select-form row-form input-background'
                                                readOnly={true}
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default BalanceSheetTable;