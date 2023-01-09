import React from 'react';
import { FixedSizeList as List } from 'react-window';
import { convertDate } from '../Journals/utils';

function Table({openingBal, txns}) {
  const Row = ({ index, style }) => {
    const txn = txns[index];
    if (index === 0) {
      return (
        <div>
          <div style={{...style, display:'flex', position:"relative", height:"30px", paddingTop:"5px", textAlign:"center"}}>
            <div style={{width:"10%"}}>Opening_Balance</div>
            <div style={{width:"10%"}}></div>
            <div style={{width:"10%"}}></div>
            <div style={{width:"5%"}}></div>
            <div style={{width:"5%"}}></div>
            <div style={{width:"5%"}}>{openingBal}</div>
            <div style={{width:"15%"}}></div>
            <div style={{width:"15%"}}></div>
            <div style={{width:"10%"}}></div>
            <div style={{width:"15%"}}></div>
          </div>
          <div style={{...style, display:'flex', position:"relative", height: "30px", paddingTop:"5px", textAlign:"center"}}>
            <div style={{width:"10%"}} className="link">{txn.transaction_id}</div>
            <div style={{width:"10%"}}>{convertDate(txn.booking_date)}</div>
            <div style={{width:"10%"}}>{convertDate(txn.date_logged)}</div>
            <div style={{width:"5%"}}>{txn.credit ?? ''}</div>
            <div style={{width:"5%"}}>{txn.debit ?? ''}</div>
            <div style={{width:"5%"}}>{txn.balance}</div>
            <div style={{width:"15%"}}>{txn.client_id}</div>
            <div style={{width:"15%"}}>{txn.client_name}</div>
            <div style={{width:"10%"}}>{txn.account_id}</div>
            <div style={{width:"15%"}}>{txn.created_by_name}</div>
          </div>
        </div>
      )
    }

    return (
      <>
        <div className="div__border" style={{...style, display:'flex', textAlign:"center", display:"flex", alignItems:"center"}}>
          <div style={{width:"10%"}} className="link">{txn.transaction_id}</div>
          <div style={{width:"10%"}}>{convertDate(txn.booking_date)}</div>
          <div style={{width:"10%"}}>{convertDate(txn.date_logged)}</div>
          <div style={{width:"5%"}}>{txn.credit ?? ''}</div>
          <div style={{width:"5%"}}>{txn.debit ?? ''}</div>
          <div style={{width:"5%"}}>{txn.balance}</div>
          <div style={{width:"15%"}}>{txn.client_id}</div>
          <div style={{width:"15%"}}>{txn.client_name}</div>
          <div style={{width:"10%"}}>{txn.account_id}</div>
          <div style={{width:"15%"}}>{txn.created_by_name}</div>
        </div>
      </>
    )
  }

  if (txns.length === 0) {
    return (
      <div className='table-responsive p-0'>
        <div className="journal-details header" style={{display:'flex', textAlign:"center"}}>
          <div style={{width:"10%"}}>Transaction_ID</div>
          <div style={{width:"10%"}}>Booking_Date</div>
          <div style={{width:"10%"}}>Date_Created</div>
          <div style={{width:"5%"}}>Credit</div>
          <div style={{width:"5%"}}>Debit</div>
          <div style={{width:"5%"}}>Balance</div>
          <div style={{width:"15%"}}>Client_Id</div>
          <div style={{width:"15%"}}>Client_Name</div>
          <div style={{width:"10%"}}>Account_Id</div>
          <div style={{width:"15%"}}>Created_By</div>
        </div>
        <div style={{display:'flex', position:"relative", height:"20px", textAlign:"center"}}>
          <div style={{width:"10%"}}>Opening Balance</div>
          <div style={{width:"10%"}}></div>
          <div style={{width:"10%"}}></div>
          <div style={{width:"5%"}}></div>
          <div style={{width:"5%"}}></div>
          <div style={{width:"5%"}}>{openingBal}</div>
          <div style={{width:"15%"}}></div>
          <div style={{width:"15%"}}></div>
          <div style={{width:"10%"}}></div>
          <div style={{width:"15%"}}></div>
        </div>
      </div>
    )
  }

  return (
    <div className='table-responsive p-0'>
      <div className="journal-details header" style={{display:'flex', textAlign:"center"}}>
        <div style={{width:"10%"}}>Transaction_ID</div>
        <div style={{width:"10%"}}>Booking_Date</div>
        <div style={{width:"10%"}}>Date_Created</div>
        <div style={{width:"5%"}}>Credit</div>
        <div style={{width:"5%"}}>Debit</div>
        <div style={{width:"5%"}}>Balance</div>
        <div style={{width:"15%"}}>Client_Id</div>
        <div style={{width:"15%"}}>Client_Name</div>
        <div style={{width:"10%"}}>Account_Id</div>
        <div style={{width:"15%"}}>Created_By</div>
      </div>
      <List height={600} itemCount={txns.length} itemSize={50} width={'100%'}>
        {Row}
      </List>
    </div>
  )
}

export default Table;