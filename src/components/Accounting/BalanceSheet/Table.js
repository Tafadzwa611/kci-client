import React from 'react';

const Table = () => {
    return (
        <div className="table-container balance_sheet_table_container" style={{marginTop:"40px"}}>
            <div className="balance_sheet_btn_container" style={{marginBottom:"20px", display:"flex", justifyContent:"flex-end", paddingBottom:"20px"}}>
                <button class="btn btn-export">
                    <i class="uil uil-download-alt"></i> 
                    <span>Download Excel</span>
                </button>
            </div>
            <div className="table-responsive font-12">
                <form>
                    <div style={{display:"flex", columnGap:"1rem", justifyContent:"space-between"}}>
                        <div >
                            <table className="table">
                                <tbody>
                                    <tr className="table-head-row">
                                        <td colspan="3" className="text-center"><b>ASSETS</b></td>
                                    </tr>
                                    <tr>
                                        <td style={{borderBottom:"1px solid rgb(0, 0, 0)"}} className="text-blue">
                                            <b>Cash and Cash Equivalents</b>
                                        </td>
                                        <td style={{borderBottom:"1px solid rgb(0, 0, 0)"}}></td>
                                        <td style={{textAlign:"right", borderBottom:"1px solid rgb(0, 0, 0)"}} className="text-bold">
                                            <input type="text" style={{width:"150px"}} readonly="" value="98350.00" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <a style={{cursor:"pointer"}} className="link" name="Cash on hand" data-glcodes="2100" data-at="ASSET" data-cat="Cash" href="#/balance_sheet/">Cash on hand</a>
                                        </td>
                                        <td style={{textAlign:"right"}}>
                                            <input type="text" style={{width:"150px"}} readonly="" value="0.00" />
                                        </td>
                                        <td style={{borderBottom:"1px solid rgb(0, 0, 0)"}}></td>
                                    </tr>
                                    <tr>
                                        <td style={{borderBottom:"1px solid rgb(0, 0, 0)"}}>
                                            <a style={{cursor:"pointer"}} className="link" name="Cash in bank" data-glcodes="2100" data-at="ASSET" data-cat="Ecocash,Onemoney,Telecash,Bank Transfer" href="#/balance_sheet/">Cash in bank</a>
                                        </td>
                                        <td style={{textAlign:"right", borderBottom:"1px solid rgb(0, 0, 0)"}}>
                                            <input type="text" style={{width:"150px"}} readonly="" value="98350.00" />
                                        </td>
                                        <td style={{borderBottom:"1px solid rgb(0, 0, 0)"}}></td>
                                    </tr>
                                    <tr>
                                        <td style={{borderBottom:"1px solid rgb(0, 0, 0)"}} className="text-blue"><b>Total Loans-Gross</b>
                                        </td>
                                        <td style={{borderBottom:"1px solid rgb(0, 0, 0)"}}></td>
                                        <td style={{textAlign:"right", borderBottom:"1px solid rgb(0, 0, 0)"}} className="text-bold">
                                            <input type="text" style={{width:"150px"}} readonly="" value="2900.00" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{borderBottom:"1px solid rgb(0, 0, 0)"}}>
                                            <a style={{cursor:"pointer"}} className="link" name="CONSUMER" data-glcodes="2300" data-reason="CONSUMER" data-at="ASSET" href="#/balance_sheet/">CONSUMER</a>
                                        </td>
                                        <td style={{textAlign:"right", borderBottom:"1px solid rgb(0, 0, 0)"}}>
                                            <input type="text" style={{width:"150px"}} readonly="" value="2900.00" />
                                        </td>
                                        <td style={{borderBottom:"1px solid rgb(0, 0, 0)"}}></td>
                                    </tr>
                                    <tr>
                                        <td style={{borderBottom:"1px solid rgb(0, 0, 0)"}}>
                                            <a style={{cursor:"pointer"}} className="link" name="COMMERCIAL - Agriculture" data-glcodes="2300" data-reason="COMMERCIAL - Agriculture" data-at="ASSET" href="#/balance_sheet/">COMMERCIAL - Agriculture</a>
                                        </td>
                                        <td style={{textAlign:"right", borderBottom:"1px solid rgb(0, 0, 0)"}}>
                                            <input type="text" style={{width:"150px"}} readonly="" value="0.00" />
                                        </td>
                                        <td style={{borderBottom:"1px solid rgb(0, 0, 0)"}}></td>
                                    </tr>
                                    <tr>
                                        <td style={{borderBottom:"1px solid rgb(0, 0, 0)"}}>
                                            <a style={{cursor:"pointer"}} className="link" name="COMMERCIAL - Manufacturing" data-glcodes="2300" data-reason="COMMERCIAL - Manufacturing" data-at="ASSET" href="#/balance_sheet/">COMMERCIAL - Manufacturing</a>
                                        </td>
                                        <td style={{textAlign:"right", borderBottom:"1px solid rgb(0, 0, 0)"}}>
                                            <input type="text" style={{width:"150px"}} readonly="" value="0.00" />
                                        </td>
                                        <td style={{borderBottom:"1px solid rgb(0, 0, 0)"}}></td>
                                    </tr>
                                    <tr>
                                        <td style={{borderBottom:"1px solid rgb(0, 0, 0)"}}>
                                            <a style={{cursor:"pointer"}} className="link" name="COMMERCIAL - Mining" data-glcodes="2300" data-reason="COMMERCIAL - Mining" data-at="ASSET" href="#/balance_sheet/">COMMERCIAL - Mining</a>
                                        </td>
                                        <td style={{textAlign:"right", borderBottom:"1px solid rgb(0, 0, 0)"}}>
                                            <input type="text" style={{width:"150px"}} readonly="" value="0.00" />
                                        </td>
                                        <td style={{borderBottom:"1px solid rgb(0, 0, 0)"}}></td>
                                    </tr>
                                    <tr>
                                        <td style={{borderBottom:"1px solid rgb(0, 0, 0)"}}>
                                            <a style={{cursor:"pointer"}} className="link" name="COMMERCIAL - Housing" data-glcodes="2300" data-reason="COMMERCIAL - Housing" data-at="ASSET" href="#/balance_sheet/">COMMERCIAL - Housing</a>
                                        </td>
                                        <td style={{textAlign:"right", borderBottom:"1px solid rgb(0, 0, 0)"}}>
                                            <input type="text" style={{width:"150px"}} readonly="" value="0.00" />
                                        </td>
                                        <td style={{borderBottom:"1px solid rgb(0, 0, 0)"}}></td>
                                    </tr>
                                    <tr>
                                        <td style={{borderBottom:"1px solid rgb(0, 0, 0)"}}>
                                            <a style={{cursor:"pointer"}} className="link" name="COMMERCIAL - Distribution &amp; Services" data-glcodes="2300" data-reason="COMMERCIAL - Distribution &amp; Services" data-at="ASSET" href="#/balance_sheet/">COMMERCIAL - Distribution &amp; Services</a>
                                        </td>
                                        <td style={{textAlign:"right", borderBottom:"1px solid rgb(0, 0, 0)"}}>
                                            <input type="text" style={{width:"150px"}} readonly="" value="0.00" />
                                        </td>
                                        <td style={{borderBottom:"1px solid rgb(0, 0, 0)"}}></td>
                                    </tr>
                                    <tr>
                                        <td style={{borderBottom:"1px solid rgb(0, 0, 0)"}}>
                                            <a style={{cursor:"pointer"}} className="link" name="COMMERCIAL - Retail" data-glcodes="2300" data-reason="COMMERCIAL - Retail" data-at="ASSET" href="#/balance_sheet/">COMMERCIAL - Retail</a>
                                        </td>
                                        <td style={{textAlign:"right", borderBottom:"1px solid rgb(0, 0, 0)"}}>
                                            <input type="text" style={{width:"150px"}} readonly="" value="0.00" />
                                        </td>
                                        <td style={{borderBottom:"1px solid rgb(0, 0, 0)"}}></td>
                                    </tr>
                                    <tr>
                                        <td style={{borderBottom:"1px solid rgb(0, 0, 0)"}}>
                                            <a style={{cursor:"pointer"}} className="link" name="COMMERCIAL - Transport" data-glcodes="2300" data-reason="COMMERCIAL - Transport" data-at="ASSET" href="#/balance_sheet/">COMMERCIAL - Transport</a>
                                        </td>
                                        <td style={{textAlign:"right", borderBottom:"1px solid rgb(0, 0, 0)"}}>
                                            <input type="text" style={{width:"150px"}} readonly="" value="0.00"/>
                                        </td>
                                        <td style={{borderBottom:"1px solid rgb(0, 0, 0)"}}></td>
                                    </tr>
                                    <tr>
                                        <td style={{borderBottom:"1px solid rgb(0, 0, 0)"}}>
                                            <a style={{cursor:"pointer"}} className="link" name="COMMERCIAL - Health" data-glcodes="2300" data-reason="COMMERCIAL - Health" data-at="ASSET" href="#/balance_sheet/">COMMERCIAL - Health</a>
                                        </td>
                                        <td style={{textAlign:"right", borderBottom:"1px solid rgb(0, 0, 0)"}}>
                                            <input type="text" style={{width:"150px"}} readonly="" value="0.00" />
                                        </td>
                                        <td style={{borderBottom:"1px solid rgb(0, 0, 0)"}}></td>
                                    </tr>
                                    <tr>
                                        <td style={{borderBottom:"1px solid rgb(0, 0, 0)"}}>
                                            <a style={{cursor:"pointer"}} className="link" name="COMMERCIAL - Education" data-glcodes="2300" data-reason="COMMERCIAL - Education" data-at="ASSET" href="#/balance_sheet/">COMMERCIAL - Education</a>
                                        </td>
                                        <td style={{textAlign:"right", borderBottom:"1px solid rgb(0, 0, 0)"}}>
                                            <input type="text" style={{width:"150px"}} readonly="" value="0.00" />
                                        </td>
                                        <td style={{borderBottom:"1px solid rgb(0, 0, 0)"}}></td>
                                    </tr>
                                    <tr>
                                        <td style={{borderBottom:"1px solid rgb(0, 0, 0)"}}>
                                            <a style={{cursor:"pointer"}} className="link" name="COMMERCIAL - Cross Border Traders" data-glcodes="2300" data-reason="COMMERCIAL - Cross Border Traders" data-at="ASSET" href="#/balance_sheet/">COMMERCIAL - Cross Border Traders</a>
                                        </td>
                                        <td style={{textAlign:"right", borderBottom:"1px solid rgb(0, 0, 0)"}}>
                                            <input type="text" style={{width:"150px"}} readonly="" value="0.00" />
                                        </td>
                                        <td style={{borderBottom:"1px solid rgb(0, 0, 0)"}}></td>
                                    </tr>
                                    <tr>
                                        <td style={{borderBottom:"1px solid rgb(0, 0, 0)"}}>
                                            <a style={{cursor:"pointer"}} className="link" name="COMMERCIAL - Construction" data-glcodes="2300" data-reason="COMMERCIAL - Construction" data-at="ASSET" href="#/balance_sheet/">COMMERCIAL - Construction</a>
                                        </td>
                                        <td style={{textAlign:"right", borderBottom:"1px solid rgb(0, 0, 0)"}}>
                                            <input type="text" style={{width:"150px"}} readonly="" value="0.00" />
                                        </td>
                                        <td style={{borderBottom:"1px solid rgb(0, 0, 0)"}}></td>
                                    </tr>
                                    <tr>
                                        <td style={{borderBottom:"1px solid rgb(0, 0, 0)"}}>
                                            <a style={{cursor:"pointer"}} className="link" name="COMMERCIAL - Vendors" data-glcodes="2300" data-reason="COMMERCIAL - Vendors" data-at="ASSET" href="#/balance_sheet/">COMMERCIAL - Vendors</a>
                                        </td>
                                        <td style={{textAlign:"right", borderBottom:"1px solid rgb(0, 0, 0)"}}>
                                            <input type="text" style={{width:"150px"}} readonly="" value="0.00" />
                                        </td>
                                        <td style={{borderBottom:"1px solid rgb(0, 0, 0)"}}></td>
                                    </tr>
                                    <tr>
                                        <td style={{borderBottom:"1px solid rgb(0, 0, 0)"}}>
                                            <a style={{cursor:"pointer"}} className="link" name="OTHER" data-glcodes="2300" data-reason="OTHER" data-at="ASSET" href="#/balance_sheet/">OTHER</a>
                                        </td>
                                        <td style={{textAlign:"right", borderBottom:"1px solid rgb(0, 0, 0)"}}>
                                            <input type="text" style={{width:"150px"}} readonly="" value="0.00" />
                                        </td>
                                        <td style={{borderBottom:"1px solid rgb(0, 0, 0)"}}></td>
                                    </tr>
                                    <tr>
                                        <td style={{borderBottom:"1px solid rgb(0, 0, 0)"}} className="text-blue">
                                            <b>Net Loan Portfolio</b>
                                        </td>
                                        <td style={{borderBottom:"1px solid rgb(0, 0, 0)"}}></td>
                                        <td style={{textAlign:"right", borderBottom:"1px solid rgb(0, 0, 0)"}} className="text-bold">
                                            <input type="text" style={{width:"150px"}} readonly="" value="2900.00" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{borderBottom:"1px solid rgb(0, 0, 0)"}}>
                                            <a style={{cursor:"pointer"}} className="link" name="Other short-term assets" data-glcodes="2400,2600" data-at="ASSET" href="#/balance_sheet/">Other short-term assets</a>
                                        </td>
                                        <td style={{textAlign:"right", borderBottom:"1px solid rgb(0, 0, 0)"}}>
                                            <input type="text" style={{width:"150px"}} readonly="" value="0.00" />
                                        </td>
                                        <td style={{borderBottom:"1px solid rgb(0, 0, 0)"}}></td>
                                    </tr>
                                    <tr>
                                        <td style={{borderBottom:"1px solid rgb(0, 0, 0)"}} className="text-blue">
                                            <b>Total Current Assets</b>
                                        </td>
                                        <td style={{borderBottom:"1px solid rgb(0, 0, 0)"}}></td>
                                        <td style={{textAlign:"right", borderBottom:"1px solid rgb(0, 0, 0)"}}>
                                            <input type="text" style={{width:"150px"}} readonly="" value="101250.00" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{borderBottom:"1px solid rgb(0, 0, 0)"}}>
                                            <a style={{cursor:"pointer"}} className="link" name="Fixed assets" data-glcodes="2500" data-at="ASSET" href="#/balance_sheet/">
                                                Fixed assets
                                            </a>
                                        </td>
                                        <td style={{textAlign:"right", borderBottom:"1px solid rgb(0, 0, 0)"}}>
                                            <input type="text" style={{width:"150px"}} readonly="" value="0.00" />
                                        </td>
                                        <td style={{borderBottom:"1px solid rgb(0, 0, 0)"}}></td>
                                    </tr>
                                    <tr>
                                        <td style={{borderBottom:"1px solid rgb(0, 0, 0)"}} className="text-blue">
                                            <b>Total Assets</b>
                                        </td>
                                        <td style={{borderBottom:"1px solid rgb(0, 0, 0)"}}></td>
                                        <td style={{textAlign:"right", borderBottom:"1px solid rgb(0, 0, 0)"}}>
                                            <input type="text" style={{width:"150px"}} readonly="" value="101250.00" />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div >
                            <table className="table">
                                <tbody>
                                    <tr className="table-head-row">
                                        <td colspan="3" className="text-center"><b>LIABILITY AND EQUITY</b></td>
                                    </tr>
                                    <tr>
                                        <td style={{borderBottom:"1px solid rgb(0, 0, 0)"}} className="text-blue">
                                            <b>Short term debt</b>
                                        </td>
                                        <td style={{borderBottom:"1px solid rgb(0, 0, 0)"}}></td>
                                        <td style={{textAlign:"right", borderBottom:"1px solid rgb(0, 0, 0)"}} className="text-bold">
                                            <input type="text" style={{width:"150px"}} readonly="" value="0.00" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{borderBottom:"1px solid rgb(0, 0, 0)"}}>
                                            <a style={{cursor:"pointer"}} className="link" name="Refunds Payable" data-glcodes="3101" data-at="LIABILITY" href="#/balance_sheet/">Refunds Payable - Main Branch</a>
                                        </td>
                                        <td style={{textAlign:"right", borderBottom:"1px solid rgb(0, 0, 0)"}}>
                                            <input type="text" style={{width:"150px"}} readonly="" value="0.00" />
                                        </td>
                                        <td style={{borderBottom:"1px solid rgb(0, 0, 0)"}}></td>
                                    </tr>
                                    <tr>
                                        <td style={{borderBottom:"1px solid rgb(0, 0, 0)"}}>
                                            <a style={{cursor:"pointer"}} className="link" name="Dividends Payable" data-glcodes="3102" data-at="LIABILITY" href="#/balance_sheet/">Dividends Payable - Main Branch</a>
                                        </td>
                                        <td style={{textAlign:"right", borderBottom:"1px solid rgb(0, 0, 0)"}}>
                                            <input type="text" style={{width:"150px"}} readonly="" value="0.00" />
                                        </td>
                                        <td style={{borderBottom:"1px solid rgb(0, 0, 0)"}}></td>
                                    </tr>
                                    <tr>
                                        <td style={{borderBottom:"1px solid rgb(0, 0, 0)"}} className="text-blue">
                                            <b>Total current liabilities</b>
                                        </td>
                                        <td style={{borderBottom:"1px solid rgb(0, 0, 0)"}}></td>
                                        <td style={{textAlign:"right", borderBottom:"1px solid rgb(0, 0, 0)"}} className="text-bold">
                                            <input type="text" style={{width:"150px"}} readonly="" value="0.00" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{borderBottom:"1px solid rgb(0, 0, 0)"}} className="text-blue">
                                            <b>Long term debt</b>
                                        </td>
                                        <td style={{borderBottom:"1px solid rgb(0, 0, 0)"}}></td>
                                        <td style={{textAlign:"right", borderBottom:"1px solid rgb(0, 0, 0)"}} className="text-bold">
                                            <input type="text" style={{width:"150px"}} readonly="" value="0.00" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{borderBottom:"1px solid rgb(0, 0, 0)"}} className="text-blue">
                                            <b>Total liabilities</b>
                                        </td>
                                        <td style={{borderBottom:"1px solid rgb(0, 0, 0)"}}></td>
                                        <td style={{textAlign:"right", borderBottom:"1px solid rgb(0, 0, 0)"}} className="text-bold">
                                            <input type="text" style={{width:"150px"}} readonly="" value="0.00" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{borderBottom:"1px solid rgb(0, 0, 0)"}} className="text-blue">
                                            <b>EQUITY</b>
                                        </td>
                                        <td style={{borderBottom:"1px solid rgb(0, 0, 0)"}}></td>
                                        <td style={{textAlign:"right", borderBottom:"1px solid rgb(0, 0, 0)"}} className="text-bold">
                                            <input type="text" style={{width:"150px"}} readonly="" value="0.00"/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{borderBottom:"1px solid rgb(0, 0, 0)"}} className="text-blue">
                                            <b>Total Equity</b>
                                        </td>
                                        <td style={{borderBottom:"1px solid rgb(0, 0, 0)"}}></td>
                                        <td style={{textAlign:"right", borderBottom:"1px solid rgb(0, 0, 0)"}} className="text-bold">
                                            <input type="text" style={{width:"150px"}} readonly="" value="0.00"/>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div style={{display:"flex", columnGap:"1rem", justifyContent:"space-between"}}>
                        <div className="col-6">
                            <table className="table">
                                <tbody>
                                    <tr className="table-head-row">
                                        <td><b>TOTAL ASSETS</b></td>
                                        <td style={{textAlign:"right"}} className="text-bold">
                                            <input type="text" style={{width:"150px"}} readonly="" value="101250.00"/>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="col-6">
                            <table className="table">
                                <tbody>
                                    <tr className="table-head-row">
                                        <td><b>TOTAL LIABILITIES AND EQUITY</b></td>
                                        <td style={{textAlign:"right"}} className="text-bold">
                                            <input type="text" style={{width:"150px"}} readonly="" value="0.00" />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Table;