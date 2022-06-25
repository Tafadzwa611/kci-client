import React from 'react';

const Table = () => {

    const input_border = {
        border: "1px solid #dee2e6",
        fontSize: "0.75rem"
    }

    return (
        <div className="table-container font-12 profit_and_loss_container" style={{marginTop:"40px"}}>
            <div className="table-responsive">
                <div className="col-12">
                    <table className="table">
                        <thead>
                            <tr className="table-head-row">
                                <td style={{fontWeight:"bold"}}>Income Statement</td>
                                <th className="text-right text-bold"></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="text-bold bg-green">Interest Income from Loans and Advances</td>
                                <td class="text-bold bg-green"></td>
                                <td style={{fontWeight:"bold"}} align="right">
                                    <input name="loansAndAdvances" type="text" class="form-control well" readonly="" value="ZWL 100.00" style={input_border} />
                                </td>
                            </tr>
                            <tr>
                                <td><a style={{cursor:"pointer"}} className="link" name="CONSUMER" data-type="CONSUMER" href="#/is">CONSUMER</a></td>
                                <td align="right">
                                    <input type="text" name="CONSUMER" autocomplete="off" readonly="" class="form-control well" value="ZWL 100.00" style={input_border} />
                                </td>
                            </tr>
                            <tr>
                                <td class="text-bold bg-green">Interest Income and discounts received from investments</td>
                                <td class="text-bold bg-green"></td>
                                <td style={{fontWeight:"bold"}} align="right">
                                    <input name="investments" type="text" class="form-control well" readonly="" value="ZWL 0.00" style={input_border} />
                                </td>
                            </tr>
                            <tr>
                                <td><h6>No Interest Income and discounts received from investments was received in the selected branches within the selected date range.</h6></td>
                                <td align="right">
                                    <input type="text" autocomplete="off" readonly="" class="form-control well" value="ZWL 0.00" style={input_border} />
                                </td>
                            </tr>
                            <tr>
                                <td class="text-bold bg-green">Total Interest Income</td>
                                <td class="text-bold bg-green"></td>
                                <td style={{fontWeight:"bold"}} align="right">
                                    <input type="text" class="form-control well" readonly="" value="ZWL 100.00" style={input_border} />
                                </td>
                            </tr>
                            <tr>
                                <td class="text-bold bg-green">Non-Interest Income</td>
                                <td class="text-bold bg-green"></td>
                                <td style={{fontWeight:"bold"}} align="right">
                                    <input name="loansAndAdvances" type="text" class="form-control well" readonly="" value="ZWL 250.00" style={input_border} />
                                </td>
                            </tr>
                            <tr>
                                <td><a style={{cursor:"pointer"}} className="link" name="Admin Fee" data-type="Admin Fee" href="#/is">Admin Fee</a></td>
                                <td align="right">
                                    <input type="text" name="Admin Fee" autocomplete="off" readonly="" class="form-control well" value="ZWL 250.00" style={input_border} />
                                </td>
                            </tr>
                            <tr>
                                <td class="text-bold bg-gray">Total Operating Income</td>
                                <td class="text-bold bg-gray"></td>
                                <td style={{fontWeight:"bold"}} align="right">
                                    <input type="text" class="form-control well" readonly="" value="ZWL 350.00" style={input_border} />
                                </td>
                            </tr>
                            <tr>
                                <td class="text-bold bg-red">Interest Expenses</td>
                                <td class="text-bold bg-red"></td>
                                <td style={{fontWeight:"bold"}} align="right">
                                    <input name="InterestExpenses" type="text" class="form-control well" readonly="" value="ZWL 0.00" style={input_border} />
                                </td>
                            </tr>
                            <tr>
                                <td><h6>No Interest Expenses were incurred in the selected branches within the selected date range.</h6></td>
                                <td align="right">
                                    <input type="text" autocomplete="off" readonly="" class="form-control well" value="ZWL 0.00" style={input_border} />
                                </td>
                            </tr>
                            <tr>
                                <td class="text-bold bg-gray">Net Interest Income</td>
                                <td class="text-bold bg-gray"></td>
                                <td style={{fontWeight:"bold"}} align="right">
                                    <input type="text" class="form-control well" readonly="" value="ZWL 350.00" style={input_border} />
                                </td>
                            </tr>
                            <tr>
                                <td class="text-bold bg-red">Provision for Loan losses</td>
                                <td class="text-bold bg-red"></td>
                                <td style={{fontWeight:"bold"}} align="right">
                                    <input name="Provision" type="text" class="form-control well" readonly="" value="ZWL 0.00" style={input_border} />
                                </td>
                            </tr>
                            <tr>
                                <td><h6>No Loan losses were incurred in the selected branches within the selected date range.</h6></td>
                                <td align="right">
                                    <input type="text" autocomplete="off" readonly="" class="form-control well" value="ZWL 0.00" style={input_border} />
                                </td>
                            </tr>
                            <tr>
                                <td class="text-bold bg-red">Operating Expenses</td>
                                <td class="text-bold bg-red"></td>
                                <td style={{fontWeight:"bold"}} align="right">
                                    <input name="InterestExpenses" type="text" class="form-control well" readonly="" value="ZWL 0.00" style={input_border} />
                                </td>
                            </tr>
                            <tr>
                                <td><h6>No Operating Expenses were incurred in the selected branches within the selected date range.</h6></td>
                                <td align="right">
                                    <input type="text" autocomplete="off" readonly="" class="form-control well" value="ZWL 0.00" style={input_border} />
                                </td>
                            </tr>
                            <tr>
                                <td class="text-bold bg-gray">Net Income from Operations</td>
                                <td class="text-bold bg-gray"></td>
                                <td style={{fontWeight:"bold"}} align="right">
                                    <input type="text" class="form-control well" readonly="" value="ZWL 350.00" style={input_border} />
                                </td>
                            </tr>
                            <tr>
                                <td class="text-bold bg-gray">Donations</td>
                                <td class="text-bold bg-gray"></td>
                                <td style={{fontWeight:"bold"}} align="right">
                                    <input type="text" class="form-control well" readonly="" value="ZWL 0.00" style={input_border} />
                                </td>
                            </tr>
                            <tr>
                                <td class="text-bold bg-gray">Total Income before Tax</td>
                                <td class="text-bold bg-gray"></td>
                                <td style={{fontWeight:"bold"}} align="right">
                                    <input type="text" class="form-control well" readonly="" value="ZWL 350.00" style={input_border} />
                                </td>
                            </tr>
                            <tr>
                                <td class="text-bold">Taxation</td>
                                <td class="text-bold"></td>
                                <td style={{fontWeight:"bold"}} align="right">
                                    <input type="text" class="form-control well" readonly="" value="ZWL 0.00" style={input_border} />
                                </td>
                            </tr>
                            <tr>
                                <td class="text-bold bg-gray">Total Income after Tax</td>
                                <td class="text-bold bg-gray"></td>
                                <td style={{fontWeight:"bold"}} align="right">
                                    <input type="text" class="form-control well" readonly="" value="ZWL 350.00" style={input_border} />
                                </td>
                            </tr>
                            <tr>
                                <td class="text-bold">Dividend</td>
                                <td class="text-bold"></td>
                                <td style={{fontWeight:"bold"}} align="right">
                                    <input type="text" class="form-control well" readonly="" value="ZWL 0.00" style={input_border} />
                                </td>
                            </tr>
                            <tr>
                                <td class="text-bold bg-gray">Retained Earnings from Operations</td>
                                <td class="text-bold bg-gray"></td>
                                <td style={{fontWeight:"bold"}} align="right">
                                    <input type="text" class="form-control well" readonly="" value="ZWL 350.00" style={input_border} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Table;