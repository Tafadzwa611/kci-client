import React, { Fragment } from 'react';

function Summary({summary, currencyIso}) {
    return (
        <div className='table-responsive' style={{maxHeight: '600px'}}>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Fee Name</th>
                        <th>Total Fees Recorded</th>
                    </tr>
                </thead>
                <tbody>
                    {summary.map(lf => {
                        return (
                            <Fragment key={lf.loan_fee}>
                                <tr>
                                <td>{ lf.loan_fee }</td>
                                <td>{`${currencyIso} ${lf.sum}`}</td>
                                </tr>
                            </Fragment>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Summary;