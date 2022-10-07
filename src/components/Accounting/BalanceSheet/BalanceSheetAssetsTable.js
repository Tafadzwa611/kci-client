import React from 'react';
import { Link } from "react-router-dom";

const BalanceSheetAssetsTable = ({
    balanceSheet,
    setModalHeader,
    setGlCodes,
    setReason,
    setCat,
    setAccountType,
    setOpen
}) => {
    async function handleClick (evt) {
        setModalHeader(evt.target.name);
        setGlCodes(evt.target.dataset.glcodes);
        setReason(evt.target.dataset.reason);
        setCat(evt.target.dataset.cat);
        setAccountType(evt.target.dataset.at);
        setOpen(curr => !curr)
    }

    return (
        <>
            <div style={{width:"48%"}}>
                <table className='table table-bordered table-condensed table-hover'>
                    <tbody>
                        <tr className="journal-details">
                            <td colSpan='3' className='text-center'>
                                <b>ASSETS</b>
                            </td>
                        </tr>
                        <tr>
                            <td className="text-blue">
                                <b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Cash and Cash Equivalents</b>
                            </td>
                            <td></td>
                            <td style={{textAlign: 'right'}} className='text-bold'>
                                <input
                                    type="text"
                                    value={balanceSheet.cash_and_cash_equivalents_total}
                                    className="custom-select-form row-form input-background"
                                    readOnly={true}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Link
                                    to='#'
                                    style={{cursor: 'pointer'}}
                                    onClick={handleClick}
                                    name='Cash on hand'
                                    data-glcodes='2100'
                                    data-at='ASSET'
                                    data-cat='Cash'
                                >
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Cash on hand
                                </Link>
                            </td>
                            <td style={{textAlign: 'right'}}>
                                <input
                                    type="text"
                                    value={balanceSheet.cash_on_hand}
                                    className="custom-select-form row-form input-background"
                                    readOnly={true}
                                />
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>
                                <Link
                                    to='#'
                                    style={{cursor: 'pointer'}}
                                    onClick={handleClick}
                                    name='Cash in bank'
                                    data-glcodes='2100'
                                    data-at='ASSET'
                                    data-cat='Ecocash,Onemoney,Telecash,Bank Transfer'
                                >
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Cash in bank
                                </Link>
                            </td>
                            <td style={{textAlign: 'right'}}>
                                <input
                                    type="text"
                                    value={balanceSheet.cash_in_bank}
                                    className="custom-select-form row-form input-background"
                                    readOnly={true}
                                />
                            </td>
                            <td></td>
                        </tr>
                        {balanceSheet.financial_assets.length > 0 &&
                        <tr>
                            <td className="text-blue">
                                <b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Financial assets held for trading</b>
                            </td>
                            <td></td>
                            <td style={{textAlign: 'right'}} className='text-bold'>
                                <input
                                    type="text"
                                    value={balanceSheet.financial_assets_total}
                                    className="custom-select-form row-form input-background"
                                    readOnly={true}
                                />
                            </td>
                        </tr>}
                        {balanceSheet.financial_assets.map(fa => {
                            return (
                                <tr key={fa.general_ledger_name}>
                                    <td>
                                        <Link
                                            to='#'
                                            style={{cursor: 'pointer'}}
                                            onClick={handleClick}
                                            name={fa.general_ledger_name}
                                            data-glcodes='2800'
                                            data-at='ASSET'
                                        >
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fa.general_ledger_name}
                                        </Link>
                                    </td>
                                    <td style={{textAlign: 'right'}}>
                                        <input
                                            type="text"
                                            value={fa.account_balance}
                                            className="custom-select-form row-form input-background"
                                            readOnly={true}
                                        />
                                    </td>
                                    <td></td>
                                </tr>
                            )
                        })}
                        <tr>
                            <td className="text-blue">
                                <b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Total Loans-Gross</b>
                            </td>
                            <td></td>
                            <td style={{textAlign: 'right'}} className="text-bold">
                                <input
                                    type="text"
                                    value={balanceSheet.loan_portfolio_total_value}
                                    className="custom-select-form row-form input-background"
                                    readOnly={true}
                                />
                            </td>
                        </tr>
                        {balanceSheet.loan_portfolio.map(lp => {
                            return (
                                <tr key={lp.reason_for_borrowing}>
                                    <td>
                                        <Link
                                            to='#'
                                            style={{cursor: 'pointer'}}
                                            onClick={handleClick}
                                            name={lp.reason_for_borrowing}
                                            data-glcodes='2300'
                                            data-reason={lp.reason_for_borrowing}
                                            data-at='ASSET'
                                        >
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{lp.reason_for_borrowing}
                                        </Link>
                                    </td>
                                    <td style={{textAlign: 'right'}}>
                                        <input
                                            type="text"
                                            value={lp.loans_total_value}
                                            className="custom-select-form row-form input-background"
                                            readOnly={true}
                                        />
                                    </td>
                                    <td></td>
                                </tr>
                            )
                        })}
                        <tr>
                            <td className='text-blue'><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Net Loan Portfolio</b></td>
                            <td></td>
                            <td style={{textAlign: 'right'}} className='text-bold'>
                                <input
                                    type='text'
                                    value={balanceSheet.loan_portfolio_total_value}
                                    className='custom-select-form row-form input-background'
                                    readOnly={true}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Link
                                    to='#'
                                    style={{cursor: 'pointer'}}
                                    onClick={handleClick}
                                    name='Other short-term assets'
                                    data-glcodes='2400,2600'
                                    data-at='ASSET'
                                >
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Other short-term assets
                                </Link>
                            </td>
                            <td style={{textAlign: 'right'}}>
                                <input
                                    type='text'
                                    value={balanceSheet.other_current_assets}
                                    className='custom-select-form row-form input-background'
                                    readOnly={true}
                                />
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <td className='text-blue'>
                                <b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Total Current Assets</b>
                            </td>
                            <td></td>
                            <td style={{textAlign: 'right'}}>
                                <input
                                    type='text'
                                    value={balanceSheet.total_current_assets}
                                    className='custom-select-form row-form input-background'
                                    readOnly={true}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Link
                                    to='#'
                                    style={{cursor: 'pointer'}}
                                    onClick={handleClick}
                                    name='Fixed assets'
                                    data-glcodes='2500'
                                    data-at='ASSET'
                                >
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Fixed assets
                                </Link>
                            </td>
                            <td style={{textAlign: 'right'}}>
                                <input
                                    type='text'
                                    value={balanceSheet.total_fixed_assets}
                                    className='custom-select-form row-form input-background'
                                    readOnly={true}
                                />
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <td className='text-blue'>
                                <b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Total Assets</b>
                            </td>
                            <td></td>
                            <td style={{textAlign: 'right'}}>
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
        </>
    )
}

export default BalanceSheetAssetsTable;