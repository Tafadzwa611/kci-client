// import React, {useEffect, useState} from 'react';
// import { NavLink } from 'react-router-dom';
// import { makeRequest } from '../../../../utils/utils';
// import MiniLoader from '../../../Loader/MiniLoader';
// import CreateCurrencyModal from './CreateCurrencyModal';

// const Currencies = () => {

//     const [currencies, setCurrencies] = useState([])
//     const [open, setOpen] = useState(false);

//     useEffect(() => {
//         getCurrencies()
//     }, []);

//     const getCurrencies = async () => {
//         const data = await fetchCurrencies();
//         setCurrencies(data);
//     };

//     async function fetchCurrencies() {
//         try {
//             const response = await makeRequest.get(`/usersapi/currencieslist/`, {timeout: 8000});
//             if (response.ok) {
//                 const currency_types = await response.json();
//                 return currency_types;
//             }else {
//                 const error = await response.json();
//                 console.log(error);
//             }
//         }catch(error) {
//             console.log(error);
//         }
//     }

//     if (currencies == null) {
//         return <MiniLoader />;
//     } 

//     return (
//         <>
//             <CreateCurrencyModal open={open} setOpen={setOpen} setCurrencies={setCurrencies} />
//             <div style={{margin:"20px 0"}}>
//                 <button type='button' className='btn btn-success' onClick={(e) => setOpen(curr => !curr)}>Add Currency</button>
//             </div>
//             <div className="table-responsive font-12">
//                 <table className="table table-hover">
//                     <tbody>
//                         <tr className="journal-details header">
//                             <th>Full_Name</th>
//                             <th>ISO Code</th>
//                         </tr>  
//                         {currencies.map((currency) => (
//                             <tr className="table-row" key={currency.id}>
//                                 <td>{currency.fullname}</td>
//                                 <td>{currency.shortname}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </>
//     )
// }

// export default Currencies;

import React, { useState } from 'react';
import { Fetcher } from '../../../../common';
import List from './List';

function Currencies() {
  const [currencyId, setCurrencyId] = useState(null);

  return (
    <>
      <Fetcher urls={['/usersapi/currencieslist/']} extra={{currencyId, setCurrencyId}}>
        {({data, extra}) => <List data={data[0]} extra={extra}/>}
      </Fetcher>
    </>
  )
}

export default Currencies;
