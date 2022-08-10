import React from 'react';
import { Link } from "react-router-dom";

const BalanceSheetEquityLiabs = ({
    balanceSheet,
    setModalHeader,
    setGlCodes,
    setAccountType,
    setGlName,
    setOpen
}) => {
    async function handleClick (evt) {
        setModalHeader(evt.target.name);
        setGlCodes(evt.target.dataset.glcodes);
        setAccountType(evt.target.dataset.at);
        setGlName(evt.target.name);
        setOpen(curr => !curr)
    }

    return (
        <div style={{width:"48%"}}>
            <table className="table table-bordered table-condensed table-hover">
                <tbody>
                    <tr style={{backgroundColor: '#F2F8FF'}}>
                        <td colSpan="3" className="text-center"><b>LIABILITY AND EQUITY</b></td>
                    </tr>
                    <tr>
                        <td className="text-blue">
                            <b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Short term debt</b>
                        </td>
                        <td></td>
                        <td style={{textAlign: 'right'}} className="text-bold">
                            <input
                                type="text"
                                value={balanceSheet.total_short_term_liabilities}
                                className="custom-select-form row-form input-background"
                                readOnly={true}
                            />
                        </td>
                    </tr>
                    {balanceSheet.short_term_liabilities.map(liab => {
                        return (
                            <tr key={liab.id}>
                                <td>
                                    <Link
                                        to='#'
                                        onClick={handleClick}
                                        style={{cursor: 'pointer'}}
                                        name={liab.general_ledger_name}
                                        data-glcodes={liab.general_ledger_code}
                                        data-at='LIABILITY'
                                    >
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{liab.general_ledger_name} - {liab.branch}
                                    </Link>
                                </td>
                                <td style={{textAlign: 'right'}}>
                                    <input
                                        type="text"
                                        value={liab.account_balance}
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
                            <b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Total current liabilities</b>
                        </td>
                        <td></td>
                        <td style={{textAlign: 'right'}} className="text-bold">
                            <input
                                type="text"
                                value={balanceSheet.total_short_term_liabilities}
                                className="custom-select-form row-form input-background"
                                readOnly={true}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className="text-blue">
                            <b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Long term debt</b>
                        </td>
                        <td></td>
                        <td style={{textAlign: 'right'}} className="text-bold">
                            <input
                                type="text"
                                value={balanceSheet.total_long_term_liabilities}
                                className="custom-select-form row-form input-background"
                                readOnly={true}
                            />
                        </td>
                    </tr>
                    {balanceSheet.long_term_liabilities.map(liab => {
                        return (
                            <tr key={liab.id}>
                                <td>
                                    <Link
                                        to='#'
                                        onClick={handleClick}
                                        style={{cursor: 'pointer'}}
                                        name={liab.general_ledger_name}
                                        data-glcodes={liab.general_ledger_code}
                                        data-at='LIABILITY'
                                    >
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{liab.general_ledger_name} - {liab.branch}
                                    </Link>
                                </td>
                                <td style={{textAlign: 'right'}}>
                                    <input
                                        type="text"
                                        value={liab.account_balance}
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
                            <b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Total liabilities</b>
                        </td>
                        <td></td>
                        <td style={{textAlign: 'right'}} className="text-bold">
                            <input
                                type="text"
                                value={balanceSheet.total_liabilities}
                                className="custom-select-form row-form input-background"
                                readOnly={true}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className="text-blue">
                            <b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EQUITY</b>
                        </td>
                        <td></td>
                        <td style={{textAlign: 'right'}} className="text-bold">
                            <input
                                type="text"
                                value={balanceSheet.total_equity}
                                className="custom-select-form row-form input-background"
                                readOnly={true}
                            />
                        </td>
                    </tr>
                    {balanceSheet.equity.map(eq => {
                        return (
                            <tr key={eq.id}>
                                <td>
                                    <Link
                                        to='#'
                                        onClick={handleClick}
                                        style={{cursor: 'pointer'}}
                                        name={eq.general_ledger_name}
                                        data-glcodes={eq.general_ledger_code}
                                        data-at='EQUITY'
                                    >
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{eq.general_ledger_name} - {eq.branch}
                                    </Link>
                                </td>
                                <td style={{textAlign: 'right'}}>
                                    <input
                                        type="text"
                                        value={eq.account_balance}
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
                            <b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Total Equity</b>
                        </td>
                        <td></td>
                        <td style={{textAlign: 'right'}} className="text-bold">
                            <input
                                type="text"
                                value={balanceSheet.total_equity}
                                className="custom-select-form row-form input-background"
                                readOnly={true}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default BalanceSheetEquityLiabs;