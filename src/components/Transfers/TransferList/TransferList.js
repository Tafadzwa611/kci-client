// import React from 'react';
// import { Fetcher } from '../../../common';

// function ViewTransfers() {
//   return (
//     <Fetcher urls={['/acc-api/transfers/']}>
//       {({data}) => (
//         <>
//           <div style={{padding:'0', border:'none', marginTop:'20px'}} className='table-container full__width font-12'>
//             <div className='full__table'>
//               <div className='table-responsive'>
//                 <div className='table__height'>
//                   <table className='table'>
//                     <tbody>
//                       <tr className='journal-details header' style={{position:'sticky', top: 0}}>
//                         <th>Transfer</th>
//                         <th>Receiving Account</th>
//                         <th>Sending Account</th>
//                         <th>Amount</th>
//                         <th>Date Created</th>
//                         <th>Transfer Date</th>
//                       </tr>
//                       {data[0].map(transfer => {
//                         return (
//                           <tr key={transfer.id}>
//                             <td>
//                               {transfer.receiving_branch}
//                             </td>
//                             <td>
//                               {transfer.sending_branch}
//                             </td>
//                             <td>
//                               {transfer.amount}
//                             </td>
//                             <td>
//                               {transfer.date_created}
//                             </td>
//                             <td>
//                               {transfer.date_added}
//                             </td>
//                           </tr>
//                         )
//                       })}
//                     </tbody>
//                   </table>
//                 </div>
//                 </div>
//             </div>
//           </div>
//         </>
//       )}
//     </Fetcher>
//   )
// }

// export default ViewTransfers;


import React, {useState} from 'react';
import Filter from './Filter';
import Table from './Table';

function TransferList({ transferTypes }) {
  const [params, setParams] = useState(null);
  const [transferData, setTransferData] = useState({count: 0, next_page_num: 0, transfers: []});

  return (
    <>
      <Filter setTransferData={setTransferData} setParams={setParams} transferTypes={transferTypes}/>
      <div style={{paddingTop: '2rem'}}></div>
      <Table
        transferData={transferData} 
        setTransferData={setTransferData}
        params={params}
      />
    </>
  )
}

export default TransferList;