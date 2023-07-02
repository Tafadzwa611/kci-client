import React, {useState} from 'react';

function Table({
        currs,
    }) {

    return (
        <div className="table-responsive font-12">
            <table className="table table-hover">
                <tbody>
                    <tr className="journal-details header">
                        <th>Full_Name</th>
                        <th>ISO Code</th>
                    </tr>  
                    {currs.map((currency) => (
                        <tr className="table-row" key={currency.id}>
                            <td>{currency.fullname}</td>
                            <td>{currency.shortname}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table;