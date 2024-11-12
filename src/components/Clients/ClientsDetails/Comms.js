import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Fetcher } from '../../../common';

function Comms({client}) {
  const [clientsSmsData, setClientsSmsData] = useState({
    count: 0,
    next_page_num: null,
    prev_page_num: null,
    number: null,
    num_of_pages: null,
    client_sms: []
  });

  const urls = [`/clientsapi/get_client_sms/${client.id}/?page_num=${1}`];

  return (
    <>
        <TableHeader clientsSmsData={clientsSmsData} setClientsSmsData={setClientsSmsData} client={client}/>
        {clientsSmsData.prev_page_num ? <ClientLoans clientsSmsData={clientsSmsData} setClientsSmsData={setClientsSmsData} />:
        <Fetcher urls={urls}>
            {({data}) => <ClientLoans clientsSmsData={data[0]} setClientsSmsData={setClientsSmsData} />}
        </Fetcher>}
    </>
  )
}

const ClientLoans = ({clientsSmsData, setClientsSmsData}) => {
  useEffect(() => {
    setClientsSmsData(clientsSmsData)
  }, []);
  return (
    <div style={{display:'block'}}>
      <div style={{padding:'1.5rem'}} className='miniLoanDetails-container'>
        <div style={{border:'none'}}>
          <div style={{width:'100%', overflowX:'auto'}}>
            <div className='table__height'>
              <table className='table' id='sms'>
                <thead>
                    <tr className='journal-details header' style={{position:'sticky', top:'0'}}>
                        <th style={{textAlign:'start'}}>Phone_Number</th>
                        <th style={{textAlign:'start'}}>Message</th>
                        <th style={{textAlign:'start'}}>Status</th>
                        <th style={{textAlign:'start'}}>Date_Send</th>
                        <th style={{textAlign:'start'}}>Send_By</th>
                    </tr>
                </thead>
                <tbody>
                    {clientsSmsData.client_sms.map(message => {
                        return (
                            <tr key={message.id}>
                                <td>{`+${message.phone_number}`}</td>
                                <td>{message.sms}</td>
                                <td>{message.status}</td>
                                <td>{message.date_send}</td>
                                <td>{message.sender}</td>
                            </tr>
                        )
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const TableHeader = ({clientsSmsData, setClientsSmsData, client}) => {
  console.log(clientsSmsData)
  return (
    <div className='table-header' style={{padding:'1rem 0px 0.5rem'}}>
      <div style={{display:'flex', columnGap:'10px', alignItems:'center'}}>
        <Pager
          nextPageNumber={clientsSmsData.next_page_num}
          loadMoreLoans={() => console.log('loadMoreLoans')}
          loadingMore={false}
          prevPageNumber={clientsSmsData.prev_page_num}
          setClientsSmsData={setClientsSmsData}
          client={client}
        />
        <div style={{marginTop:'6px'}}>Showing {clientsSmsData.client_sms.length} of {clientsSmsData.count} sms.</div>
      </div>
      <div style={{display:'flex', columnGap:'10px', alignItems:'center'}}>
        <div style={{marginTop:'6px'}}>Page {clientsSmsData.number} of {clientsSmsData.num_of_pages}</div>
      </div>
    </div>
  )
}

const Pager = ({
  prevPageNumber,
  nextPageNumber,
  setClientsSmsData,
  client
}) => {
  const [errors, setErrors] = useState(null);

  const onClick = async (evt) => {
    try {
      const pageNum = evt.target.innerText === 'Next' ? nextPageNumber : prevPageNumber;
      const response = await axios.get((`/clientsapi/get_client_sms/${client.id}/?page_num=${pageNum}`));
      setClientsSmsData(response.data);
    } catch (error) {
      if (error.message === 'Network Error') {
        setErrors({detail: 'Network Error'});
      } else {
        setErrors({detail: 'Server Error'});
      }
    }
  }

  return (
    <div className='footer-container font-12 text-light' style={{display:'flex', columnGap:'3px'}}>
      {errors && JSON.stringify(errors)}
      {prevPageNumber && <><button className='btn btn-default client__details' onClick={onClick}>Back</button><br/></>}
      {nextPageNumber && <button className='btn btn-default client__details' onClick={onClick}>Next</button>}
    </div>
  )
}

export default Comms