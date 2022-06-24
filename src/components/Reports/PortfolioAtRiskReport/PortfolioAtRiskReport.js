import React from 'react';

const PortfolioAtRiskReport = () => {
    return (
        <div className="card slide">
            <div className="card-body font-12">
                <h5 className="table-heading" style={{marginBottom:"20px"}}>Portfolio At Risk (PAR)</h5>
                <div class="callout callout-info" style={{marginTop:"20px"}}>
                    <b>Portfolio At Risk</b> (PAR) is a measure of the quality of loans and risk that they currently have. <b>PAR 30</b> is the percentage of the 
                    loan portfolio that is overdue by more than 30 days. <b>PAR 60</b> is the percentage of the loan portfolio that is overdue by more than 
                    60 days. <b>PAR 90</b> is the percentage of the loan portfolio that is overdue by more than 90 days. Generally PAR 90 loans are 
                    considered as bad loans. 
                </div>
                <div className="table-container par_report" style={{marginTop:"24px"}}>
                    <div className="table-responsive font-12" style={{maxHeight:"600px"}}>
                        <table className="table" style={{width:"100%"}}>
                            <thead>
                                <tr className="bg-gray">
                                    <th></th>
                                    <th>PAR 30</th>
                                    <th>PAR 60</th>
                                    <th>PAR 90</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><b>Number of Loans</b></td>
                                    <td>65</td>
                                    <td>60</td>
                                    <td>57</td>
                                </tr>
                                <tr>
                                    <td><b>Total Amount</b></td>
                                    <td>ZWL 671126.00</td>
                                    <td>ZWL 625004.00</td>
                                    <td>ZWL 625004.00</td>
                                </tr>
                                <tr>
                                    <td><b>Percentage</b></td>
                                    <td>66.94</td>
                                    <td>62.34</td>
                                    <td>62.34</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PortfolioAtRiskReport;