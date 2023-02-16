import React, { useState } from 'react';
import { Fetcher } from '../../common';
import CreateOtherIncomeTypeModal from './CreateOtherIncomeTypeModal';

const OtherIncomeTypes = () => {
    return (
        <Fetcher urls={['/otherincomeapi/otherincometypeslist/', '/usersapi/currencieslist/']}>
            {({data}) => <List data={data[0]} currencies={data[1]}/>}
        </Fetcher>
    );
}

export default OtherIncomeTypes;

function List({data, currencies}) {
    const [open, setOpen] = useState(false);
    const [otherincomeTypes, setOtherIncomeTypes] = useState(data);
    return (
        <>
            <CreateOtherIncomeTypeModal open={open} setOpen={setOpen} setOtherIncomeTypes={setOtherIncomeTypes} currencies={currencies} />
            <div style={{margin:"20px 0"}}>
                <button type='button' className='btn btn-success' onClick={(e) => setOpen(curr => !curr)}>Add Other Income Type</button>
            </div>
            <div className="table-responsive font-12">
                <table className="table">
                    <tbody>
                        <tr className="journal-details header">
                            <th>Name</th>
                        </tr>                      
                        {otherincomeTypes.map((otherincome_type) => (
                            <tr className="table-row" key={otherincome_type.id}>
                                <td>{otherincome_type.name}</td>
                            </tr>
                        ))}
                        {otherincomeTypes == "" && 
                            <tr style={{display:"flex", justifyContent:"center"}}>
                                <td>No data available.</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>

        </>
    );
}
